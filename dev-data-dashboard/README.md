# Dev Data Dashboard

An internal Firebase data management dashboard for developers to view and edit Firestore documents conveniently, especially from mobile devices.

## Features

- 🔍 **Search & Filter**: Search documents by name, NIC, regId, or any other field
- 📱 **Mobile Optimized**: Touch-friendly interface designed for mobile phones and tablets
- 📊 **Responsive Table**: View documents in a clean, responsive table format
- ✏️ **Inline Editing**: Click any document to edit its fields
- 🔄 **Real-time Updates**: See changes immediately after saving
- 📁 **Collection Switching**: Switch between different Firestore collections
- 🎨 **Clean UI**: Minimal, modern interface using Tailwind CSS

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Firestore enabled

### Installation

1. **Navigate to the dashboard directory:**
   ```bash
   cd dev-data-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3001`

### Build for Production

```bash
npm run build
```

## Configuration

The dashboard uses the Firebase configuration from your existing project. The configuration is located in `src/firebase-config.js` and points to the `weresldatabase` project.

### Available Collections

By default, the dashboard is configured to work with these collections:
- `users` (default)
- `loans`
- `payments`
- `profiles`

You can modify the collections list in `src/pages/Dashboard.vue` to match your Firestore collections.

## Usage

### Searching Documents

1. Select a collection from the dropdown
2. Enter search terms in the search bar
3. The dashboard will search across:
   - Name (partial match)
   - NIC
   - Reg ID
   - Any other text fields

### Editing Documents

1. Click on any document row in the table
2. A modal will open with editable fields
3. Make your changes
4. Click "Save Changes" to update the document
5. Success/error messages will be displayed

### Mobile Usage

The dashboard is optimized for mobile devices:
- Touch-friendly buttons and inputs
- Responsive table that scrolls horizontally on small screens
- Large touch targets for easy interaction
- Optimized modal sizing for mobile screens

## Security Notes

⚠️ **Important**: This dashboard is for internal developer use only and does not include authentication. 

- Do not deploy this to a public URL
- Use only on secure, private networks
- Consider adding IP restrictions in Firebase Console
- Monitor Firestore usage to prevent unauthorized access

## Customization

### Adding New Collections

1. Update the `collections` array in `src/pages/Dashboard.vue`
2. The dashboard will automatically detect and display documents from new collections

### Modifying Search Fields

Edit the `searchFields` parameter in `src/services/firestoreService.js` to change which fields are searched:

```javascript
await firestoreService.searchDocuments(collectionName, searchTerm, ['name', 'nic', 'regId', 'email']);
```

### Styling

The dashboard uses Tailwind CSS. You can customize the styling by:
- Modifying `src/style.css` for global styles
- Updating component classes for specific styling
- Changing the color scheme in `tailwind.config.js`

## Troubleshooting

### Common Issues

1. **Firebase Connection Error**
   - Verify your Firebase project is active
   - Check that Firestore is enabled
   - Ensure the configuration in `firebase-config.js` is correct

2. **No Documents Showing**
   - Check that the selected collection exists
   - Verify documents have the expected field names
   - Check browser console for errors

3. **Search Not Working**
   - Ensure documents have the fields you're searching for
   - Check that field names match exactly (case-sensitive)

### Debug Mode

Open browser developer tools to see detailed error messages and network requests.

## Development

### Project Structure

```
dev-data-dashboard/
├── src/
│   ├── components/          # Vue components
│   │   ├── SearchBar.vue   # Search and collection selector
│   │   ├── DataTable.vue   # Document display table
│   │   └── EditModal.vue   # Document editing modal
│   ├── pages/              # Page components
│   │   └── Dashboard.vue   # Main dashboard page
│   ├── services/           # Business logic
│   │   └── firestoreService.js # Firebase operations
│   ├── App.vue             # Root component
│   ├── main.js             # App entry point
│   ├── style.css           # Global styles
│   └── firebase-config.js  # Firebase configuration
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── tailwind.config.js      # Tailwind configuration
```

### Adding Features

The modular structure makes it easy to add new features:

1. **New Components**: Add to `src/components/`
2. **New Pages**: Add to `src/pages/` and update router
3. **New Services**: Add to `src/services/`
4. **New Utilities**: Add to `src/utils/`

## License

MIT License - see LICENSE file for details. 