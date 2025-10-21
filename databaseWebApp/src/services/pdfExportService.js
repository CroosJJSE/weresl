/**
 * PDF Export Service
 * Handles PDF generation for profiles using jsPDF
 * Optimized for performance and mobile devices
 * 
 * Note: Google Drive images have CORS restrictions when accessed from web applications.
 * Multiple fallback approaches are implemented to handle this limitation.
 * For production use, consider:
 * 1. Using a backend proxy service
 * 2. Implementing server-side image processing
 * 3. Setting SKIP_IMAGE_LOADING = true for maximum performance
 */

import { dbOperations } from '@/firebase/db.js'
import { convertGoogleDriveUrl, extractFileId } from '@/utils/driveUtils.js'
import { ProfileField, RootCollection, RF_LOAN_FIELD, GRANT_FIELD, RF_RETURN_RECORD_FIELD, RRH_OBJECT_FIELD } from '@/enums/db.js'
import { jsPDF } from 'jspdf'

// Logo file ID for the PDF header
const LOGO_FILE_ID = '1F727f-TTYnFjl93DQiSXvvY9DJaJEaNX'

// Performance optimization constants
const IMAGE_QUALITY = 0.6 // Reduced from 0.8 for better performance
const MAX_IMAGE_SIZE = 150 // Reduced from 200 for smaller file size
const MAX_CONCURRENT_REQUESTS = 3 // Limit concurrent image processing
const BATCH_SIZE = 5 // Process profiles in batches for better memory management
const SKIP_IMAGE_LOADING = false // Set to true to skip image loading entirely for maximum performance

