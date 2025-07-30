import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase-config.js';

export class FirestoreService {
  constructor() {
    this.db = db;
  }

  // Get all documents from a collection with pagination support
  async getDocuments(collectionName, limitCount = 100, lastDocument = null) {
    try {
      console.log('FirestoreService: Getting documents from collection:', collectionName, 'limit:', limitCount);

      // For profiles, order by Reg_ID instead of createdAt
      let q;
      if (collectionName === 'profiles') {
        q = query(
          collection(this.db, collectionName),
          orderBy('Reg_ID', 'asc'),
          limit(limitCount)
        );
      } else {
        q = query(
          collection(this.db, collectionName),
          orderBy('createdAt', 'desc'),
          limit(limitCount)
        );
      }

      // Add startAfter if we have a last document for pagination
      if (lastDocument) {
        console.log('FirestoreService: Using pagination, starting after document ID:', lastDocument.id);
        // Get the document snapshot for startAfter
        const lastDocRef = doc(this.db, collectionName, lastDocument.id);
        const lastDocSnap = await getDoc(lastDocRef);

        if (lastDocSnap.exists()) {
          q = query(
            collection(this.db, collectionName),
            orderBy('Reg_ID', 'asc'),
            startAfter(lastDocSnap),
            limit(limitCount)
          );
        } else {
          console.log('FirestoreService: Last document not found, starting from beginning');
        }
      }

      const querySnapshot = await getDocs(q);
      const documents = [];

      querySnapshot.forEach((doc) => {
        const docData = {
          id: doc.id,
          ...doc.data()
        };
        documents.push(docData);
        console.log('FirestoreService: Document loaded:', docData);
      });

      console.log('FirestoreService: Total documents loaded:', documents.length);

      // Return both documents and the last document for pagination
      return {
        documents,
        lastDocument: documents.length > 0 ? documents[documents.length - 1] : null,
        hasMore: documents.length === limitCount
      };
    } catch (error) {
      console.error('FirestoreService: Error fetching documents:', error);
      throw error;
    }
  }

  // Get loans for a profile (including RF_Loans and GRANT subcollections)
  async getLoans(profileId) {
    try {
      console.log('FirestoreService: Getting loans for profile:', profileId);
      const loans = [];

      // Get RF_Loans from subcollection
      try {
        const rfQuery = query(collection(this.db, 'profiles', profileId, 'RF_Loans'));
        const rfSnapshot = await getDocs(rfQuery);
        rfSnapshot.docs.forEach(doc => {
          loans.push({ id: doc.id, ...doc.data(), type: 'RF' });
        });
        console.log('FirestoreService: RF loans loaded:', rfSnapshot.docs.length);
      } catch (error) {
        console.log('FirestoreService: No RF_Loans collection found for profile:', profileId);
      }

      // Get GRANT loans from subcollection
      try {
        const grantQuery = query(collection(this.db, 'profiles', profileId, 'GRANT'));
        const grantSnapshot = await getDocs(grantQuery);
        grantSnapshot.docs.forEach(doc => {
          loans.push({ id: doc.id, ...doc.data(), type: 'GRANT' });
        });
        console.log('FirestoreService: GRANT loans loaded:', grantSnapshot.docs.length);
      } catch (error) {
        console.log('FirestoreService: No GRANT collection found for profile:', profileId);
      }

      // Sort by creation date (newest first)
      const sortedLoans = loans.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
        const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
        return dateB - dateA;
      });

