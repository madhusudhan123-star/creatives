# Creative Touch - Digital Marketing Website

A modern, fully-featured digital marketing website built with **React 19**, **Tailwind CSS**, and **Node.js** backend integration.

## 🚀 Features

### Frontend
- ✅ **React 19** - Latest React with modern hooks
- ✅ **Tailwind CSS 3** - Utility-first CSS framework
- ✅ **React Router 6** - Client-side routing
- ✅ **Responsive Design** - Mobile, tablet, desktop optimized
- ✅ **API Integration** - Connected to Node.js backend
- ✅ **Admin Panel** - Manage contact submissions with JWT auth

### Website Pages
- 🏠 **Home** - Hero section with feature cards
- ℹ️ **About** - Company mission, story, and values
- 💼 **Services** - 6 digital marketing services with features
- 🎯 **Portfolio** - Project showcase with results
- 📝 **Blog** - Dynamic blog content from backend
- 📞 **Contact** - Contact form with backend submission
- 🔐 **Admin** - Secure dashboard for contact management

## 📁 Project Structure

```
creative/
├── src/
│   ├── components/           # Reusable components
│   │   ├── Navbar.js        # Navigation with Tailwind
│   │   └── Footer.js        # Footer section
│   ├── pages/               # Page components
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Services.js
│   │   ├── Portfolio.js
│   │   ├── Blogs.js         # Fetches from backend
│   │   └── Contact.js       # Submits to backend
│   ├── admin/
│   │   └── AdminPanel.js    # Admin dashboard
│   ├── utils/
│   │   ├── apiService.js    # ⭐ ALL BACKEND API CALLS
│   │   └── contactStorage.js
│   ├── styles/              # Tailwind global styles
│   ├── App.js               # Main routing component
│   └── index.js
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS setup
├── .env                     # API URL config
├── package.json
├── WEBSITE_STRUCTURE.md
├── CUSTOMIZATION_GUIDE.md
├── BACKEND_SETUP.md         # ⭐ Node.js backend guide
└── TAILWIND_BACKEND_GUIDE.md # ⭐ Integration guide
```

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.4
- **React Router DOM** 6.0
- **Tailwind CSS** 3.3
- **Axios** - HTTP client
- **PostCSS** & **Autoprefixer**

### Backend (Recommended Setup)
- **Node.js** + **Express.js**
- **MongoDB** (Atlas or local)
- **JWT Authentication**
- **Mongoose** (MongoDB ODM)

## 📦 Installation

### Prerequisites
- Node.js v14 or higher
- npm or yarn

### Setup Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env` file in project root:**
```env
REACT_APP_API_URL=http://localhost:5000/api
NODE_ENV=development
```

3. **Start development server:**
```bash
npm start
```

4. **Open in browser:**
```
http://localhost:3000
```

## 🎨 Tailwind CSS Setup

### Custom Colors (tailwind.config.js)
- **Primary**: `#667eea` (Purple)
- **Secondary**: `#764ba2` (Dark Purple)
- **Dark**: `#2c3e50`
- **Light**: `#f5f5f5`

### Custom Components (src/index.css)
```css
.cta-button      // Call-to-action button
.primary-button  // Primary action button
.card           // Card container
.page-header    // Page header styling
```

### Responsive Breakpoints
```
sm:  640px   | md:  768px   | lg:  1024px | xl:  1280px
```

Example:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

## 🔌 Backend API Integration

### API Service (`src/utils/apiService.js`)

This file contains ALL backend API calls:

```javascript
// 📚 BLOGS
blogService.getAllBlogs()        // Get all blogs
blogService.getBlogById(id)      // Get single blog
blogService.createBlog(data)     // Create (admin)

// 💬 CONTACTS
contactService.submitContact(data)      // Submit form
contactService.getAllContacts(token)    // Get all (admin)
contactService.deleteContact(id, token) // Delete (admin)

// 💼 SERVICES
serviceService.getAllServices()  // Get all services

// 🎯 PORTFOLIO
portfolioService.getAllProjects() // Get projects

// 🔐 AUTH
authService.adminLogin(password)
authService.getToken()
authService.isAuthenticated()
```

### Environment Configuration

**`.env` file (in frontend root):**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Change this to your backend URL:**
- **Local**: `http://localhost:5000/api`
- **Production**: `https://your-backend-url.com/api`

### How Blog Data Flows

