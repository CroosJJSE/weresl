# WERESL Top View

A central hub webapp that displays all WERESL project links with password protection and feedback functionality.

## Features

### 🔗 Link Management
- **Dynamic Links**: Loads links from Firestore `topview-links` collection
- **Secure Links**: Password-protected links with modal authentication
- **Button Links**: Special styling for button-type links
- **Copy Functionality**: One-click link copying to clipboard

### 🔒 Security Features
- **Password Protection**: Secure links require password authentication
- **Dummy Password**: Currently set to "weresl123" (can be updated)
- **Modal Interface**: Clean password entry modal

### 💬 Feedback System
- **Developer Feedback**: Users can send feedback directly to developers
- **Structured Data**: Stores feedback in `webapp-feedback` collection
- **Rich Information**: Includes user agent, timestamp, and contact details

### 🎨 Modern UI
- **Responsive Design**: Works on all device sizes
- **Gradient Background**: Beautiful gradient background
- **Card Layout**: Clean card-based link display
- **Hover Effects**: Smooth animations and transitions

## Database Structure

### `topview-links` Collection
Each document represents a link with the following fields:
```javascript
{
  title: "Link Title",
  description: "Link description",
  url: "https://example.com",
  secure: true/false,  // Requires password
  button: true/false   // Special button styling
}
```

### `webapp-feedback` Collection
Each document represents user feedback:
```javascript
{
  name: "User Name",
  email: "user@example.com",
  subject: "Feedback Subject",
  message: "Feedback message",
  date: serverTimestamp(),
  userAgent: "Browser info",
  timestamp: "ISO string"
}
```

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Deploy to Firebase**:
   ```bash
   firebase deploy
   ```

## Configuration

### Firebase Configuration
The app uses the WERESL Firebase project with the following configuration:
- Project ID: `weresldatabase`
- Hosting Site: `top-view-weresl`

### Password Configuration
Currently using dummy password: `weresl123`
To change the password, update the `checkPassword` function in `App.vue`.

## Adding Links

To add new links, create documents in the `topview-links` collection with:
- **Document ID**: Unique identifier (e.g., "loan-init-app", "admin-dashboard")
- **Title**: Display name for the link
- **Description**: Brief description of the application
- **URL**: Full URL to the application
- **Secure**: Boolean for password protection
- **Button**: Boolean for button styling

## Features in Detail

### Link Display
- **Grid Layout**: Responsive grid of link cards
- **Badge System**: Visual indicators for secure and button links
- **Action Buttons**: Visit link and copy link functionality
- **Loading States**: Proper loading and error handling

### Password Protection
- **Modal Interface**: Clean password entry modal
- **Error Handling**: Incorrect password feedback
- **Auto-focus**: Password field automatically focused
- **Enter Key**: Submit with Enter key

### Feedback System
- **Form Validation**: Required field validation
- **Success/Error Messages**: User feedback for actions
- **Data Persistence**: Stores in Firestore with metadata
- **Form Reset**: Clears form after successful submission

## Styling

The app uses a modern design with:
- **Gradient Background**: Purple-blue gradient
- **Card Shadows**: Subtle shadows for depth
- **Hover Effects**: Smooth transitions
- **Responsive Grid**: Adapts to screen size
- **Modern Typography**: Poppins font family

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## Security Notes

- Password is currently hardcoded (should be moved to environment variables)
- Feedback data includes user agent for debugging
- All external links open in new tabs with security attributes

## Future Enhancements

- [ ] Admin panel for link management
- [ ] Dynamic password configuration
- [ ] Link analytics tracking
- [ ] Email notifications for feedback
- [ ] Link categories and filtering
- [ ] Dark mode toggle 