import React, { useState } from 'react';
import { UserPlus, Pencil, Trash2 } from 'lucide-react';

// The main ContactsPagelication component for managing contacts.
const ContactsPage = () => {
  // State to store the list of contacts.
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', phone: '555-1234', avatar: 'AS' },
    { id: 2, name: 'Bob Jones', email: 'bob@example.com', phone: '555-5678', avatar: 'BJ' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-9876', avatar: 'CB' },
  ]);

  // State to control the visibility of the add/edit contact dialog.
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // State to hold the contact being edited. If null, we're adding a new contact.
  const [editingContact, setEditingContact] = useState(null);
  // State to manage the form data for adding or editing a contact.
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  /**
   * Opens the dialog for adding a new contact.
   */
  const handleOpenAddDialog = () => {
    setEditingContact(null); // Clear editing state for a new contact.
    setFormData({ name: '', email: '', phone: '' }); // Clear form data.
    setIsDialogOpen(true);
  };

  /**
   * Opens the dialog for editing an existing contact.
   * @param {object} contact The contact object to be edited.
   */
  const handleOpenEditDialog = (contact) => {
    setEditingContact(contact); // Set the editing contact.
    setFormData(contact); // Populate the form with the contact's data.
    setIsDialogOpen(true);
  };

  /**
   * Closes the dialog and resets the form and editing state.
   */
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingContact(null);
    setFormData({ name: '', email: '', phone: '' });
  };

  /**
   * Handles saving a new contact or updating an existing one.
   */
  const handleSave = () => {
    // Validate form data.
    if (!formData.name.trim() || !formData.email.trim()) {
      // In a real ContactsPage, you would show an error message here.
      console.error('Name and Email are required.');
      return;
    }

    if (editingContact) {
      // Logic for updating an existing contact.
      const updatedContacts = contacts.map((c) =>
        c.id === editingContact.id ? { ...c, ...formData } : c
      );
      setContacts(updatedContacts);
    } else {
      // Logic for adding a new contact.
      const newContact = {
        ...formData,
        id: Date.now(),
        avatar: formData.name.slice(0, 2).toUpperCase(),
      };
      setContacts([...contacts, newContact]);
    }
    
    handleCloseDialog();
  };

  /**
   * Handles deleting a contact.
   * @param {number} id The ID of the contact to delete.
   */
  const handleDelete = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-warm-gray  sm:p-10 font-body antialiased">
      {/* Header section with title and add button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600">Contacts</h1>
        <button
          onClick={handleOpenAddDialog}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <UserPlus size={20} />
          <span className="hidden sm:inline">Add Contact</span>
        </button>
      </div>

      {/* Contacts table */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden animate-fade-in-down">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-blue-50 text-blue-800 text-sm sm:text-base">
              <th className="px-4 sm:px-6 py-4 text-left font-semibold">Avatar</th>
              <th className="px-4 sm:px-6 py-4 text-left font-semibold">Name</th>
              <th className="px-4 sm:px-6 py-4 text-left font-semibold hidden sm:table-cell">Email</th>
              <th className="px-4 sm:px-6 py-4 text-left font-semibold hidden lg:table-cell">Phone</th>
              <th className="px-4 sm:px-6 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {contact.avatar}
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">{contact.name}</td>
                <td className="px-4 sm:px-6 py-4 text-gray-600 hidden sm:table-cell">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {contact.email}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 text-gray-600 hidden lg:table-cell">{contact.phone}</td>
                <td className="px-4 sm:px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleOpenEditDialog(contact)}
                      className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Contact Dialog (Modal) */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4 animate-scale-in">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingContact ? 'Edit Contact' : 'Add New Contact'}
              </h2>
              <button onClick={handleCloseDialog} className="text-gray-500 hover:text-gray-800 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingContact ? 'Save Changes' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
