import React, { useState, useEffect } from 'react';
import { contactService, authService } from '../utils/apiService';

function AdminPanel() {
  const [contacts, setContacts] = useState([]);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ADMIN_PASSWORD = 'admin123'; // Change this in production

  useEffect(() => {
    if (isAuthenticated) {
      loadContacts();
    }
  }, [isAuthenticated]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const token = authService.getToken();
      const data = await contactService.getAllContacts(token);
      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error loading contacts:', err);
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAdminPassword('');
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminPassword('');
    setSelectedContact(null);
    authService.adminLogout();
  };

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (contactToDelete) {
      try {
        const token = authService.getToken();
        await contactService.deleteContact(contactToDelete.id, token);
        setContacts(contacts.filter(c => c.id !== contactToDelete.id));
        setShowDeleteConfirm(false);
        setContactToDelete(null);
        setSelectedContact(null);
      } catch (err) {
        console.error('Error deleting contact:', err);
        setError('Error deleting contact');
      }
    }
  };

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
  };

  const handleCloseDetails = () => {
    setSelectedContact(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex justify-center items-center px-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-sm">
          <h1 className="text-3xl font-bold text-center mb-2 text-primary">Admin Panel</h1>
          <p className="text-center text-gray-600 mb-6">Enter your password to access</p>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-dark font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <button type="submit" className="primary-button w-full mb-4">
              Login
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm">
            Demo password: admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-white text-primary px-6 py-2 rounded font-bold hover:bg-gray-100 transition-colors">
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card p-6 border-t-4 border-primary">
            <h3 className="text-gray-600 text-sm uppercase tracking-wide mb-2">Total Contacts</h3>
            <p className="text-4xl font-bold text-primary">{contacts.length}</p>
          </div>
          <div className="card p-6 border-t-4 border-secondary">
            <h3 className="text-gray-600 text-sm uppercase tracking-wide mb-2">New Today</h3>
            <p className="text-4xl font-bold text-secondary">
              {contacts.filter(c => {
                const today = new Date().toDateString();
                return new Date(c.submittedAt || c.createdAt).toDateString() === today;
              }).length}
            </p>
          </div>
        </div>

        {/* Contacts Section */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Contact Messages</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {selectedContact ? (
            <div>
              <button 
                onClick={handleCloseDetails} 
                className="mb-6 text-primary font-bold hover:text-secondary flex items-center"
              >
                ← Back to List
              </button>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-primary mb-6">Contact Details</h3>

                <div className="mb-4 pb-4 border-b border-gray-200">
                  <label className="text-primary font-bold uppercase text-sm">Name</label>
                  <p className="text-gray-700">{selectedContact.name}</p>
                </div>

                <div className="mb-4 pb-4 border-b border-gray-200">
                  <label className="text-primary font-bold uppercase text-sm">Email</label>
                  <p className="text-gray-700">
                    <a href={`mailto:${selectedContact.email}`} className="text-primary hover:text-secondary">
                      {selectedContact.email}
                    </a>
                  </p>
                </div>

                {selectedContact.phone && (
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <label className="text-primary font-bold uppercase text-sm">Phone</label>
                    <p className="text-gray-700">{selectedContact.phone}</p>
                  </div>
                )}

                {selectedContact.company && (
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <label className="text-primary font-bold uppercase text-sm">Company</label>
                    <p className="text-gray-700">{selectedContact.company}</p>
                  </div>
                )}

                {selectedContact.subject && (
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <label className="text-primary font-bold uppercase text-sm">Subject</label>
                    <p className="text-gray-700">{selectedContact.subject}</p>
                  </div>
                )}

                <div className="mb-4 pb-4 border-b border-gray-200">
                  <label className="text-primary font-bold uppercase text-sm">Message</label>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>

                <div className="mb-4">
                  <label className="text-primary font-bold uppercase text-sm">Submitted</label>
                  <p className="text-gray-700">{selectedContact.submittedAt || selectedContact.createdAt}</p>
                </div>

                <button 
                  onClick={() => handleDeleteClick(selectedContact)} 
                  className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition-colors"
                >
                  Delete Contact
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {contacts.length === 0 && !loading ? (
                <p className="text-center text-gray-500 py-8">No contact messages yet.</p>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-100 border-b-2 border-gray-300">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-dark">Name</th>
                      <th className="px-4 py-3 text-left font-bold text-dark">Email</th>
                      <th className="px-4 py-3 text-left font-bold text-dark">Subject</th>
                      <th className="px-4 py-3 text-left font-bold text-dark">Submitted</th>
                      <th className="px-4 py-3 text-left font-bold text-dark">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map(contact => (
                      <tr key={contact.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-700">{contact.name}</td>
                        <td className="px-4 py-3 text-gray-700">{contact.email}</td>
                        <td className="px-4 py-3 text-gray-700">{contact.subject || 'N/A'}</td>
                        <td className="px-4 py-3 text-gray-700 text-sm">{contact.submittedAt || contact.createdAt}</td>
                        <td className="px-4 py-3">
                          <button 
                            onClick={() => handleViewDetails(contact)}
                            className="bg-primary text-white px-3 py-1 rounded text-sm font-bold hover:bg-secondary transition-colors mr-2"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(contact)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold text-primary mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-2">Are you sure you want to delete this contact?</p>
            <p className="font-bold text-dark mb-6">
              {contactToDelete?.name} ({contactToDelete?.email})
            </p>
            <div className="flex gap-3">
              <button 
                onClick={handleConfirmDelete} 
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(false)} 
                className="flex-1 bg-gray-300 text-dark px-4 py-2 rounded font-bold hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
