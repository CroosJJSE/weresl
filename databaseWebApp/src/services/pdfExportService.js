/**
 * PDF Export Service
 * Handles PDF generation for profiles using jsPDF
 */

import { dbOperations } from '@/firebase/db.js'
import { convertGoogleDriveUrl, extractFileId } from '@/utils/driveUtils.js'
import { ProfileField, RootCollection, RF_LOAN_FIELD, GRANT_FIELD, RF_RETURN_RECORD_FIELD } from '@/enums/db.js'

// Logo file ID for the PDF header
const LOGO_FILE_ID = '1F727f-TTYnFjl93DQiSXvvY9DJaJEaNX'

export const pdfExportService = {
  /**
   * Generate PDF for selected profiles
   */
  async generateProfilesPDF(selectedRegIds) {
    try {
      if (!selectedRegIds || selectedRegIds.length === 0) {
        throw new Error('No profiles selected for PDF generation')
      }

      // Load all selected profiles with their loan details and payment history
      const profiles = []
      for (const regId of selectedRegIds) {
        const profileResult = await dbOperations.getProfileByRegId(regId)
        if (profileResult) {
          // Load loan details and payment history
          const loans = await dbOperations.getProfileLoans(regId)
          const rfReturnHistory = await dbOperations.getRFReturnHistory(regId)
          
          profiles.push({
            ...profileResult,
            loans,
            rfReturnHistory
          })
        } else {
          console.warn(`Profile not found for Reg_ID: ${regId}`)
        }
      }

      if (profiles.length === 0) {
        throw new Error('No valid profiles found for PDF generation')
      }

      // Generate PDF content
      const pdfContent = await this.createPDFContent(profiles)
      
      return {
        success: true,
        data: {
          content: pdfContent,
          count: profiles.length,
          filename: `Profiles_Report_${new Date().toISOString().slice(0, 10)}.pdf`
        }
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
      return {
        success: false,
        message: error.message,
        error
      }
    }
  },

  /**
   * Create PDF content for profiles
   */
  async createPDFContent(profiles) {
    // Import jsPDF dynamically to avoid SSR issues
    const { jsPDF } = await import('jspdf')
    
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20
    const contentWidth = pageWidth - (2 * margin)
    
    let currentY = margin
    let pageNumber = 1

    // Add logo and header
    currentY = await this.addHeader(doc, currentY, pageWidth, margin)
    
    // Add profiles
    for (let i = 0; i < profiles.length; i++) {
      const profile = profiles[i]
      
      // Check if we need a new page
      if (currentY > pageHeight - 100) {
        doc.addPage()
        pageNumber++
        currentY = margin
        currentY = await this.addHeader(doc, currentY, pageWidth, margin, pageNumber)
      }
      
      currentY = await this.addProfileToPDF(doc, profile, currentY, pageWidth, margin, contentWidth)
      
      // Add page break between profiles (except for the last one)
      if (i < profiles.length - 1) {
        currentY += 10
      }
    }

    return doc
  },

  /**
   * Add header to PDF page
   */
  async addHeader(doc, currentY, pageWidth, margin, pageNumber = 1) {
    const headerY = currentY
    
    // Add logo if available
    try {
      const logoUrl = convertGoogleDriveUrl(LOGO_FILE_ID, 'w200')
      if (logoUrl) {
        // Note: jsPDF doesn't support direct image loading from URLs
        // We'll add a placeholder for the logo
        doc.setFontSize(16)
        doc.setTextColor(26, 115, 232) // Blue color
        doc.text('WERESL', pageWidth / 2, headerY, { align: 'center' })
      }
    } catch (error) {
      console.warn('Could not load logo:', error)
    }
    
    // Add title
    doc.setFontSize(20)
    doc.setTextColor(26, 115, 232)
    doc.text('Selected Profiles Report', pageWidth / 2, headerY + 15, { align: 'center' })
    
    // Add generation date
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, headerY + 25, { align: 'center' })
    
    // Add page number if not first page
    if (pageNumber > 1) {
      doc.text(`Page ${pageNumber}`, pageWidth - margin, headerY + 25, { align: 'right' })
    }
    
    // Add separator line
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, headerY + 30, pageWidth - margin, headerY + 30)
    
    return headerY + 40
  },

  /**
   * Add profile to PDF
   */
  async addProfileToPDF(doc, profile, currentY, pageWidth, margin, contentWidth) {
    const startY = currentY
    
    // Profile name and ID
    doc.setFontSize(16)
    doc.setTextColor(26, 115, 232)
    const profileName = this.getProfileField(profile, ['fullName', 'Name', 'basicInfo.name'])
    const regId = this.getProfileField(profile, ['Reg_ID', 'id'])
    doc.text(`${profileName || 'Unknown'} (${regId || 'No ID'})`, margin, currentY)
    currentY += 15
    
    // Add profile image if available
    const imageUrl = this.getProfileField(profile, ['profileImageDriveId', 'Image', 'basicInfo.profileImageDriveId'])
    if (imageUrl) {
      currentY = await this.addProfileImage(doc, imageUrl, currentY, pageWidth, margin)
    }
    
    // Profile details table
    currentY = this.addProfileDetailsTable(doc, profile, currentY, pageWidth, margin, contentWidth)
    
    // Add loan details
    if (profile.loans && profile.loans.length > 0) {
      currentY = this.addLoanDetails(doc, profile.loans, currentY, pageWidth, margin, contentWidth)
    }
    
    // Add payment history
    if (profile.rfReturnHistory && profile.rfReturnHistory.length > 0) {
      currentY = this.addPaymentHistory(doc, profile.rfReturnHistory, currentY, pageWidth, margin, contentWidth)
    }
    
    // Add separator line
    currentY += 10
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, currentY, pageWidth - margin, currentY)
    currentY += 15
    
    return currentY
  },

  /**
   * Get profile field value with fallback
   */
  getProfileField(profile, fieldNames) {
    for (const fieldName of fieldNames) {
      if (fieldName.includes('.')) {
        // Handle nested fields like 'basicInfo.name'
        const parts = fieldName.split('.')
        let value = profile
        for (const part of parts) {
          if (value && typeof value === 'object' && value[part] !== undefined) {
            value = value[part]
          } else {
            value = null
            break
          }
        }
        if (value !== null && value !== undefined && value !== '') {
          return value
        }
      } else {
        // Handle direct fields
        if (profile[fieldName] !== undefined && profile[fieldName] !== null && profile[fieldName] !== '') {
          return profile[fieldName]
        }
      }
    }
    return null
  },

  /**
   * Add profile details table
   */
  addProfileDetailsTable(doc, profile, currentY, pageWidth, margin, contentWidth) {
    const tableStartY = currentY
    const rowHeight = 8
    const col1Width = contentWidth * 0.4
    const col2Width = contentWidth * 0.6
    
    // Table header
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.setFillColor(240, 240, 240)
    doc.rect(margin, currentY - 5, contentWidth, rowHeight + 2, 'F')
    
    doc.setTextColor(26, 115, 232)
    doc.text('Field', margin + 2, currentY)
    doc.text('Value', margin + col1Width + 2, currentY)
    currentY += rowHeight + 5
    
    // Profile fields to include with their possible field names
    const fieldsToInclude = [
      { keys: ['basicInfo.District', 'District', 'district'], label: 'District' },
      { keys: ['basicInfo.age', 'Age', 'yearOfBirth'], label: 'Age' },
      { keys: ['basicInfo.address', 'Address', 'address'], label: 'Address' },
      { keys: ['basicInfo.nic', 'NIC', 'nic'], label: 'NIC' },
      { keys: ['basicInfo.phone', 'Contact', 'phoneNumber', 'contact'], label: 'Contact' },
      { keys: ['basicInfo.totalChildren', 'Total_Children', 'totalChildren', 'total_children'], label: 'Total Children' },
      { keys: ['basicInfo.schoolKids', 'School_Kids', 'schoolGoingChildren', 'school_kids'], label: 'School Going Children' },
      { keys: ['basicInfo.others', 'Others', 'otherDependents', 'others'], label: 'Other Dependents' },
      { keys: ['Description', 'description', 'basicInfo.description'], label: 'Description' },
      { keys: ['basicInfo.occupation', 'Occupation', 'occupation'], label: 'Occupation' },
      { keys: ['RF_Loan'], label: 'RF Loan' },
      { keys: ['RF_Paid_History'], label: 'RF Paid History' },
      { keys: ['RF_Cur_Prj'], label: 'RF Current Project' },
      { keys: ['Com_prjs'], label: 'Completed Projects' },
      { keys: ['GRANT'], label: 'Grant' },
      { keys: ['GIFor'], label: 'GIF' },
      { keys: ['GRANT_Cur_Prj'], label: 'Grant Current Project' }
    ]
    
    // Add each field
    for (const field of fieldsToInclude) {
      const value = this.getProfileField(profile, field.keys)
      if (value !== null && value !== undefined && value !== '') {
        // Check if we need a new page
        if (currentY > doc.internal.pageSize.getHeight() - 50) {
          doc.addPage()
          currentY = 20
        }
        
        // Field name
        doc.setFontSize(9)
        doc.setTextColor(100, 100, 100)
        doc.text(field.label, margin + 2, currentY)
        
        // Field value
        doc.setTextColor(0, 0, 0)
        const valueText = String(value)
        const wrappedText = doc.splitTextToSize(valueText, col2Width - 4)
        doc.text(wrappedText, margin + col1Width + 2, currentY)
        
        currentY += Math.max(rowHeight, wrappedText.length * 4)
      }
    }
    
    return currentY
  },

  /**
   * Add loan details to PDF
   */
  addLoanDetails(doc, loans, currentY, pageWidth, margin, contentWidth) {
    // Check if we need a new page
    if (currentY > doc.internal.pageSize.getHeight() - 100) {
      doc.addPage()
      currentY = 20
    }
    
    // Section header
    doc.setFontSize(14)
    doc.setTextColor(26, 115, 232)
    doc.text('Loan Details', margin, currentY)
    currentY += 15
    
    const rowHeight = 10
    const col1Width = contentWidth * 0.25
    const col2Width = contentWidth * 0.25
    const col3Width = contentWidth * 0.25
    const col4Width = contentWidth * 0.25
    
    // Table header
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.setFillColor(240, 240, 240)
    doc.rect(margin, currentY - 5, contentWidth, rowHeight + 2, 'F')
    
    doc.setTextColor(26, 115, 232)
    doc.text('Type', margin + 2, currentY)
    doc.text('Amount', margin + col1Width + 2, currentY)
    doc.text('Status', margin + col1Width + col2Width + 2, currentY)
    doc.text('Purpose', margin + col1Width + col2Width + col3Width + 2, currentY)
    currentY += rowHeight + 5
    
    // Add each loan
    for (const loan of loans) {
      // Check if we need a new page
      if (currentY > doc.internal.pageSize.getHeight() - 50) {
        doc.addPage()
        currentY = 20
      }
      
      // Loan type
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      doc.text(loan.type || 'Unknown', margin + 2, currentY)
      
      // Loan amount
      doc.setTextColor(0, 0, 0)
      const amount = loan[RF_LOAN_FIELD.AMOUNT] || loan.amount || loan[GRANT_FIELD.AMOUNT] || 'N/A'
      doc.text(String(amount), margin + col1Width + 2, currentY)
      
      // Loan status
      const status = loan[RF_LOAN_FIELD.STATUS] || loan.status || 'N/A'
      doc.text(String(status), margin + col1Width + col2Width + 2, currentY)
      
      // Loan purpose
      const purpose = loan[RF_LOAN_FIELD.PURPOSE] || loan.purpose || loan[GRANT_FIELD.PURPOSE] || 'N/A'
      const purposeText = String(purpose)
      const wrappedPurpose = doc.splitTextToSize(purposeText, col4Width - 4)
      doc.text(wrappedPurpose, margin + col1Width + col2Width + col3Width + 2, currentY)
      
      currentY += Math.max(rowHeight, wrappedPurpose.length * 3)
    }
    
    return currentY + 10
  },

  /**
   * Add payment history to PDF
   */
  addPaymentHistory(doc, paymentHistory, currentY, pageWidth, margin, contentWidth) {
    // Check if we need a new page
    if (currentY > doc.internal.pageSize.getHeight() - 100) {
      doc.addPage()
      currentY = 20
    }
    
    // Section header
    doc.setFontSize(14)
    doc.setTextColor(26, 115, 232)
    doc.text('Payment History', margin, currentY)
    currentY += 15
    
    const rowHeight = 10
    const col1Width = contentWidth * 0.4
    const col2Width = contentWidth * 0.6
    
    // Table header
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.setFillColor(240, 240, 240)
    doc.rect(margin, currentY - 5, contentWidth, rowHeight + 2, 'F')
    
    doc.setTextColor(26, 115, 232)
    doc.text('Date', margin + 2, currentY)
    doc.text('Amount', margin + col1Width + 2, currentY)
    currentY += rowHeight + 5
    
    // Add each payment
    for (const payment of paymentHistory) {
      // Check if we need a new page
      if (currentY > doc.internal.pageSize.getHeight() - 50) {
        doc.addPage()
        currentY = 20
      }
      
      // Payment date
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      let paymentDate = 'N/A'
      
      if (payment.parsedDate) {
        paymentDate = payment.parsedDate
      } else if (payment.dateKey) {
        // Try to parse the date key
        try {
          const parts = payment.dateKey.split('_')
          if (parts.length >= 3) {
            const day = parts[parts.length - 3] || parts[0]
            const month = parts[parts.length - 2] || parts[1]
            const year = parts[parts.length - 1] || parts[2]
            paymentDate = `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
          } else {
            paymentDate = payment.dateKey
          }
        } catch (error) {
          paymentDate = payment.dateKey
        }
      }
      
      doc.text(paymentDate, margin + 2, currentY)
      
      // Payment amount
      doc.setTextColor(0, 0, 0)
      const amount = payment.amount || payment[RF_RETURN_RECORD_FIELD.PAID_AMOUNT] || 'N/A'
      doc.text(String(amount), margin + col1Width + 2, currentY)
      
      currentY += rowHeight + 2
    }
    
    return currentY + 10
  },

  /**
   * Add profile image to PDF
   */
  async addProfileImage(doc, imageUrl, currentY, pageWidth, margin) {
    try {
      console.log('🔍 Starting image processing for:', imageUrl)
      
      // Convert image URL to base64 for PDF
      let base64Image = await this.getImageAsBase64(imageUrl)
      
      if (!base64Image) {
        console.log('⚠️ Failed to load image, creating placeholder')
        base64Image = this.createPlaceholderImage()
      }
      
      if (base64Image) {
        console.log('✅ Image ready for PDF (original or placeholder)')
        
        // Add image to PDF
        const imageWidth = 60
        const imageHeight = 60
        const imageX = pageWidth - margin - imageWidth
        const imageY = currentY - 10
        
        doc.addImage(base64Image, 'JPEG', imageX, imageY, imageWidth, imageHeight)
        
        // Add image label
        doc.setFontSize(8)
        doc.setTextColor(100, 100, 100)
        doc.text('Profile Image', imageX, imageY + imageHeight + 5)
        
        console.log('✅ Image added to PDF successfully')
        return currentY + imageHeight + 15
      } else {
        console.log('❌ Failed to create placeholder image')
        // Fallback to placeholder text
        doc.setFontSize(10)
        doc.setTextColor(100, 100, 100)
        doc.text('Profile Image: [Image not available]', margin, currentY)
        return currentY + 15
      }
    } catch (error) {
      console.warn('❌ Could not add profile image:', error)
      // Fallback to placeholder text
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text('Profile Image: [Image not available]', margin, currentY)
      return currentY + 15
    }
  },

  /**
   * Convert image URL to base64
   */
  async getImageAsBase64(imageUrl) {
    try {
      console.log('🔄 Converting image to base64:', imageUrl)
      
      // Handle Google Drive URLs
      let processedUrl = imageUrl
      
      if (imageUrl && !imageUrl.includes('http') && !imageUrl.includes('drive.google.com')) {
        // It's likely just a file ID, convert to Google Drive URL
        const fileId = imageUrl.trim()
        console.log('📁 Detected file ID:', fileId)
        
        if (fileId && fileId.length > 10) {
          // Try multiple approaches for Google Drive images
          const approaches = [
            // Approach 1: Try using a different proxy service
            async () => {
              const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://drive.google.com/uc?export=view&id=${fileId}`)}`
              console.log('🌐 Trying allorigins proxy:', url)
              return await this.loadImageViaProxy(url)
            },
            // Approach 2: Try using a different approach - direct fetch with different headers
            async () => {
              const url = `https://drive.google.com/uc?export=view&id=${fileId}`
              console.log('🌐 Trying direct fetch with headers:', url)
              return await this.loadImageViaFetch(url)
            },
            // Approach 3: Try thumbnail approach
            async () => {
              const url = `https://drive.google.com/thumbnail?id=${fileId}&sz=w300`
              console.log('🌐 Trying thumbnail approach:', url)
              return await this.loadImageViaFetch(url)
            },
            // Approach 4: Try alternative thumbnail format
            async () => {
              const url = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`
              console.log('🌐 Trying alternative thumbnail:', url)
              return await this.loadImageViaFetch(url)
            }
          ]
          
          // Try each approach
          for (const approach of approaches) {
            try {
              const result = await approach()
              if (result) {
                console.log('✅ Image loaded successfully')
                return result
              }
            } catch (error) {
              console.log('❌ Approach failed:', error.message)
            }
          }
          
          console.log('❌ All approaches failed')
          return null
        } else {
          console.log('❌ Invalid file ID length:', fileId)
          return null
        }
      } else if (imageUrl.includes('drive.google.com')) {
        // Convert to direct image URL using the utility function
        processedUrl = convertGoogleDriveUrl(imageUrl, 'w400')
        console.log('🔗 Converted Google Drive URL:', processedUrl)
        
        // Try loading the converted URL
        try {
          const result = await this.loadImageViaFetch(processedUrl)
          if (result) {
            return result
          }
        } catch (error) {
          console.log('❌ Fetch approach failed for URL:', processedUrl, error.message)
        }
      }
      
      console.log('❌ No valid URL generated or all methods failed')
      return null
    } catch (error) {
      console.warn('❌ Error converting image to base64:', error)
      return null
    }
  },

  /**
   * Load image via fetch (alternative approach)
   */
  async loadImageViaFetch(url) {
    try {
      console.log('🔗 Loading image via fetch:', url)
      
      const response = await fetch(url, {
        method: 'GET',
        mode: 'no-cors', // Try no-cors mode
        headers: {
          'Accept': 'image/*'
        }
      })
      
      if (!response.ok && response.type !== 'opaque') {
        throw new Error(`Fetch request failed: ${response.status} ${response.statusText}`)
      }
      
      const blob = await response.blob()
      console.log('📦 Blob size from fetch:', blob.size, 'bytes')
      
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64 = reader.result.split(',')[1]
          console.log('✅ Fetch conversion successful, length:', base64.length)
          resolve(base64)
        }
        reader.onerror = (error) => {
          console.error('❌ FileReader error:', error)
          resolve(null)
        }
        reader.readAsDataURL(blob)
      })
    } catch (error) {
      console.log('❌ Fetch approach failed:', error.message)
      return null
    }
  },

  /**
   * Load image via proxy (CORS-free approach)
   */
  async loadImageViaProxy(url) {
    try {
      console.log('🔗 Loading image via proxy:', url)
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'image/*',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      })
      
      if (!response.ok) {
        throw new Error(`Proxy request failed: ${response.status} ${response.statusText}`)
      }
      
      const blob = await response.blob()
      console.log('📦 Blob size from proxy:', blob.size, 'bytes')
      
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64 = reader.result.split(',')[1]
          console.log('✅ Proxy conversion successful, length:', base64.length)
          resolve(base64)
        }
        reader.onerror = (error) => {
          console.error('❌ FileReader error:', error)
          resolve(null)
        }
        reader.readAsDataURL(blob)
      })
    } catch (error) {
      console.log('❌ Proxy approach failed:', error.message)
      return null
    }
  },

  /**
   * Create a placeholder image as base64
   */
  createPlaceholderImage() {
    try {
      console.log('🎨 Creating placeholder image')
      
      // Create a canvas for the placeholder
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // Set canvas dimensions
      canvas.width = 200
      canvas.height = 200
      
      // Fill background
      ctx.fillStyle = '#f0f0f0'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw border
      ctx.strokeStyle = '#cccccc'
      ctx.lineWidth = 2
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)
      
      // Draw icon
      ctx.fillStyle = '#999999'
      ctx.font = '48px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('👤', canvas.width / 2, canvas.height / 2 - 10)
      
      // Draw text
      ctx.fillStyle = '#666666'
      ctx.font = '14px Arial'
      ctx.fillText('Profile Image', canvas.width / 2, canvas.height / 2 + 30)
      
      // Convert to base64
      const base64Data = canvas.toDataURL('image/jpeg', 0.8)
      const base64String = base64Data.split(',')[1]
      
      console.log('✅ Placeholder image created successfully')
      return base64String
    } catch (error) {
      console.log('❌ Failed to create placeholder image:', error.message)
      return null
    }
  },

  /**
   * Download PDF
   */
  downloadPDF(pdfDoc, filename) {
    try {
      pdfDoc.save(filename)
      return { success: true }
    } catch (error) {
      console.error('Error downloading PDF:', error)
      return { success: false, message: error.message }
    }
  }
}

export default pdfExportService
