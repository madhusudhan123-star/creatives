# Creative Touch - Digital Marketing Website

A modern, fully-featured digital marketing website built with React and React Router.

## Project Structure

```
src/
├── components/              # Reusable components
│   ├── Navbar.js           # Navigation bar
│   └── Footer.js           # Footer component
├── pages/                  # Page components
│   ├── Home.js            # Homepage with hero and features
│   ├── About.js           # About company page
│   ├── Services.js        # Services offered
│   ├── Portfolio.js       # Project showcase
│   ├── Blogs.js           # Blog articles
│   └── Contact.js         # Contact form
├── admin/                 # Admin panel
│   └── AdminPanel.js      # Admin dashboard with contact management
├── utils/                 # Utility functions
│   └── contactStorage.js  # Contact data management (localStorage)
├── styles/                # CSS stylesheets
│   ├── Navbar.css
│   ├── Footer.css
│   ├── pages.css
│   └── admin.css
├── App.js                 # Main app with routing
├── App.css                # App styles
└── index.js               # Entry point
```

## Features

### 🌐 Website Pages

1. **Home** - Hero section with featured services and CTA buttons
2. **About** - Company mission, values, and team information
3. **Services** - 6 main digital marketing services with features list
4. **Portfolio** - Showcase of completed projects with results
5. **Blogs** - Blog articles on digital marketing topics
6. **Contact** - Contact form with validation and submission

### 👨‍💼 Admin Panel

- **Secured Admin Access** - Password-protected dashboard
- **Default Password**: `admin123` (change in production)
- **Features**:
  - View all contact submissions
  - See detailed contact information
  - Delete spamcontacts
  - Statistics dashboard (total contacts, new today)
  - Responsive table view

### 💾 Data Storage

The website uses localStorage for demo purposes:
- Contact submissions are stored locally
- No backend server required for testing
- For production, replace with backend API calls

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd creative
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

```bash
# Start development server
npm start

# Build for production
npm build

# Execute tests
npm test

# Eject configuration (⚠️ irreversible)
npm eject
```

## Admin Panel Access

1. Navigate to `/admin` route
2. Enter password: `admin123`
3. View and manage contact submissions

## Customization

### Colors
The primary color scheme uses:
- **Primary**: `#667eea` (Purple)
- **Secondary**: `#764ba2` (Dark Purple)
- **Dark**: `#2c3e50`
- **Light**: `#f5f5f5`

Modify in CSS files to change the color scheme.

### Company Information
Update the following in respective files:
- Company name in [Navbar.js](src/components/Navbar.js)
- Contact details in [Footer.js](src/components/Footer.js) and [Contact.js](src/pages/Contact.js)
- Services info in [Services.js](src/pages/Services.js)
- Portfolio projects in [Portfolio.js](src/pages/Portfolio.js)
- Blog posts in [Blogs.js](src/pages/Blogs.js)
- Team info in [About.js](src/pages/About.js)

## Technologies Used

- **React** v19.2.4 - UI library
- **React Router DOM** v6 - Client-side routing
- **CSS3** - Styling and animations
- **localStorage API** - Data persistence

## API Integration (Production)

To integrate with a backend:

1. Replace localStorage calls in [contactStorage.js](src/utils/contactStorage.js) with API calls:

```javascript
// Example: Replace saveContact function
export const saveContact = async (contactData) => {
  const response = await fetch('/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData)
  });
  return response.json();
};
```

2. Update admin authentication in [AdminPanel.js](src/admin/AdminPanel.js) to use JWT tokens

## Production Build

```bash
npm run build
```

The build creates an optimized production build in the `build/` folder.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Notes

⚠️ **Important for Production**:
- Change admin password from `admin123` to a secure password
- Implement proper backend authentication
- Use HTTPS for all connections
- Validate all form inputs on the backend
- Store sensitive data securely

## File Size & Performance

The website is optimized with:
- CSS Grid and Flexbox for responsive layouts
- Smooth animations and transitions
- Optimized images and assets
- Clean, maintainable code structure

## License

© 2026 Creative Touch. All rights reserved.

## Support

For questions or issues, contact: info@creativetouch.com

---

**Last Updated**: March 4, 2026
