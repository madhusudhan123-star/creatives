# Backend Setup Guide - Node.js

This is a guide to set up the Node.js backend for your Creative Touch digital marketing website.

## Project Structure

```
creative-backend/
├── models/
│   ├── Blog.js
│   ├── Contact.js
│   ├── Service.js
│   └── Portfolio.js
├── routes/
│   ├── blogs.js
│   ├── contacts.js
│   ├── services.js
│   ├── portfolio.js
│   └── auth.js
├── middleware/
│   └── auth.js
├── controllers/
│   ├── blogController.js
│   ├── contactController.js
│   ├── serviceController.js
│   └── portfolioController.js
├── config/
│   └── database.js
├── .env
├── server.js
├── package.json
└── README.md
```

## Prerequisites

- Node.js (v14+)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation Steps

### 1. Create Backend Project

```bash
mkdir creative-backend
cd creative-backend
npm init -y
```

### 2. Install Dependencies

```bash
npm install express cors dotenv mongoose axios bcryptjs jsonwebtoken
npm install -D nodemon
```

### 3. Create .env File

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/creative-touch
JWT_SECRET=your_jwt_secret_key_here_change_in_production
ADMIN_PASSWORD=admin123
NODE_ENV=development
```

### 4. Create server.js

```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.error('MongoDB connection failed:', err);
  process.exit(1);
});

// Import Routes
const blogRoutes = require('./routes/blogs');
const contactRoutes = require('./routes/contacts');
const serviceRoutes = require('./routes/services');
const portfolioRoutes = require('./routes/portfolio');
const authRoutes = require('./routes/auth');

// Use Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/auth', authRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 5. Create Models

#### Blog Model (models/Blog.js)

```javascript
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: String,
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Blog', blogSchema);
```

#### Contact Model (models/Contact.js)

```javascript
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  company: String,
  subject: String,
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Contact', contactSchema);
```

#### Service Model (models/Service.js)

```javascript
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: [String],
  icon: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Service', serviceSchema);
```

#### Portfolio Model (models/Portfolio.js)

```javascript
const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  results: {
    type: String,
    required: true,
  },
  image: String,
  link: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
```

### 6. Create Sample Routes

#### Blog Routes (routes/blogs.js)

```javascript
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create blog (admin only)
router.post('/', auth, async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    excerpt: req.body.excerpt,
    content: req.body.content,
    image: req.body.image,
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update blog (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (req.body.title) blog.title = req.body.title;
    if (req.body.content) blog.content = req.body.content;
    // Update other fields as needed

    blog.updatedAt = Date.now();
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete blog (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

#### Contact Routes (routes/contacts.js)

```javascript
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// Submit contact form (public)
router.post('/', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    company: req.body.company,
    subject: req.body.subject,
    message: req.body.message,
  });

  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all contacts (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get contact by ID (admin only)
router.get('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete contact (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

#### Auth Routes (routes/auth.js)

```javascript
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Admin Login
router.post('/admin-login', (req, res) => {
  const { password } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, message: 'Login successful' });
});

module.exports = router;
```

### 7. Create Auth Middleware (middleware/auth.js)

```javascript
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.admin;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
```

### 8. Update package.json Scripts

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### 9. Run Backend Server

```bash
npm run dev
```

Server will run on http://localhost:5000

## API Endpoints

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get blog by ID
- `POST /api/blogs` - Create blog (admin)
- `PUT /api/blogs/:id` - Update blog (admin)
- `DELETE /api/blogs/:id` - Delete blog (admin)

### Contacts
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all contacts (admin)
- `GET /api/contacts/:id` - Get contact by ID (admin)
- `DELETE /api/contacts/:id` - Delete contact (admin)

### Services
- `GET /api/services` - Get all services

### Portfolio
- `GET /api/portfolio` - Get all portfolio projects

### Auth
- `POST /api/auth/admin-login` - Admin login

## Frontend Integration

Update `.env` in your React app:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Deployment

### Deploy to Heroku

1. Create Heroku account
2. Install Heroku CLI
3. Run:
   ```bash
   heroku create your-app-name
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_secret
   git push heroku main
   ```

### Deploy to Render

1. Connect GitHub repo to Render
2. Set environment variables
3. Deploy

## MongoDB Setup

### Option 1: Local MongoDB

```bash
# Install MongoDB
# Run MongoDB service
mongod
```

### Option 2: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Add to `.env`:
   ```
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database
   ```

## Security Notes

⚠️ **Important**:
- Change JWT_SECRET in production
- Change ADMIN_PASSWORD in production
- Use environment variables for sensitive data
- Never commit .env file
- Use HTTPS in production
- Implement rate limiting
- Validate all inputs on backend
- Use CORS carefully in production

## Testing API

Use Postman or curl to test endpoints:

```bash
# Get all blogs
curl http://localhost:5000/api/blogs

# Submit contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "message": "Hello"
  }'

# Admin login
curl -X POST http://localhost:5000/api/auth/admin-login \
  -H "Content-Type: application/json" \
  -d '{"password": "admin123"}'
```

---

**Backend Setup Complete!** 🎉

Connect your React frontend to this backend using the API service defined in `src/utils/apiService.js`
