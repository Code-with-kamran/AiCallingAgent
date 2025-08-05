import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Pause, Play } from 'lucide-react';

// The main InboundManagementlication component for managing inbound call flows.
const InboundManagement = () => {
  /* ---------------- flows ---------------- */
  // State to store the list of inbound call flows.
  const [flows, setFlows] = useState([
    { id: 1, name: 'Support IVR', steps: 3, status: 'Active', greeting: 'Thank you for calling support...' },
    { id: 2, name: 'Sales IVR', steps: 2, status: 'Paused', greeting: 'Welcome to our sales line...' },
  ]);

  /* ---------------- modal helpers ---------------- */
  // Manages the state of the modal: its type (create, edit, delete) and the associated flow object.
  const [modal, setModal] = useState({ type: null, flow: null });

  // State to manage the form data for adding or editing a flow.
  const [formData, setFormData] = useState({ name: '', greeting: '' });

  /**
   * Opens the modal for creating a new flow.
   */
  const openCreate = () => {
    setModal({ type: 'create', flow: null });
    setFormData({ name: '', greeting: '' });
  };

  /**
   * Opens the modal for editing an existing flow.
   * @param {object} flow The flow object to be edited.
   */
  const openEdit = (flow) => {
    setModal({ type: 'edit', flow });
    setFormData({ name: flow.name, greeting: flow.greeting });
  };
  
  /**
   * Opens the modal for deleting a flow.
   * @param {object} flow The flow object to be deleted.
   */
  const openDelete = (flow) => setModal({ type: 'delete', flow });

  /**
   * Closes the modal and resets the form and modal state.
   */
  const closeModal = () => setModal({ type: null, flow: null });

  /* ---------------- actions ---------------- */
  /**
   * Returns Tailwind classes for status badges.
   * @param {string} s The status string ('Active', 'Paused').
   * @returns {string} Tailwind CSS class string.
   */
  const badge = (s) => (s === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800');

  /**
   * Toggles the status of a flow between 'Active' and 'Paused'.
   * @param {number} id The ID of the flow to toggle.
   */
  const toggleStatus = (id) =>
    setFlows((f) =>
      f.map((i) => (i.id === id ? { ...i, status: i.status === 'Active' ? 'Paused' : 'Active' } : i))
    );
  
  /**
   * Deletes a flow from the state.
   */
  const deleteFlow = () => {
    setFlows((f) => f.filter((i) => i.id !== modal.flow.id));
    closeModal();
  };

  /**
   * Handles the form submission for creating or editing a flow.
   * @param {object} e The form event object.
   */
  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (modal.type === 'create') {
      // Create new flow logic
      setFlows((f) => [
        ...f,
        { id: Date.now(), name: formData.name, steps: 0, status: 'Active', greeting: formData.greeting },
      ]);
    } else if (modal.type === 'edit') {
      // Edit existing flow logic
      setFlows((f) =>
        f.map((i) => (i.id === modal.flow.id ? { ...i, ...formData } : i))
      );
    }
    closeModal();
  };

  /* ---------------- render ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-sans antialiased">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Inbound Calls (IVR)</h1>
        <button
          onClick={openCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Create Call Flow</span>
        </button>
      </div>

      {/* Flows table */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden animate-fade-in-down">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-medium text-gray-600">Flow Name</th>
              <th className="p-4 font-medium text-gray-600">Steps</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
              <th className="p-4 font-medium text-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flows.map((f) => (
              <tr key={f.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-900">{f.name}</td>
                <td className="p-4 text-gray-600">{f.steps}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${badge(f.status)}`}>
                    {f.status}
                  </span>
                </td>
                <td className="py-4 flex gap-2 justify-center">
                  <button
                    onClick={() => openEdit(f)}
                    className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => toggleStatus(f.id)}
                    className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    {f.status === 'Active' ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button
                    onClick={() => openDelete(f)}
                    className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Create/Edit */}
      {(modal.type === 'create' || modal.type === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4 animate-scale-in">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {modal.type === 'create' ? 'Create Call Flow' : 'Edit Call Flow'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Flow Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Support IVR"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Greeting Message</label>
                <textarea
                  rows={3}
                  value={formData.greeting}
                  onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Thank you for calling..."
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {modal.type === 'create' ? 'Create' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {modal.type === 'delete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 m-4 animate-scale-in">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Delete Call Flow</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete “<span className="font-semibold">{modal.flow?.name}</span>”?
            </p>
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                Cancel
              </button>
              <button type="button" onClick={deleteFlow} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InboundManagement;