      console.log('FirestoreService: Total loans loaded:', sortedLoans.length);
      return sortedLoans;
    } catch (error) {
      console.error('FirestoreService: Error getting loans:', error);
      throw error;
    }
  }

  // Update a loan in the subcollection
  async updateLoan(profileId, loanId, loanType, updateData) {
    try {
      console.log('FirestoreService: Updating loan:', loanId, 'for profile:', profileId, 'type:', loanType);
      console.log('FirestoreService: Update data:', updateData);

      // Determine the subcollection path based on loan type
      const subcollectionPath = loanType === 'RF' ? 'RF_Loans' : 'GRANT';
      const loanRef = doc(this.db, 'profiles', profileId, subcollectionPath, loanId);

      // Get the current loan data to validate
      const currentLoan = await getDoc(loanRef);
      if (!currentLoan.exists()) {
        throw new Error('Loan not found');
      }

      const currentData = currentLoan.data();
      console.log('FirestoreService: Current loan data:', currentData);

      // Validate that the loan is active
      if (currentData.status !== 'active') {
        throw new Error('Only active loans can be updated');
      }

      // Validate amount - new amount must be >= current balance
      const currentBalance = currentData.currentBalance || 0;
      const newAmount = updateData.amount;
      
      if (newAmount < currentBalance) {
        throw new Error(`New amount (LKR ${this.formatCurrency(newAmount)}) cannot be less than current balance (LKR ${this.formatCurrency(currentBalance)})`);
      }

      // Prepare update data
      const updatePayload = {
        ...updateData,
        lastUpdated: serverTimestamp()
      };

      // Update the loan document
      await updateDoc(loanRef, updatePayload);

      console.log('FirestoreService: Loan updated successfully');
      return { success: true, message: 'Loan updated successfully' };
    } catch (error) {
      console.error('FirestoreService: Error updating loan:', error);
      throw error;
    }
  }

  // Search documents by multiple fields with improved logic
  async searchDocuments(collectionName, searchTerm, searchFields = ['Name', 'NIC', 'Reg_ID', 'contact']) {
    try {
      console.log('FirestoreService: Searching for:', searchTerm, 'in fields:', searchFields);

      if (!searchTerm || searchTerm.trim() === '') {
        console.log('FirestoreService: Empty search term, returning all documents');
        const result = await this.getDocuments(collectionName);
        return result.documents;
      }

      const documents = [];
      const searchLower = searchTerm.toLowerCase();

      // Get more documents for better search coverage
      const q = query(
        collection(this.db, collectionName),
        orderBy('Reg_ID', 'asc'),
        limit(500) // Increased limit for better search coverage
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const docData = { id: doc.id, ...data };

        // Check if any of the search fields contain the search term
        const matches = searchFields.some(field => {
          const value = data[field];
          if (value) {
            const fieldMatches = value.toString().toLowerCase().includes(searchLower);
            if (fieldMatches) {
              console.log('FirestoreService: Match found in field:', field, 'value:', value);
            }
            return fieldMatches;
          }
          return false;
        });

        if (matches) {
          documents.push(docData);
          console.log('FirestoreService: Document matched search:', docData);
        }
      });

      console.log('FirestoreService: Search results count:', documents.length);
      return documents;
    } catch (error) {
      console.error('FirestoreService: Error searching documents:', error);
      throw error;
    }
  }

  // Update a document with SearchElements collection updates
  async updateDocument(collectionName, documentId, updateData) {
    try {
      console.log('FirestoreService: Updating document:', documentId, 'in collection:', collectionName);
      console.log('FirestoreService: Update data:', updateData);

      const docRef = doc(this.db, collectionName, documentId);

      // If this is a profile update and NIC is being changed
      if (collectionName === 'profiles' && updateData.NIC) {
        // Check if this is a new NIC being added
        const existingNic = await this.getDocumentField(collectionName, documentId, 'NIC');
        if (!existingNic || existingNic.trim() === '') {
          // This is a new NIC being added, check if it already exists
          const nicExists = await this.checkNicExists(updateData.NIC);
          if (nicExists) {
            throw new Error(`NIC ${updateData.NIC} already exists in the system`);
          }
        }

        // Add NIC to SearchElements mapping
        await this.updateSearchElementsNIC(updateData.NIC, documentId);
      }

      // If district is being changed, generate new Reg_ID and update document ID
      if (collectionName === 'profiles' && updateData.District) {
        // Get the current district to compare
        const currentDistrict = await this.getDocumentField(collectionName, documentId, 'District');
        
        // Only regenerate Reg_ID if district actually changed
        if (currentDistrict !== updateData.District) {
          console.log('FirestoreService: District changed from', currentDistrict, 'to', updateData.District);
          const newRegId = await this.generateNewRegId(updateData.District);
          updateData.Reg_ID = newRegId;
          console.log('FirestoreService: Generated new Reg_ID:', newRegId);

          // Get the current document data
          const currentDoc = await getDoc(docRef);
          if (currentDoc.exists()) {
            const currentData = currentDoc.data();

            // Create new document with new Reg_ID as ID
            const newDocRef = doc(this.db, collectionName, newRegId);
            await setDoc(newDocRef, {
              ...currentData,
              ...updateData,
              Reg_ID: newRegId,
              lastUpdated: new Date()
            });

            // Delete the old document
            await this.deleteDocument(collectionName, documentId);

            // Update SearchElements with new Reg_ID
            if (updateData.NIC) {
              await this.updateSearchElementsNIC(updateData.NIC, newRegId);
            }

            console.log('FirestoreService: Document ID updated from', documentId, 'to', newRegId);
            return { success: true, message: 'Document updated successfully', newDocumentId: newRegId };
          }
        } else {
          console.log('FirestoreService: District unchanged, skipping Reg_ID regeneration');
        }
      }

      // Regular update (no district change)
      await updateDoc(docRef, {
        ...updateData,
        lastUpdated: new Date()
      });

      console.log('FirestoreService: Document updated successfully');
      return { success: true, message: 'Document updated successfully' };
    } catch (error) {
      console.error('FirestoreService: Error updating document:', error);
      throw error;
    }
  }

  // Delete a document
  async deleteDocument(collectionName, documentId) {
    try {
      console.log('FirestoreService: Deleting document:', documentId, 'from collection:', collectionName);
      const docRef = doc(this.db, collectionName, documentId);
      await deleteDoc(docRef);
      console.log('FirestoreService: Document deleted successfully');
    } catch (error) {
      console.error('FirestoreService: Error deleting document:', error);
      throw error;
    }
  }

  // Update SearchElements collection with NIC mapping
  async updateSearchElementsNIC(nic, regId) {
    try {
      console.log('FirestoreService: Updating SearchElements NIC mapping:', nic, '->', regId);

      const searchElementsRef = doc(this.db, 'config', 'SearchElements');
      const searchElementsDoc = await getDoc(searchElementsRef);

      let nicData = {};
      if (searchElementsDoc.exists()) {
        nicData = searchElementsDoc.data().NIC_data || {};
      }

      // Check if NIC already exists with different Reg_ID
      if (nicData[nic] && nicData[nic] !== regId) {
        // If this is a district change (same NIC, different Reg_ID), allow the update
        // This means the profile is being moved to a different district
        console.log('FirestoreService: NIC exists with different Reg_ID, updating mapping for district change');
      }

      // Update the mapping (this will overwrite existing mapping)
      nicData[nic] = regId;

      await setDoc(searchElementsRef, { NIC_data: nicData }, { merge: true });
      console.log('FirestoreService: SearchElements NIC mapping updated successfully');
    } catch (error) {
      console.error('FirestoreService: Error updating SearchElements:', error);
      throw error;
    }
  }

  // Generate new Reg_ID for a district
  async generateNewRegId(district) {
    try {
      console.log('FirestoreService: Generating new Reg_ID for district:', district);
      const districtCode = district.substring(0, 3).toUpperCase();

      // Get all existing Reg_IDs for this district
      const q = query(
        collection(this.db, 'profiles'),
        where('District', '==', district)
      );

      const querySnapshot = await getDocs(q);
      const existingRegIds = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        const regId = data.Reg_ID;
        if (regId && regId.startsWith(districtCode)) {
          existingRegIds.push(regId);
        }
      });

      console.log('FirestoreService: Existing Reg_IDs for district:', existingRegIds);

      // Find the highest number
      let nextNumber = 1;
      if (existingRegIds.length > 0) {
        const numbers = existingRegIds.map(regId => {
          const numberPart = regId.replace(districtCode, '');
          return parseInt(numberPart) || 0;
        });
        nextNumber = Math.max(...numbers) + 1;
      }

      const newRegId = `${districtCode}${nextNumber.toString().padStart(3, '0')}`;
      console.log('FirestoreService: Generated new Reg_ID:', newRegId);

      return newRegId;
    } catch (error) {
      console.error('FirestoreService: Error generating Reg_ID:', error);
      throw error;
    }
  }

  // Generate Reg_ID preview without saving (for live preview)
  async generateRegIdPreview(district) {
    try {
      console.log('FirestoreService: Generating Reg_ID preview for district:', district);
      const districtCode = district.substring(0, 3).toUpperCase();

      // Get all existing Reg_IDs for this district
      const q = query(
        collection(this.db, 'profiles'),
        where('District', '==', district)
      );

      const querySnapshot = await getDocs(q);
      const existingRegIds = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        const regId = data.Reg_ID;
        if (regId && regId.startsWith(districtCode)) {
          existingRegIds.push(regId);
        }
      });

      console.log('FirestoreService: Existing Reg_IDs for district (preview):', existingRegIds);

      // Find the highest number
      let nextNumber = 1;
      if (existingRegIds.length > 0) {
        const numbers = existingRegIds.map(regId => {
          const numberPart = regId.replace(districtCode, '');
          return parseInt(numberPart) || 0;
        });
        nextNumber = Math.max(...numbers) + 1;
      }

      const newRegId = `${districtCode}${nextNumber.toString().padStart(3, '0')}`;
      console.log('FirestoreService: Generated Reg_ID preview:', newRegId);

      return newRegId;
    } catch (error) {
      console.error('FirestoreService: Error generating Reg_ID preview:', error);
      throw error;
    }
  }

  // Check if NIC already exists in the system
  async checkNicExists(nic) {
    try {
      console.log('FirestoreService: Checking if NIC exists:', nic);

      const searchElementsRef = doc(this.db, 'config', 'SearchElements');
      const searchElementsDoc = await getDoc(searchElementsRef);

      if (searchElementsDoc.exists()) {
        const nicData = searchElementsDoc.data().NIC_data || {};
        const exists = nicData.hasOwnProperty(nic);
        console.log('FirestoreService: NIC exists check result:', exists);
        return exists;
      }

      return false;
    } catch (error) {
      console.error('FirestoreService: Error checking NIC existence:', error);
      throw error;
    }
  }

  // Get a specific field from a document
  async getDocumentField(collectionName, documentId, fieldName) {
    try {
      const docRef = doc(this.db, collectionName, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data()[fieldName];
      }

      return null;
    } catch (error) {
      console.error('FirestoreService: Error getting document field:', error);
      throw error;
    }
  }

  // Get available collections (this would need to be implemented based on your needs)
  async getCollections() {
    // For now, return only profiles collection
    return ['profiles'];
  }

  // Get districts list
  getDistricts() {
    return [
      'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
      'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
      'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
      'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
      'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
    ];
  }

  // Format date for display
  formatDate(timestamp) {
    if (!timestamp) return 'N/A';

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Format currency for display
  formatCurrency(amount) {
    if (!amount) return '0.00';
    return parseFloat(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}

export default new FirestoreService(); 