export const pdfExportService = {
  /**
   * Generate PDF for selected profiles with parallel processing
   */
  async generateProfilesPDF(selectedRegIds, options = {}) {
    try {
      if (!selectedRegIds || selectedRegIds.length === 0) {
        throw new Error('No profiles selected for PDF generation')
      }

      // Default options
      const exportOptions = {
        includeImages: true,
        includeLoanHistory: true,
        includeGrantHistory: true,
        ...options
      }

      console.log(`🚀 Starting PDF generation for ${selectedRegIds.length} profiles`)

      // Load all selected profiles with parallel processing
      const profiles = await this.loadProfilesInBatches(selectedRegIds, exportOptions)
      
      if (profiles.length === 0) {
        throw new Error('No valid profiles found for PDF generation')
      }

      console.log(`✅ Loaded ${profiles.length} profiles, generating PDF content`)

      // Generate PDF content
      const pdfContent = await this.createPDFContent(profiles, exportOptions)
      
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
   * Load profiles in batches with parallel processing
   */
  async loadProfilesInBatches(regIds, options) {
    const profiles = []
    const batches = this.chunkArray(regIds, BATCH_SIZE)
    
    console.log(`📦 Processing ${regIds.length} profiles in ${batches.length} batches`)
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i]
      console.log(`🔄 Processing batch ${i + 1}/${batches.length} with ${batch.length} profiles`)
      
      // Process batch in parallel
      const batchPromises = batch.map(async (regId) => {
        try {
          const profileResult = await dbOperations.getProfileByRegId(regId)
          if (profileResult) {
            // Load loan details and RF return history in parallel
            const [loans, rfReturnHistory] = await Promise.all([
              dbOperations.getProfileLoans(regId),
              dbOperations.getRFReturnHistory(regId)
            ])
            
            return {
              ...profileResult,
              loans,
              rfReturnHistory
            }
          } else {
            console.warn(`Profile not found for Reg_ID: ${regId}`)
            return null
          }
        } catch (error) {
          console.error(`Error loading profile ${regId}:`, error)
          return null
        }
      })
      
      const batchResults = await Promise.all(batchPromises)
      profiles.push(...batchResults.filter(p => p !== null))
      
      // Small delay between batches to prevent overwhelming the system
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }
    
    return profiles
  },

  /**
   * Split array into chunks
   */
  chunkArray(array, size) {
    const chunks = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  },

  /**
   * Filter RF history by date range
   */
  filterRFHistoryByDateRange(rfHistory, fromDate, toDate) {
    if (!fromDate && !toDate) {
      return rfHistory // Return all if no date range specified
    }

    const filtered = rfHistory.filter(record => {
      let recordDate = null
      
      // Try to extract date from the record
      if (record.parsedDate) {
        recordDate = new Date(record.parsedDate)
      } else if (record.dateKey) {
        // Parse date key format (e.g., "2024_01_15")
        try {
          const parts = record.dateKey.split('_')
          if (parts.length >= 3) {
            const year = parts[0]
            const month = parts[1]
            const day = parts[2]
            recordDate = new Date(year, month - 1, day)
          }
        } catch (error) {
          console.warn('Could not parse date key:', record.dateKey)
        }
      }
      
      if (!recordDate) {
        return false // Skip records without valid dates
      }
      
      // Apply date range filter
      if (fromDate && toDate) {
        const from = new Date(fromDate)
        const to = new Date(toDate)
        return recordDate >= from && recordDate <= to
      } else if (fromDate) {
        const from = new Date(fromDate)
        return recordDate >= from
      } else if (toDate) {
        const to = new Date(toDate)
        return recordDate <= to
      }
      
      return true
    })
    
    return filtered
  },

  /**
   * Create PDF content for profiles with optimized layout
   */
  async createPDFContent(profiles, options = {}) {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 12 // Further reduced margins for mobile optimization
    const contentWidth = pageWidth - (2 * margin)
    
    let currentY = margin
    let pageNumber = 1

    // Add logo and header
    currentY = await this.addHeader(doc, currentY, pageWidth, margin)
    
    // Add profiles with optimized spacing
    for (let i = 0; i < profiles.length; i++) {
      const profile = profiles[i]
      
      // Check if we need a new page
      if (currentY > pageHeight - 60) { // Further reduced threshold
        doc.addPage()
        pageNumber++
        currentY = margin
        currentY = await this.addHeader(doc, currentY, pageWidth, margin, pageNumber)
      }
      
      currentY = await this.addProfileToPDF(doc, profile, currentY, pageWidth, margin, contentWidth, options)
      
      // Reduced spacing between profiles
      if (i < profiles.length - 1) {
        currentY += 3
      }
    }

    return doc
  },

  /**
   * Add header to PDF page with compact design
   */
  async addHeader(doc, currentY, pageWidth, margin, pageNumber = 1) {
    const headerY = currentY
    
    // Add logo if available
    try {
      const logoUrl = convertGoogleDriveUrl(LOGO_FILE_ID, 'w200')
      if (logoUrl) {
        doc.setFontSize(12) // Smaller logo text
        doc.setTextColor(26, 115, 232) // Blue color
        doc.text('WERESL', pageWidth / 2, headerY, { align: 'center' })
      }
    } catch (error) {
      console.warn('Could not load logo:', error)
    }
    
    // Add title
    doc.setFontSize(16) // Smaller title
    doc.setTextColor(26, 115, 232)
    doc.text('Profiles Report', pageWidth / 2, headerY + 10, { align: 'center' }) // Reduced spacing
    
    // Add generation date
    doc.setFontSize(8) // Smaller date text
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, headerY + 16, { align: 'center' }) // Reduced spacing
    
    // Add page number if not first page
    if (pageNumber > 1) {
      doc.text(`Page ${pageNumber}`, pageWidth - margin, headerY + 16, { align: 'right' }) // Reduced spacing
    }
    
    // Add separator line
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, headerY + 20, pageWidth - margin, headerY + 20) // Reduced spacing
    
    return headerY + 25 // Reduced total header height
  },

  /**
   * Add profile to PDF with compact layout
   */
  async addProfileToPDF(doc, profile, currentY, pageWidth, margin, contentWidth, options = {}) {
    const startY = currentY
    
    // Profile header row: name, ID, and image all on same line
    doc.setFontSize(12) // Smaller font
    doc.setTextColor(26, 115, 232)
    const profileName = this.getProfileField(profile, ['fullName', 'Name', 'basicInfo.name'])
    const regId = this.getProfileField(profile, ['Reg_ID', 'id'])
    
    // Add profile image if available and option is enabled (positioned on the right)
    let imageHeight = 0
    if (options.includeImages !== false && !SKIP_IMAGE_LOADING) {
      const imageUrl = this.getProfileField(profile, ['profileImageDriveId', 'Image', 'basicInfo.profileImageDriveId'])
      if (imageUrl) {
        imageHeight = await this.addProfileImageInline(doc, imageUrl, currentY, pageWidth, margin)
      }
    }
    
    // Add profile name and ID (positioned on the left)
    doc.text(`${profileName || 'Unknown'} (${regId || 'No ID'})`, margin, currentY + 6)
    
    // Move to next line after the header row
    currentY += Math.max(16, imageHeight + 3)
    
    // Profile details table (more compact)
    currentY = this.addProfileDetailsTable(doc, profile, currentY, pageWidth, margin, contentWidth, options)
    
    // Add RF loan details if option is enabled
    if (options.includeRFLoans !== false && profile.loans && profile.loans.length > 0) {
      currentY = this.addLoanDetails(doc, profile.loans, currentY, pageWidth, margin, contentWidth)
    }
    
    // Add RF payment history if option is enabled - using new table format
    if (options.includeRFHistory !== false && profile.rfReturnHistory) {
      // Handle both old array format and new object format
      if (Array.isArray(profile.rfReturnHistory)) {
        // Convert old array format to object format for consistency
        const historyObj = {}
        profile.rfReturnHistory.forEach((entry, index) => {
          const timestamp = entry.dateKey || entry.timestamp || `entry_${index}`
          historyObj[timestamp] = entry
        })
        currentY = this.addRFReturnHistoryTable(doc, historyObj, currentY, pageWidth, margin, contentWidth)
      } else if (typeof profile.rfReturnHistory === 'object' && profile.rfReturnHistory !== null) {
        // Use new object format directly
        currentY = this.addRFReturnHistoryTable(doc, profile.rfReturnHistory, currentY, pageWidth, margin, contentWidth)
      }
    }
    
    // Add separator line (reduced spacing)
    currentY += 3
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, currentY, pageWidth - margin, currentY)
    currentY += 8
    
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
  addProfileDetailsTable(doc, profile, currentY, pageWidth, margin, contentWidth, options = {}) {
    const tableStartY = currentY
    const rowHeight = 6 // Reduced row height
    const col1Width = contentWidth * 0.35 // Reduced first column width
    const col2Width = contentWidth * 0.65 // Increased second column width
    
    // Table header (more compact)
    doc.setFontSize(9) // Smaller font for header
    doc.setTextColor(100, 100, 100)
    doc.setFillColor(240, 240, 240)
    doc.rect(margin, currentY - 3, contentWidth, rowHeight + 1, 'F') // Reduced padding
    
    doc.setTextColor(26, 115, 232)
    doc.text('Field', margin + 2, currentY)
    doc.text('Value', margin + col1Width + 2, currentY)
    currentY += rowHeight + 3 // Reduced spacing
    
    // Profile fields to include with their possible field names
    const fieldsToInclude = [
      { keys: ['basicInfo.District', 'District', 'district'], label: 'District' },
      { keys: ['basicInfo.age', 'Age', 'yearOfBirth'], label: 'Age' },
      { keys: ['basicInfo.address', 'Address', 'address'], label: 'Address' },
      { keys: ['basicInfo.nic', 'NIC', 'nic'], label: 'NIC' },
      { keys: ['basicInfo.phone', 'Contact', 'phoneNumber', 'contact'], label: 'Contact' },
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
    
    // Children information fields removed as requested
    
    // Add each field
    for (const field of fieldsToInclude) {
      const value = this.getProfileField(profile, field.keys)
      if (value !== null && value !== undefined && value !== '') {
        // Check if we need a new page
        if (currentY > doc.internal.pageSize.getHeight() - 40) { // Reduced threshold
          doc.addPage()
          currentY = 20
        }
        
        // Field name (smaller font)
        doc.setFontSize(8)
        doc.setTextColor(100, 100, 100)
        doc.text(field.label, margin + 2, currentY)
        
        // Field value (smaller font)
        doc.setFontSize(8)
        doc.setTextColor(0, 0, 0)
        const valueText = String(value)
        const wrappedText = doc.splitTextToSize(valueText, col2Width - 4)
        doc.text(wrappedText, margin + col1Width + 2, currentY)
        
        // Calculate height based on wrapped text, but with minimum row height
        const textHeight = Math.max(rowHeight, wrappedText.length * 3) // Reduced multiplier
        currentY += textHeight
      }
    }
    
    return currentY
  },

  /**
   * Add loan details to PDF
   */
  addLoanDetails(doc, loans, currentY, pageWidth, margin, contentWidth) {
    // Check if we need a new page
    if (currentY > doc.internal.pageSize.getHeight() - 80) { // Reduced threshold
      doc.addPage()
      currentY = 20
    }
    
    // Section header (more compact)
    doc.setFontSize(12) // Smaller header
    doc.setTextColor(26, 115, 232)
    doc.text('Loan Details', margin, currentY)
    currentY += 10 // Reduced spacing
    
    const rowHeight = 8 // Reduced row height
    const col1Width = contentWidth * 0.15
    const col2Width = contentWidth * 0.15
    const col3Width = contentWidth * 0.15
    const col4Width = contentWidth * 0.15
    const col5Width = contentWidth * 0.15
    const col6Width = contentWidth * 0.25
    
    // Table header (more compact)
    doc.setFontSize(9) // Smaller font
    doc.setTextColor(100, 100, 100)
    doc.setFillColor(240, 240, 240)
    doc.rect(margin, currentY - 3, contentWidth, rowHeight + 1, 'F') // Reduced padding
    
    doc.setTextColor(26, 115, 232)
    doc.text('Type', margin + 2, currentY)
    doc.text('Loan Amount', margin + col1Width + 2, currentY)
    doc.text('Current Balance', margin + col1Width + col2Width + 2, currentY)
    doc.text('Date', margin + col1Width + col2Width + col3Width + 2, currentY)
    doc.text('Status', margin + col1Width + col2Width + col3Width + col4Width + 2, currentY)
    doc.text('Purpose', margin + col1Width + col2Width + col3Width + col4Width + col5Width + 2, currentY)
    currentY += rowHeight + 3 // Reduced spacing
    
    // Add each loan
    for (const loan of loans) {
      // Check if we need a new page
      if (currentY > doc.internal.pageSize.getHeight() - 40) { // Reduced threshold
        doc.addPage()
        currentY = 20
      }
      
      // Loan type
      doc.setFontSize(8) // Smaller font
      doc.setTextColor(100, 100, 100)
      doc.text(loan.type || 'Unknown', margin + 2, currentY)
      
      // Loan amount
      doc.setTextColor(0, 0, 0)
      let loanAmount = 'N/A'
      let currentBalance = 'N/A'
      
      if (loan.type === 'RF') {
        // For RF loans, show both loan amount and current balance
        loanAmount = loan[RF_LOAN_FIELD.AMOUNT] || loan.amount || 'N/A'
        currentBalance = loan[RF_LOAN_FIELD.CURRENT_BALANCE] || loan.currentBalance || 'N/A'
      } else if (loan.type === 'GRANT') {
        // For Grant loans, only show loan amount (no current balance)
        loanAmount = loan[GRANT_FIELD.AMOUNT] || loan[GRANT_FIELD.APPROVED_AMOUNT] || loan.amount || 'N/A'
        currentBalance = 'N/A' // Grant loans don't have current balance
      }
      
      doc.text(String(loanAmount), margin + col1Width + 2, currentY)
      doc.text(String(currentBalance), margin + col1Width + col2Width + 2, currentY)
      
      // Loan date - using the correct field names
      let loanDate = 'N/A'
      if (loan.type === 'RF') {
        // For RF loans, use initiationDate or approvedAt
        const dateField = loan[RF_LOAN_FIELD.INITIATION_DATE] || loan[RF_LOAN_FIELD.APPROVED_AT] || loan.initiationDate || loan.approvedAt
        loanDate = this.formatDateForPDF(dateField)
      } else if (loan.type === 'GRANT') {
        // For Grant loans, use requestedDate or approvedAt
        const dateField = loan[GRANT_FIELD.REQUESTED_DATE] || loan[GRANT_FIELD.APPROVED_AT] || loan.requestedDate || loan.approvedAt
        loanDate = this.formatDateForPDF(dateField)
      }
      doc.text(loanDate, margin + col1Width + col2Width + col3Width + 2, currentY)
      
      // Loan status
      const status = loan[RF_LOAN_FIELD.STATUS] || loan.status || 'N/A'
      doc.text(String(status), margin + col1Width + col2Width + col3Width + col4Width + 2, currentY)
      
      // Loan purpose
      const purpose = loan[RF_LOAN_FIELD.PURPOSE] || loan.purpose || loan[GRANT_FIELD.PURPOSE] || 'N/A'
      const purposeText = String(purpose)
      const wrappedPurpose = doc.splitTextToSize(purposeText, col6Width - 4)
      doc.text(wrappedPurpose, margin + col1Width + col2Width + col3Width + col4Width + col5Width + 2, currentY)
      
      currentY += Math.max(rowHeight, wrappedPurpose.length * 2.5) // Reduced multiplier
    }
    
    return currentY + 5 // Reduced spacing
  },

  /**
   * Add RF return history table to PDF with new object format
   */
  addRFReturnHistoryTable(doc, rfReturnHistory, currentY, pageWidth, margin, contentWidth) {
    // Check if we need a new page
    if (currentY > doc.internal.pageSize.getHeight() - 100) {
      doc.addPage()
      currentY = 20
    }
    
    // Section header
    doc.setFontSize(12)
    doc.setTextColor(26, 115, 232)
    doc.text('RF Return History', margin, currentY)
    currentY += 15
    
    // Table header
    const rowHeight = 12
    const colWidths = [
      contentWidth * 0.25, // Date
      contentWidth * 0.2,  // Amount
      contentWidth * 0.25, // Receiver
      contentWidth * 0.15, // Reduced Loan
      contentWidth * 0.15  // Effect
    ]
    
    doc.setFontSize(9)
    doc.setTextColor(100, 100, 100)
    doc.setFillColor(240, 240, 240)
    doc.rect(margin, currentY - 3, contentWidth, rowHeight + 1, 'F')
    
    doc.setTextColor(26, 115, 232)
    let xPos = margin + 2
    doc.text('Date', xPos, currentY)
    xPos += colWidths[0]
    doc.text('Amount', xPos, currentY)
    xPos += colWidths[1]
    doc.text('Receiver', xPos, currentY)
    xPos += colWidths[2]
    doc.text('Reduced Loan', xPos, currentY)
    xPos += colWidths[3]
    doc.text('Effect', xPos, currentY)
    currentY += rowHeight + 3
    
    // Process RF return history as object
    if (typeof rfReturnHistory === 'object' && rfReturnHistory !== null) {
      const entries = Object.entries(rfReturnHistory)
      
      for (const [timestamp, record] of entries) {
        // Check if we need a new page
        if (currentY > doc.internal.pageSize.getHeight() - 40) {
          doc.addPage()
          currentY = 20
        }
        
        // Parse the record - handle both old and new formats
        let dateStr = 'N/A'
        let amount = 'N/A'
        let receiver = 'N/A'
        let reducedLoan = 'N/A' // Placeholder for future implementation
        let effect = 'N/A' // Placeholder for future implementation
        
        // Handle new object format
        if (typeof record === 'object' && record !== null) {
          // Extract date from RRH object - use APPROVED_DATE field
          if (record[RRH_OBJECT_FIELD.APPROVED_DATE]) {
            dateStr = this.formatDateForPDF(record[RRH_OBJECT_FIELD.APPROVED_DATE])
          } else if (record.approvedDate) {
            dateStr = this.formatDateForPDF(record.approvedDate)
          } else if (record[RF_RETURN_RECORD_FIELD.TIMESTAMP]) {
            dateStr = this.formatDateForPDF(record[RF_RETURN_RECORD_FIELD.TIMESTAMP])
          } else if (record.timestamp) {
            dateStr = this.formatDateForPDF(record.timestamp)
          } else {
            // Try to parse timestamp key as fallback
            dateStr = this.parseTimestampKey(timestamp)
          }
          
          // Extract amount - use RRH object fields first
          amount = record[RRH_OBJECT_FIELD.AMOUNT] || 
                   record[RF_RETURN_RECORD_FIELD.PAID_AMOUNT] || 
                   record[RF_RETURN_RECORD_FIELD.AMOUNT] || 
                   record.amount || 'N/A'
          
          // Extract receiver - use RRH object fields first
          receiver = record[RRH_OBJECT_FIELD.RECEIVER] || 
                     record[RF_RETURN_RECORD_FIELD.RECEIVER] || 
                     record.receiver || 'N/A'
          
          // Format amount as currency
          if (typeof amount === 'number') {
            amount = `LKR ${amount.toLocaleString()}`
          }
        } else {
          // Handle old format (just amount)
          amount = typeof record === 'number' ? `LKR ${record.toLocaleString()}` : record
          dateStr = this.parseTimestampKey(timestamp)
        }
        
        // Add table row
        doc.setFontSize(8)
        doc.setTextColor(0, 0, 0)
        
        xPos = margin + 2
        doc.text(dateStr, xPos, currentY)
        xPos += colWidths[0]
        doc.text(String(amount), xPos, currentY)
        xPos += colWidths[1]
        doc.text(String(receiver), xPos, currentY)
        xPos += colWidths[2]
        doc.text(String(reducedLoan), xPos, currentY)
        xPos += colWidths[3]
        doc.text(String(effect), xPos, currentY)
        
        currentY += rowHeight + 1
      }
    }
    
    return currentY + 10
  },

  /**
   * Format date for PDF display
   */
  formatDateForPDF(date) {
    if (!date) return 'N/A'
    
    try {
      const dateObj = date.toDate ? date.toDate() : new Date(date)
      return dateObj.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    } catch (error) {
      return String(date)
    }
  },

  /**
   * Parse timestamp key to readable date
   */
  parseTimestampKey(timestamp) {
    try {
      // Handle RRH ID format (e.g., "001-BAD001-RRH")
      if (timestamp.includes('-') && timestamp.includes('RRH')) {
        return 'Date N/A'
      }
      
      // Handle various timestamp formats
      if (timestamp.includes('_')) {
        // Format: YYYY_MM_DD_HH_MM_SS
        const parts = timestamp.split('_')
        if (parts.length >= 3) {
          const year = parts[0]
          const month = parts[1]
          const day = parts[2]
          return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
        }
      } else if (timestamp.length === 13) {
        // Unix timestamp in milliseconds
        const date = new Date(parseInt(timestamp))
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      } else {
        // Try to parse as date
        const date = new Date(timestamp)
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
        }
      }
    } catch (error) {
      console.warn('Could not parse timestamp:', timestamp)
    }
    
    return timestamp
  },

  /**
   * Add profile image to PDF (inline with profile header) - Optimized for performance
   */
  async addProfileImageInline(doc, imageUrl, currentY, pageWidth, margin) {
    try {
      console.log('🔍 Starting optimized inline image processing for:', imageUrl)
      
      // Convert image URL to base64 for PDF with reduced quality
      let base64Image = await this.getImageAsBase64(imageUrl)
      
      if (!base64Image) {
        console.log('⚠️ Failed to load image, creating optimized placeholder')
        base64Image = this.createOptimizedPlaceholderImage()
        
        // If optimized placeholder fails, try simple text placeholder
        if (!base64Image) {
          console.log('⚠️ Optimized placeholder failed, creating simple text placeholder')
          base64Image = this.createSimpleTextPlaceholder()
        }
      }
      
      if (base64Image) {
        console.log('✅ Optimized image ready for PDF')
        
        // Add image to PDF with reduced size for better performance
        const imageWidth = MAX_IMAGE_SIZE * 0.3 // 45px for better performance
        const imageHeight = MAX_IMAGE_SIZE * 0.3 // 45px for better performance
        const imageX = pageWidth - margin - imageWidth
        const imageY = currentY
        
        doc.addImage(base64Image, 'JPEG', imageX, imageY, imageWidth, imageHeight)
        
        // Add small image label below
        doc.setFontSize(6) // Smaller font
        doc.setTextColor(100, 100, 100)
        doc.text('Photo', imageX + imageWidth/2, imageY + imageHeight + 2, { align: 'center' })
        
        console.log('✅ Optimized inline image added to PDF successfully')
        return imageHeight + 6 // Return height including label
      } else {
        console.log('❌ Failed to create optimized placeholder image')
        return 0
      }
    } catch (error) {
      console.warn('❌ Could not add optimized inline profile image:', error)
      return 0
    }
  },

  /**
   * Add profile image to PDF (legacy method - kept for compatibility)
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
   * Convert image URL to base64 - Optimized for performance with CORS handling
   */
  async getImageAsBase64(imageUrl) {
    try {
      console.log('🔄 Converting image to base64 with optimization:', imageUrl)
      
      // Handle Google Drive URLs
      let processedUrl = imageUrl
      
      if (imageUrl && !imageUrl.includes('http') && !imageUrl.includes('drive.google.com')) {
        // It's likely just a file ID, convert to Google Drive URL
        const fileId = imageUrl.trim()
        console.log('📁 Detected file ID:', fileId)
        
        if (fileId && fileId.length > 10) {
          // Try multiple approaches to handle CORS issues
          const approaches = [
            // Approach 1: Try using the utility function for better CORS handling
            async () => {
              const url = convertGoogleDriveUrl(fileId, `w${MAX_IMAGE_SIZE}`)
              console.log('🌐 Trying utility function URL:', url)
              return await this.loadImageViaFetch(url)
            },
            // Approach 2: Try different thumbnail format
            async () => {
              const url = `https://drive.google.com/thumbnail?id=${fileId}&sz=w${MAX_IMAGE_SIZE}`
              console.log('🌐 Trying thumbnail format:', url)
              return await this.loadImageViaFetch(url)
            },
            // Approach 3: Try using a CORS proxy service
            async () => {
              const url = `https://cors-anywhere.herokuapp.com/https://drive.google.com/thumbnail?id=${fileId}&sz=w${MAX_IMAGE_SIZE}`
              console.log('🌐 Trying CORS proxy:', url)
              return await this.loadImageViaFetch(url)
            },
            // Approach 4: Try alternative proxy service
            async () => {
              const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://drive.google.com/thumbnail?id=${fileId}&sz=w${MAX_IMAGE_SIZE}`)}`
              console.log('🌐 Trying allorigins proxy:', url)
              return await this.loadImageViaFetch(url)
            },
            // Approach 5: Try using a different Google Drive format
            async () => {
              const url = `https://drive.google.com/uc?export=view&id=${fileId}`
              console.log('🌐 Trying export view format:', url)
              return await this.loadImageViaFetch(url)
            },
            // Approach 6: Try using a different proxy service
            async () => {
              const url = `https://corsproxy.io/?${encodeURIComponent(`https://drive.google.com/thumbnail?id=${fileId}&sz=w${MAX_IMAGE_SIZE}`)}`
              console.log('🌐 Trying corsproxy.io:', url)
              return await this.loadImageViaFetch(url)
            }
          ]
          
          // Try each approach
          for (let i = 0; i < approaches.length; i++) {
            try {
              console.log(`🔄 Trying approach ${i + 1}/${approaches.length}`)
              const result = await approaches[i]()
              if (result) {
                console.log(`✅ Approach ${i + 1} succeeded`)
                return result
              }
            } catch (error) {
              console.log(`❌ Approach ${i + 1} failed:`, error.message)
            }
          }
          
          console.log('❌ All approaches failed, will use placeholder')
          return null
        } else {
          console.log('❌ Invalid file ID length:', fileId)
          return null
        }
      } else if (imageUrl.includes('drive.google.com')) {
        // Convert to direct image URL using the utility function with optimized size
        processedUrl = convertGoogleDriveUrl(imageUrl, `w${MAX_IMAGE_SIZE}`)
        console.log('🔗 Converted Google Drive URL with optimization:', processedUrl)
        
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
   * Load image via fetch (mobile-compatible with CORS handling)
   */
  async loadImageViaFetch(url) {
    try {
      console.log('🔗 Loading image via fetch:', url)
      
      // Try multiple fetch approaches for mobile compatibility and CORS handling
      const approaches = [
        // Approach 1: CORS mode with credentials
        async () => {
          const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
            headers: {
              'Accept': 'image/*',
              'Cache-Control': 'no-cache'
            }
          })
          
          if (!response.ok) {
            throw new Error(`CORS fetch failed: ${response.status}`)
          }
          
          const blob = await response.blob()
          console.log('📦 Blob size from CORS fetch:', blob.size, 'bytes')
          
          if (blob.size === 0) {
            throw new Error('Empty blob received')
          }
          
          return await this.blobToBase64(blob)
        },
        
        // Approach 2: No-CORS mode (for Google Drive URLs)
        async () => {
          const response = await fetch(url, {
            method: 'GET',
            mode: 'no-cors',
            credentials: 'omit',
            headers: {
              'Accept': 'image/*'
            }
          })
          
          // Note: no-cors mode returns opaque response, we can't read the content
          // This is just to check if the request succeeds
          console.log('📦 No-CORS response type:', response.type)
          
          if (response.type === 'opaque') {
            // For opaque responses, we need to try a different approach
            throw new Error('Opaque response received, cannot read content')
          }
          
          const blob = await response.blob()
          return await this.blobToBase64(blob)
        },
        
        // Approach 3: XMLHttpRequest with CORS
        async () => {
          return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.responseType = 'blob'
            xhr.withCredentials = false
            
            xhr.onload = async function() {
              if (this.status === 200) {
                try {
                  const base64 = await this.blobToBase64(this.response)
                  resolve(base64)
                } catch (error) {
                  reject(error)
                }
              } else {
                reject(new Error(`XHR failed: ${this.status}`))
              }
            }
            
            xhr.onerror = () => reject(new Error('XHR network error'))
            xhr.ontimeout = () => reject(new Error('XHR timeout'))
            xhr.timeout = 10000 // 10 second timeout
            
            xhr.send()
          })
        },
        
        // Approach 4: Try with different user agent
        async () => {
          const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
            headers: {
              'Accept': 'image/*',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
          })
          
          if (!response.ok) {
            throw new Error(`Fetch with custom UA failed: ${response.status}`)
          }
          
          const blob = await response.blob()
          return await this.blobToBase64(blob)
        }
      ]
      
      // Try each approach
      for (let i = 0; i < approaches.length; i++) {
        try {
          console.log(`🔄 Trying fetch approach ${i + 1}/${approaches.length}`)
          const result = await approaches[i]()
          if (result) {
            console.log(`✅ Fetch approach ${i + 1} succeeded`)
            return result
          }
        } catch (error) {
          console.log(`❌ Fetch approach ${i + 1} failed:`, error.message)
        }
      }
      
      console.log('❌ All fetch approaches failed')
      return null
    } catch (error) {
      console.log('❌ Fetch approach failed:', error.message)
      return null
    }
  },
  
  /**
   * Convert blob to base64
   */
  async blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        try {
          const base64 = reader.result.split(',')[1]
          if (base64 && base64.length > 0) {
            console.log('✅ Blob to base64 conversion successful, length:', base64.length)
            resolve(base64)
          } else {
            reject(new Error('Empty base64 result'))
          }
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = (error) => {
        console.error('❌ FileReader error:', error)
        reject(error)
      }
      reader.readAsDataURL(blob)
    })
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
   * Create an optimized placeholder image as base64 - Smaller size and lower quality for performance
   */
  createOptimizedPlaceholderImage() {
    try {
      console.log('🎨 Creating optimized placeholder image')
      
      // Create a canvas for the placeholder with smaller dimensions
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // Set canvas dimensions to smaller size for better performance
      canvas.width = MAX_IMAGE_SIZE
      canvas.height = MAX_IMAGE_SIZE
      
      // Fill background
      ctx.fillStyle = '#f0f0f0'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw border
      ctx.strokeStyle = '#cccccc'
      ctx.lineWidth = 1 // Thinner border
      ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4)
      
      // Draw icon (smaller)
      ctx.fillStyle = '#999999'
      ctx.font = `${Math.floor(canvas.width * 0.3)}px Arial` // Proportional font size
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('👤', canvas.width / 2, canvas.height / 2 - 5)
      
      // Draw text (smaller)
      ctx.fillStyle = '#666666'
      ctx.font = `${Math.floor(canvas.width * 0.12)}px Arial` // Proportional font size
      ctx.fillText('Photo', canvas.width / 2, canvas.height / 2 + 15)
      
      // Convert to base64 with reduced quality for better performance
      const base64Data = canvas.toDataURL('image/jpeg', IMAGE_QUALITY)
      const base64String = base64Data.split(',')[1]
      
      console.log('✅ Optimized placeholder image created successfully')
      return base64String
    } catch (error) {
      console.log('❌ Failed to create optimized placeholder image:', error.message)
      return null
    }
  },

  /**
   * Create a simple text-based placeholder when canvas is not available
   */
  createSimpleTextPlaceholder() {
    try {
      console.log('🎨 Creating simple text placeholder')
      
      // Create a canvas for the placeholder
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // Set canvas dimensions
      canvas.width = MAX_IMAGE_SIZE
      canvas.height = MAX_IMAGE_SIZE
      
      // Fill background
      ctx.fillStyle = '#f8f9fa'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw border
      ctx.strokeStyle = '#dee2e6'
      ctx.lineWidth = 1
      ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2)
      
      // Draw text
      ctx.fillStyle = '#6c757d'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('No Image', canvas.width / 2, canvas.height / 2)
      
      // Convert to base64
      const base64Data = canvas.toDataURL('image/jpeg', IMAGE_QUALITY)
      const base64String = base64Data.split(',')[1]
      
      console.log('✅ Simple text placeholder created successfully')
      return base64String
    } catch (error) {
      console.log('❌ Failed to create simple text placeholder:', error.message)
      return null
    }
  },

  /**
   * Download PDF (mobile-compatible)
   */
  downloadPDF(pdfDoc, filename) {
    try {
      // Check if we're on a mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      if (isMobile) {
        // For mobile devices, use blob download method
        const pdfBlob = pdfDoc.output('blob')
        const url = URL.createObjectURL(pdfBlob)
        
        // Create a temporary link element
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        link.style.display = 'none'
        
        // Append to body, click, and remove
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Clean up the URL object
        setTimeout(() => {
          URL.revokeObjectURL(url)
        }, 100)
        
        return { success: true }
      } else {
        // For desktop, use the standard method
        pdfDoc.save(filename)
        return { success: true }
      }
    } catch (error) {
      console.error('Error downloading PDF:', error)
      
      // Fallback method for all devices
      try {
        const pdfBlob = pdfDoc.output('blob')
        const url = URL.createObjectURL(pdfBlob)
        
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        link.style.display = 'none'
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        setTimeout(() => {
          URL.revokeObjectURL(url)
        }, 100)
        
        return { success: true }
      } catch (fallbackError) {
        console.error('Fallback download also failed:', fallbackError)
        return { success: false, message: fallbackError.message }
      }
    }
  }
}

export default pdfExportService
