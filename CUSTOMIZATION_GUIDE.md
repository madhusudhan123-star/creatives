# Quick Customization Guide

## How to Customize Your Digital Marketing Website

### 1. Update Company Name & Branding

**File**: [src/components/Navbar.js](src/components/Navbar.js)
```javascript
<Link to="/" className="navbar-logo">
  Creative Touch  // ← Change this to your company name
</Link>
```

### 2. Update Contact Information

**Files to update**:
- [src/components/Footer.js](src/components/Footer.js)
- [src/pages/Contact.js](src/pages/Contact.js)

Replace:
- Email: `info@creativetouch.com`
- Phone: `+1 (555) 123-4567`
- Address: `123 Marketing Street, New York, NY 10001`

### 3. Customize Services

**File**: [src/pages/Services.js](src/pages/Services.js)

Add or modify services in the `services` array:

```javascript
const services = [
  {
    id: 1,
    title: 'Your Service Name',
    description: 'Description of what you offer',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4']
  },
  // ... add more services
];
```

### 4. Add Portfolio Projects

**File**: [src/pages/Portfolio.js](src/pages/Portfolio.js)

Modify the `projects` array:

```javascript
const projects = [
  {
    id: 1,
    title: 'Project Name',
    category: 'Service Category',
    description: 'Project description and what was accomplished',
    results: 'Specific results achieved (e.g., 150% increase in revenue)'
  },
  // ... add more projects
];
```

### 5. Update Blog Content

**File**: [src/pages/Blogs.js](src/pages/Blogs.js)

Modify the `blogs` array:

```javascript
const blogs = [
  {
    id: 1,
    title: 'Blog Title',
    author: 'Author Name',
    date: 'March 4, 2026',
    category: 'Category',
    excerpt: 'Short excerpt of the blog post...',
    image: 'SEO' // Change to your category name
  },
  // ... add more blogs
];
```

### 6. Update About Company Info

**File**: [src/pages/About.js](src/pages/About.js)

Update the following sections:
- Company mission statement
- Company story/history
- Core values

### 7. Change Color Scheme

**File**: [src/styles/](src/styles/)

Find and replace color values across all CSS files:
- Change `#667eea` to your primary color
- Change `#764ba2` to your secondary color
- Change `#2c3e50` to your dark color
- Change `#f5f5f5` to your light color

Example:
```css
/* Old */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* New */
background: linear-gradient(135deg, #YOUR_PRIMARY 0%, #YOUR_SECONDARY 100%);
```

### 8. Update Admin Panel

**File**: [src/admin/AdminPanel.js](src/admin/AdminPanel.js)

Change admin password:
```javascript
const ADMIN_PASSWORD = 'admin123'; // ← Change this to a secure password
```

## How to Add More Pages

1. Create a new file in `src/pages/`:
```bash
src/pages/YourPage.js
```

2. Add the component:
```javascript
import React from 'react';
import '../styles/pages.css';

function YourPage() {
  return (
    <div className="page your-page">
      {/* Your content here */}
    </div>
  );
}

export default YourPage;
```

3. Update [src/App.js](src/App.js) to import and add the route:
```javascript
import YourPage from './pages/YourPage';

// In Routes:
<Route path="/your-page" element={<YourPage />} />
```

4. Add link in [src/components/Navbar.js](src/components/Navbar.js):
```javascript
<li className="nav-item">
  <Link to="/your-page" className="nav-links">
    Your Page
  </Link>
</li>
```

## Connecting to a Backend Server

To connect contact forms to your backend:

1. Update [src/utils/contactStorage.js](src/utils/contactStorage.js):

```javascript
export const saveContact = async (contactData) => {
  try {
    const response = await fetch('https://your-api.com/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });
    
    if (!response.ok) throw new Error('Failed to save contact');
    return await response.json();
  } catch (error) {
    console.error('Error saving contact:', error);
    throw error;
  }
};
```

2. Update `getAllContacts` function:

```javascript
export const getAllContacts = async () => {
  try {
    const response = await fetch('https://your-api.com/api/contacts');
    return await response.json();
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    return [];
  }
};
```

## CSS Customization Tips

### Add Custom Fonts
Update [src/index.css](src/index.css):

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}
```

### Adjust Spacing
Modify padding/margin values in CSS files:
- 1rem = 16px
- Increase for more space: 1.5rem, 2rem, 2.5rem, 3rem
- Decrease for less space: 0.5rem, 0.75rem, 1rem

### Change Animations
Update `transition` values (e.g., `0.3s` = 300ms):
- `0.1s` - very quick
- `0.3s` - normal
- `0.5s` - slower
- `1s` - very slow

## Common Issues & Solutions

### Images Not Loading
Replace placeholder divs with actual images:
```javascript
// Before
<div className="portfolio-image">
  {project.category}
</div>

// After
<img src={require(`../images/${project.image}.jpg`)} alt={project.title} />
```

### Form Not Submitting
Check [src/pages/Contact.js](src/pages/Contact.js) validation logic and ensure required fields are filled.

### Admin Panel Not Working
1. Verify correct password
2. Check browser console for errors
3. Ensure localhost storage is enabled

## Performance Optimization

1. **Lazy Load Images**: Install `react-lazy-load-image-component`
2. **Code Splitting**: Use React.lazy() for routes
3. **Minify CSS**: Uncomment production builds

## Testing

Run tests:
```bash
npm test
```

## Deployment

### Deploy to Netlify
```bash
npm run build
# Then drag and drop 'build' folder to Netlify
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages
1. Update package.json: `"homepage": "https://yourusername.github.io/repo"`
2. Run: `npm run build`
3. Push to GitHub

---

## Need Help?

Visit the files mentioned above and look for comments to understand the structure better.

**Happy Customizing! 🎉**
