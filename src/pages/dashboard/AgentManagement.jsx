import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Pause, Play, X } from 'lucide-react';

// The main AgentManagementlication component for managing AI agents.
const AgentManagement = () => {
  /* ---------------- agents ---------------- */
  // State to store the list of AI agents.
  const [agents, setAgents] = useState([
    { id: 1, name: 'Sales Bot', voice: 'Female', status: 'Active' },
    { id: 2, name: 'Support Bot', voice: 'Male', status: 'Paused' },
  ]);

  /* ---------------- modal helpers ---------------- */
  // Manages the state of the modal, including its type (create, edit, delete) and the associated agent object.
  const [modal, setModal] = useState({ type: null, agent: null });

  // State to manage the form data for adding or editing an agent.
  const [formData, setFormData] = useState({ name: '', voice: 'Female', status: 'Active' });

  /**
   * Opens the modal for creating a new agent and resets the form data.
   */
  const openCreate = () => {
    setModal({ type: 'create', agent: null });
    setFormData({ name: '', voice: 'Female', status: 'Active' });
  };

  /**
   * Opens the modal for editing an existing agent and populates the form with its data.
   * @param {object} agent The agent object to be edited.
   */
  const openEdit = (agent) => {
    setModal({ type: 'edit', agent });
    setFormData({ name: agent.name, voice: agent.voice, status: agent.status });
  };
  
  /**
   * Opens the modal for deleting an agent.
   * @param {object} agent The agent object to be deleted.
   */
  const openDelete = (agent) => setModal({ type: 'delete', agent });

  /**
   * Closes the modal and resets the form and modal state.
   */
  const closeModal = () => setModal({ type: null, agent: null });

  /* ---------------- actions ---------------- */
  /**
   * Returns Tailwind CSS classes for status badges based on the agent's status.
   * @param {string} status The status of the agent ('Active' or 'Paused').
   * @returns {string} Tailwind CSS class string.
   */
  const badge = (status) =>
    status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

  /**
   * Toggles the status of an agent between 'Active' and 'Paused'.
   * @param {number} id The ID of the agent to toggle.
   */
  const toggleStatus = (id) =>
    setAgents((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === 'Active' ? 'Paused' : 'Active' } : a
      )
    );
  
  /**
   * Deletes an agent from the state.
   */
  const deleteAgent = () => {
    setAgents((prev) => prev.filter((a) => a.id !== modal.agent.id));
    closeModal();
  };

  /**
   * Handles the form submission for creating or editing an agent.
   * @param {object} e The form event object.
   */
  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (modal.type === 'create') {
      // Create new agent logic
      setAgents((prev) => [
        ...prev,
        { id: Date.now(), name: formData.name, voice: formData.voice, status: formData.status },
      ]);
    } else if (modal.type === 'edit') {
      // Edit existing agent logic
      setAgents((prev) =>
        prev.map((a) => (a.id === modal.agent.id ? { ...a, ...formData } : a))
      );
    }
    closeModal();
  };

  /* ---------------- render ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-sans antialiased">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">AI Agents</h1>
        <button
          onClick={openCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Create Agent</span>
        </button>
      </div>

      {/* Agents table */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden animate-fade-in-down">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-medium text-gray-600">Name</th>
              <th className="p-4 font-medium text-gray-600">Voice</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
              <th className="p-4 font-medium text-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-900">{agent.name}</td>
                <td className="p-4 text-gray-600">{agent.voice}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${badge(agent.status)}`}
                  >
                    {agent.status}
                  </span>
                </td>
                <td className="py-4 flex gap-2 justify-center">
                  <button
                    onClick={() => openEdit(agent)}
                    className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => toggleStatus(agent.id)}
                    className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    {agent.status === 'Active' ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button
                    onClick={() => openDelete(agent)}
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
                {modal.type === 'create' ? 'Create Agent' : 'Edit Agent'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Sales Bot"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Voice</label>
                <select
                  value={formData.voice}
                  onChange={(e) => setFormData({ ...formData, voice: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Female</option>
                  <option>Male</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Active</option>
                  <option>Paused</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {modal.type === 'create' ? 'Create Agent' : 'Save Changes'}
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
              <h2 className="text-2xl font-bold text-gray-800">Delete Agent</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 transition-colors">
                <X size={24} />
              </button>
            </div>
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete “<span className="font-semibold">{modal.agent?.name}</span>”?
            </p>
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                Cancel
              </button>
              <button type="button" onClick={deleteAgent} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentManagement;
