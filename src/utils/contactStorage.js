// Contact Storage Utility
// Stores contacts in localStorage for demo purposes
// In production, you would send this to a backend server

export const saveContact = (contactData) => {
  try {
    const contacts = getAllContacts();
    const newContact = {
      id: Date.now(),
      ...contactData,
      submittedAt: new Date().toLocaleString()
    };
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.error('Error saving contact:', error);
    throw error;
  }
};

export const getAllContacts = () => {
  try {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    return [];
  }
};

export const deleteContact = (id) => {
  try {
    const contacts = getAllContacts();
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    return true;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};

export const getContact = (id) => {
  try {
    const contacts = getAllContacts();
    return contacts.find(contact => contact.id === id);
  } catch (error) {
    console.error('Error retrieving contact:', error);
    return null;
  }
};

export const clearAllContacts = () => {
  try {
    localStorage.setItem('contacts', JSON.stringify([]));
    return true;
  } catch (error) {
    console.error('Error clearing contacts:', error);
    throw error;
  }
};
