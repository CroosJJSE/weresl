import { 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  query,
  limit
} from 'firebase/firestore'
import { db } from '../firebase-config.js'

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
      
      // Try to get documents from common collections to discover them
      const commonCollections = ['profiles', 'SearchElements', 'users', 'settings']
      
      for (const collectionName of commonCollections) {
        try {
          const q = query(collection(this.db, collectionName), limit(1))
          const snapshot = await getDocs(q)
          if (!snapshot.empty) {
            collections.push({
              id: collectionName,
              name: collectionName,
              type: 'collection',
              path: collectionName,
              documentCount: snapshot.size
            })
          }
        } catch (error) {
          console.log(`Collection ${collectionName} not accessible or doesn't exist`)
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
  async getCollectionDocuments(collectionPath, limitCount = 50) {
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
      
      // Try to get subcollections by attempting to access common ones
      const commonSubcollections = ['RF_Loans', 'GRANT', 'loans', 'payments', 'history']
      const subcollections = []
      
      for (const subcollectionName of commonSubcollections) {
        try {
          const q = query(collection(this.db, collectionName, documentId, subcollectionName), limit(1))
          const snapshot = await getDocs(q)
          if (!snapshot.empty) {
            subcollections.push({
              id: subcollectionName,
              name: subcollectionName,
              type: 'subcollection',
              path: `${documentPath}/${subcollectionName}`,
              documentCount: snapshot.size
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
      
      const collectionName = pathParts[0]
      const documentId = pathParts[1]
      
      const docRef = doc(this.db, collectionName, documentId)
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
          id: documentId,
          name: documentId,
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
}




