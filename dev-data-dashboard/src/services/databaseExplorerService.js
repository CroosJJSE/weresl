import { 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  query,
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../firebase-config.js'
import { RootCollection, ProfileField, ARMS_VALUES } from '../enums/db.js'

export class DatabaseExplorerService {
  constructor() {
    this.db = db
  }

  // Get all root collections
  async getRootCollections() {
    try {
      console.log('DatabaseExplorerService: Fetching root collections')
      
      // Firestore doesn't have a direct way to list collections
      // We'll use a workaround by trying to get documents from known collections
      // and also attempt to discover new ones dynamically
      
      const collections = []
      
      // Get all collections from the enums
      const allCollections = Object.values(RootCollection)
      
      for (const collectionName of allCollections) {
        try {
          const q = query(collection(this.db, collectionName), limit(1))
          const snapshot = await getDocs(q)
          
          // Count total documents in this collection
          const countQuery = query(collection(this.db, collectionName))
          const countSnapshot = await getDocs(countQuery)
          
          collections.push({
            id: collectionName,
            name: collectionName,
            type: 'collection',
            path: collectionName,
            documentCount: countSnapshot.size
          })
        } catch (error) {
          console.log(`Collection ${collectionName} not accessible or doesn't exist:`, error.message)
          // Still add the collection even if it's empty or has permission issues
          collections.push({
            id: collectionName,
            name: collectionName,
            type: 'collection',
            path: collectionName,
            documentCount: 0
          })
        }
      }
      
      console.log('DatabaseExplorerService: Found collections:', collections)
      return collections
    } catch (error) {
      console.error('DatabaseExplorerService: Error fetching root collections:', error)
      throw error
    }
  }

  // Get documents from a collection
  async getCollectionDocuments(collectionPath, limitCount = 1000) {
    try {
      console.log('DatabaseExplorerService: Fetching documents from collection:', collectionPath)
      
      const q = query(collection(this.db, collectionPath), limit(limitCount))
      const snapshot = await getDocs(q)
      
      const documents = []
      snapshot.forEach(doc => {
        const docData = {
          id: doc.id,
          name: doc.id,
          type: 'document',
          path: `${collectionPath}/${doc.id}`,
          data: doc.data(),
          exists: doc.exists()
        }
        documents.push(docData)
      })
      
      console.log('DatabaseExplorerService: Found documents:', documents.length)
      return documents
    } catch (error) {
      console.error('DatabaseExplorerService: Error fetching collection documents:', error)
      throw error
    }
  }

  // Get subcollections of a document
  async getDocumentSubcollections(documentPath) {
    try {
      console.log('DatabaseExplorerService: Fetching subcollections for document:', documentPath)
      
      // Split path into collection and document parts
      const pathParts = documentPath.split('/')
      if (pathParts.length < 2) {
        throw new Error('Invalid document path')
      }
      
      const collectionName = pathParts[0]
      const documentId = pathParts[1]
      
      // Check if this is a loan document (has 3+ path parts like profiles/AMP001/RF_Loans/loanId)
      // Loan documents typically don't have subcollections
      if (pathParts.length >= 3) {
        console.log('DatabaseExplorerService: This appears to be a loan document, no subcollections expected')
        return []
      }
      
      // Try to get subcollections by attempting to access common ones
      // Use enum values for subcollection names from ProfileField
      const commonSubcollections = [
        ProfileField.RF_LOANS, // 'RF_Loans'
        ProfileField.GRANT,    // 'Grant'
        'loans', 'payments', 'history', 'bank_accounts', 'documents', 'attachments'
      ]
      const subcollections = []
      
      for (const subcollectionName of commonSubcollections) {
        try {
          const q = query(collection(this.db, collectionName, documentId, subcollectionName), limit(1))
          const snapshot = await getDocs(q)
          if (!snapshot.empty) {
            // Get actual count
            const countQuery = query(collection(this.db, collectionName, documentId, subcollectionName))
            const countSnapshot = await getDocs(countQuery)
            
            subcollections.push({
              id: subcollectionName,
              name: subcollectionName,
              type: 'subcollection',
              path: `${documentPath}/${subcollectionName}`,
              documentCount: countSnapshot.size
            })
          }
        } catch (error) {
          // Subcollection doesn't exist or not accessible
        }
      }
      
      console.log('DatabaseExplorerService: Found subcollections:', subcollections)
      return subcollections
    } catch (error) {
      console.error('DatabaseExplorerService: Error fetching subcollections:', error)
      throw error
    }
  }

  // Get a specific document by path
  async getDocumentByPath(documentPath) {
    try {
      console.log('DatabaseExplorerService: Fetching document at path:', documentPath)
      
      const pathParts = documentPath.split('/')
      if (pathParts.length < 2) {
        throw new Error('Invalid document path')
      }
      
      let docRef
      
      if (pathParts.length === 2) {
        // Root collection document: collection/document
        const collectionName = pathParts[0]
        const documentId = pathParts[1]
        docRef = doc(this.db, collectionName, documentId)
      } else if (pathParts.length === 4) {
        // Subcollection document: collection/document/subcollection/subdocument
        const collectionName = pathParts[0]
        const documentId = pathParts[1]
        const subcollectionName = pathParts[2]
        const subdocumentId = pathParts[3]
        docRef = doc(this.db, collectionName, documentId, subcollectionName, subdocumentId)
      } else {
        throw new Error(`Unsupported document path format: ${documentPath}`)
      }
      
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          name: docSnap.id,
          type: 'document',
          path: documentPath,
          data: docSnap.data(),
          exists: true
        }
      } else {
        return {
          id: pathParts[pathParts.length - 1],
          name: pathParts[pathParts.length - 1],
          type: 'document',
          path: documentPath,
          data: null,
          exists: false
        }
      }
    } catch (error) {
      console.error('DatabaseExplorerService: Error fetching document:', error)
      throw error
    }
  }

  // Explore a path and return all items (collections, documents, subcollections)
  async explorePath(path = '') {
    try {
      console.log('DatabaseExplorerService: Exploring path:', path)
      
      if (!path) {
        // Root level - return collections
        return await this.getRootCollections()
      }
      
      const pathParts = path.split('/')
      
      if (pathParts.length === 1) {
        // Collection level - return documents only
        const [collectionName] = pathParts
        
        const documents = await this.getCollectionDocuments(collectionName)
        
        return documents
      } else if (pathParts.length === 2) {
        // Document level - return subcollections
        return await this.getDocumentSubcollections(path)
      } else if (pathParts.length === 3) {
        // Subcollection level - return documents
        const [collectionName, documentId, subcollectionName] = pathParts
        return await this.getCollectionDocuments(`${collectionName}/${documentId}/${subcollectionName}`)
      }
      
      return []
    } catch (error) {
      console.error('DatabaseExplorerService: Error exploring path:', error)
      throw error
    }
  }

  // CRUD Operations

  // Create a new document
  async createDocument(collectionPath, data) {
    try {
      console.log('DatabaseExplorerService: Creating document in:', collectionPath)
      
      const docRef = await addDoc(collection(this.db, collectionPath), {
        ...data,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      })
      
      console.log('DatabaseExplorerService: Document created with ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('DatabaseExplorerService: Error creating document:', error)
      throw error
    }
  }

  // Update a document
  async updateDocument(documentPath, data) {
    try {
      console.log('DatabaseExplorerService: Updating document:', documentPath)
      
      const pathParts = documentPath.split('/')
      if (pathParts.length < 2) {
        throw new Error('Invalid document path')
      }
      
      let docRef
      
      if (pathParts.length === 2) {
        // Root collection document: collection/document
        const collectionName = pathParts[0]
        const documentId = pathParts[1]
        docRef = doc(this.db, collectionName, documentId)
      } else if (pathParts.length === 4) {
        // Subcollection document: collection/document/subcollection/subdocument
        const collectionName = pathParts[0]
        const documentId = pathParts[1]
        const subcollectionName = pathParts[2]
        const subdocumentId = pathParts[3]
        docRef = doc(this.db, collectionName, documentId, subcollectionName, subdocumentId)
      } else {
        throw new Error(`Unsupported document path format: ${documentPath}`)
      }
      
      await updateDoc(docRef, {
        ...data,
        lastUpdated: serverTimestamp()
      })
      
      console.log('DatabaseExplorerService: Document updated successfully')
      return true
    } catch (error) {
      console.error('DatabaseExplorerService: Error updating document:', error)
      throw error
    }
  }

  // Delete a document
  async deleteDocument(documentPath) {
    try {
      console.log('DatabaseExplorerService: Deleting document:', documentPath)
      
      const pathParts = documentPath.split('/')
      if (pathParts.length < 2) {
        throw new Error('Invalid document path')
      }
      
      const collectionName = pathParts[0]
      const documentId = pathParts[1]
      
      const docRef = doc(this.db, collectionName, documentId)
      await deleteDoc(docRef)
      
      console.log('DatabaseExplorerService: Document deleted successfully')
      return true
    } catch (error) {
      console.error('DatabaseExplorerService: Error deleting document:', error)
      throw error
    }
  }

  // Get ARMS and status data from config collection
  async getConfigData() {
    try {
      console.log('DatabaseExplorerService: Fetching config data')
      
      // Fetch district mappings
      const districtConfigRef = doc(this.db, 'config', 'districtMappings')
      const districtConfigSnap = await getDoc(districtConfigRef)
      
      const configData = {}
      
      if (districtConfigSnap.exists()) {
        configData.districtMapping = districtConfigSnap.data().districtMapping || {}
        console.log('DatabaseExplorerService: District mappings loaded')
      }
      
      // Use ARMS enum values instead of fetching from database
      configData.arms = ARMS_VALUES
      console.log('DatabaseExplorerService: ARMS data loaded from enum:', ARMS_VALUES)
      
      console.log('DatabaseExplorerService: Complete config data loaded:', configData)
      return configData
    } catch (error) {
      console.error('DatabaseExplorerService: Error fetching config data:', error)
      return {}
    }
  }

  // Create a new subcollection document
  async createSubcollectionDocument(documentPath, subcollectionName, data) {
    try {
      console.log('DatabaseExplorerService: Creating subcollection document:', documentPath, subcollectionName)
      
      const pathParts = documentPath.split('/')
      if (pathParts.length < 2) {
        throw new Error('Invalid document path')
      }
      
      const collectionName = pathParts[0]
      const documentId = pathParts[1]
      
      const docRef = await addDoc(collection(this.db, collectionName, documentId, subcollectionName), {
        ...data,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      })
      
      console.log('DatabaseExplorerService: Subcollection document created with ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('DatabaseExplorerService: Error creating subcollection document:', error)
      throw error
    }
  }
}




