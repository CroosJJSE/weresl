# Dev Data Dashboard - Dynamic Database Explorer

A clean, focused dashboard for dynamically exploring Firebase Firestore database structures without hardcoded schemas.

## Features

- **Dynamic Database Exploration**: Automatically discovers and displays collections, documents, and subcollections
- **Infinite Drill-Down**: Navigate through nested database structures recursively
- **Real-Time Discovery**: Fetches data dynamically based on what exists in the database at runtime
- **Clean UI**: Simple, intuitive interface for database navigation
- **No Hardcoded Schemas**: Works with any Firebase database structure

## How It Works

The dashboard dynamically explores your Firebase database by:

1. **Root Level**: Shows all accessible collections
2. **Collection Level**: Displays documents and subcollections within a collection
3. **Document Level**: Shows subcollections attached to a document
4. **Subcollection Level**: Lists documents within a subcollection

## Project Structure

```
src/
├── components/
│   └── DatabaseExplorer.vue      # Main database exploration component
├── pages/
│   └── Dashboard.vue             # Dashboard page
├── services/
│   └── databaseExplorerService.js # Database exploration logic
├── firebase-config.js            # Firebase configuration
├── App.vue                       # Main app component
└── main.js                       # App entry point
```

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Firebase Configuration**:
   - Ensure `src/firebase-config.js` is properly configured
   - The app will automatically connect to your Firebase project

3. **Development**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Usage

1. **Start at Root**: The app automatically loads root-level collections
2. **Click Collections**: Navigate into collections to see documents and subcollections
3. **Click Documents**: View document data in a modal
4. **Click Subcollections**: Drill down into nested data structures
5. **Breadcrumb Navigation**: Use the breadcrumb trail to navigate back up the hierarchy

## Technical Details

- **Vue 3 Composition API**: Modern Vue.js with `<script setup>` syntax
- **Firebase Firestore**: Direct database access without hardcoded schemas
- **Tailwind CSS**: Clean, responsive UI components
- **Dynamic Path Resolution**: Automatically determines database structure at runtime

## Key Benefits

- **Schema Agnostic**: Works with any Firebase database structure
- **Maintainable**: Clean, focused codebase without unnecessary complexity
- **Extensible**: Easy to add features like editing, deletion, or data manipulation
- **Performance**: Efficient data fetching with proper loading states

## Future Enhancements

The modular architecture makes it easy to add:
- Document editing capabilities
- Data export functionality
- Advanced search and filtering
- Bulk operations
- Real-time updates

## Deployment

```bash
# Build the project
npm run build

# Deploy to Firebase Hosting (if configured)
firebase deploy
```

## Notes

- This dashboard is designed for internal development and debugging use
- It provides read-only access to database structures
- All database operations are performed dynamically without assuming fixed schemas
- The interface automatically adapts to whatever database structure is discovered 