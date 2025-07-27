import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', phone: '555-1234' },
    { id: 2, name: 'Bob Jones', email: 'bob@example.com', phone: '555-5678' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentContact, setCurrentContact] = useState({ id: null, name: '', email: '', phone: '' });

  // Open Create Modal
  const openCreateModal = () => {
    setIsEditMode(false);
    setCurrentContact({ id: null, name: '', email: '', phone: '' });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (contact) => {
    setIsEditMode(true);
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({ id: null, name: '', email: '', phone: '' });
  };

  // Create Contact
  const handleCreateContact = () => {
    if (!currentContact.name || !currentContact.email) {
      alert('Name and Email are required');
      return;
    }
    setContacts([...contacts, { id: Date.now(), ...currentContact }]);
    closeModal();
  };

  // Edit Contact
  const handleEditContact = () => {
    if (!currentContact.name || !currentContact.email) {
      alert('Name and Email are required');
      return;
    }
    setContacts(contacts.map(c => c.id === currentContact.id ? currentContact : c));
    closeModal();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Contacts</h1>
        <Button size="md" onClick={openCreateModal}>+ Add Contact</Button>
      </div>

      {/* Table */}
      <Card className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Phone</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id} className="border-t">
                <td className="p-4">{contact.name}</td>
                <td className="p-4">{contact.email}</td>
                <td className="p-4">{contact.phone}</td>
                <td className="p-4">
                  <Button variant="ghost" size="sm" onClick={() => openEditModal(contact)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Create/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={isEditMode ? 'Edit Contact' : 'Add New Contact'}>
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={currentContact.name}
              onChange={(e) => setCurrentContact({ ...currentContact, name: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={currentContact.email}
              onChange={(e) => setCurrentContact({ ...currentContact, email: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter email address"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Phone</label>
            <input
              type="text"
              value={currentContact.phone}
              onChange={(e) => setCurrentContact({ ...currentContact, phone: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter phone number"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
            {isEditMode ? (
              <Button onClick={handleEditContact}>Update Contact</Button>
            ) : (
              <Button onClick={handleCreateContact}>Add Contact</Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ContactsPage;
