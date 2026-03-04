import React, { useState } from 'react';
import { contactService } from '../utils/apiService';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Try to send to backend
      await contactService.submitContact(formData);
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Error submitting contact:', err);
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Get in touch with our team</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Let's Connect</h2>
            
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-bold text-dark mb-2">Email</h3>
              <p className="text-gray-600">info@creativetouch.com</p>
            </div>

            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-bold text-dark mb-2">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>

            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-bold text-dark mb-2">Address</h3>
              <p className="text-gray-600">
                123 Marketing Street<br />
                New York, NY 10001
              </p>
            </div>

            <div>
              <h3 className="font-bold text-dark mb-2">Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 9AM - 6PM<br />
                Saturday & Sunday: Closed
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="card p-8" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-dark font-bold mb-2" htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-dark font-bold mb-2" htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-dark font-bold mb-2" htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-dark font-bold mb-2" htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-dark font-bold mb-2" htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-dark font-bold mb-2" htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              ></textarea>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {submitted && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full primary-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
