// Backend API Service
import axios from 'axios';

// Base URL for your Node.js backend
// Update this with your actual backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== BLOGS ====================
export const blogService = {
  // Get all blogs
  getAllBlogs: async () => {
    try {
      const response = await apiClient.get('/blogs');
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },

  // Get single blog by ID
  getBlogById: async (id) => {
    try {
      const response = await apiClient.get(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog:', error);
      throw error;
    }
  },

  // Create blog (admin only)
  createBlog: async (blogData) => {
    try {
      const response = await apiClient.post('/blogs', blogData);
      return response.data;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  // Update blog (admin only)
  updateBlog: async (id, blogData) => {
    try {
      const response = await apiClient.put(`/blogs/${id}`, blogData);
      return response.data;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  // Delete blog (admin only)
  deleteBlog: async (id) => {
    try {
      const response = await apiClient.delete(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  },
};

// ==================== CONTACTS ====================
export const contactService = {
  // Submit contact form
  submitContact: async (contactData) => {
    try {
      const response = await apiClient.post('/contacts', contactData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact:', error);
      throw error;
    }
  },

  // Get all contacts (admin only)
  getAllContacts: async (token) => {
    try {
      const response = await apiClient.get('/contacts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  // Get contact by ID (admin only)
  getContactById: async (id, token) => {
    try {
      const response = await apiClient.get(`/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching contact:', error);
      throw error;
    }
  },

  // Delete contact (admin only)
  deleteContact: async (id, token) => {
    try {
      const response = await apiClient.delete(`/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  },
};

// ==================== SERVICES ====================
export const serviceService = {
  // Get all services
  getAllServices: async () => {
    try {
      const response = await apiClient.get('/services');
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Get service by ID
  getServiceById: async (id) => {
    try {
      const response = await apiClient.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service:', error);
      throw error;
    }
  },
};

// ==================== PORTFOLIO ====================
export const portfolioService = {
  // Get all portfolio projects
  getAllProjects: async () => {
    try {
      const response = await apiClient.get('/portfolio');
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      throw error;
    }
  },

  // Get project by ID
  getProjectById: async (id) => {
    try {
      const response = await apiClient.get(`/portfolio/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },
};

// ==================== ADMIN AUTHENTICATION ====================
export const authService = {
  // Admin login
  adminLogin: async (password) => {
    try {
      const response = await apiClient.post('/auth/admin-login', {
        password,
      });
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Admin logout
  adminLogout: () => {
    localStorage.removeItem('adminToken');
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem('adminToken');
  },

  // Check if admin is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('adminToken');
  },
};

export default apiClient;