1. **Component loads** (`src/pages/Blogs.js`)
2. **Calls API**: `blogService.getAllBlogs()`
3. **Request sent** to backend `/api/blogs`
4. **Backend queries** MongoDB
5. **Returns JSON** array
6. **Component renders** with Tailwind classes

```javascript
useEffect(() => {
  const data = await blogService.getAllBlogs();
  setBlogs(data);
}, []);
```

## 🔐 Admin Panel

**URL**: `/admin`

**Login Password**: `admin123` (⚠️ change in production)

### Admin Features
- ✅ View all contact submissions
- ✅ See detailed contact information
- ✅ Delete individual contacts
- ✅ Statistics dashboard
- ✅ Responsive table view
- ✅ JWT token-based authentication

## 📝 Available Scripts

```bash
npm start           # Development server (port 3000)
npm run build       # Production build
npm test            # Run tests
npm run eject       # Eject config (⚠️ irreversible)
```

## 🎯 Customization

### Change Theme Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
}
```

### Update Company Information

- **Company Name**: [src/components/Navbar.js](src/components/Navbar.js)
- **Contact Details**: [src/pages/Contact.js](src/pages/Contact.js), [src/components/Footer.js](src/components/Footer.js)
- **Services**: [src/pages/Services.js](src/pages/Services.js)
- **Portfolio**: [src/pages/Portfolio.js](src/pages/Portfolio.js)
- **About**: [src/pages/About.js](src/pages/About.js)

### Add New Pages

1. Create file: `src/pages/YourPage.js`
2. Add route in `App.js`
3. Add link in `Navbar.js`
4. Use Tailwind classes for styling

## 🚀 Deployment

### Frontend

**Netlify:**
```bash
npm run build
# Drag 'build' folder to Netlify
```

**Vercel:**
```bash
npm install -g vercel
vercel
```

**⚠️ Update `.env` with production backend URL before deploying**

### Backend

See **[BACKEND_SETUP.md](BACKEND_SETUP.md)** for:
- Node.js server setup
- MongoDB configuration
- Heroku/Render deployment
- API endpoints

## 📚 Complete Documentation

| Document | Purpose |
|----------|---------|
| **[WEBSITE_STRUCTURE.md](WEBSITE_STRUCTURE.md)** | Complete project structure overview |
| **[CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)** | How to customize everything |
| **[BACKEND_SETUP.md](BACKEND_SETUP.md)** | Node.js backend setup guide |
| **[TAILWIND_BACKEND_GUIDE.md](TAILWIND_BACKEND_GUIDE.md)** | Tailwind CSS & API integration |

## 🔒 Security Checklist

⚠️ **Before Production:**

- [ ] Change admin password from `admin123`
- [ ] Update JWT secret in backend
- [ ] Set up HTTPS for backend
- [ ] Enable CORS properly
- [ ] Validate inputs on backend
- [ ] Implement rate limiting
- [ ] Use environment variables
- [ ] Hide sensitive data
- [ ] Test all authentication flows

## 🐛 Troubleshooting

### Styles Not Applying?
1. Check `tailwind.config.js` content paths
2. Restart dev server: `Ctrl+C` then `npm start`
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check terminal for build errors

### API Not Working?
1. Verify backend is running on port 5000
2. Check `.env` for correct `REACT_APP_API_URL`
3. Check browser console in DevTools
4. Check network tab for request/response

### Blog Not Loading?
1. Backend API must be running
2. Verify MongoDB connection
3. Check browser console for errors
4. Test API endpoint in Postman

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS, Android)

## 🎉 Quick Start Checklist

1. ✅ Install: `npm install`
2. ✅ Configure: Update `.env`
3. ✅ Start: `npm start`
4. ✅ Customize: Update company info
5. ✅ Backend: Follow [BACKEND_SETUP.md](BACKEND_SETUP.md)
6. ✅ Content: Add blogs in admin or backend
7. ✅ Test: Test contact form
8. ✅ Deploy: Build and deploy both frontend & backend

## 📄 License

© 2026 Creative Touch. All rights reserved.

---

## 🤝 Support

For help, check the documentation:
- **Backend Questions**: See [BACKEND_SETUP.md](BACKEND_SETUP.md)
- **Customization**: See [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)
- **Integration**: See [TAILWIND_BACKEND_GUIDE.md](TAILWIND_BACKEND_GUIDE.md)

**Last Updated**: March 4, 2026 | Tailwind CSS + Node.js Backend Integration
