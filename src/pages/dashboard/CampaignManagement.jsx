import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Pause, Play } from 'lucide-react';

// The main CampaingManagementlication component for managing campaigns.
const CampaignManagement = () => {
  /* ---------------- campaigns ---------------- */
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Sales Outreach', status: 'Running', calls: 150, voice: 'Female', script: 'Hi {{name}}, this is {{agent_name}} calling about our latest sales promotion...' },
    { id: 2, name: 'Follow-up Campaign', status: 'Completed', calls: 80, voice: 'Male', script: 'Hi {{name}}, just following up on our previous conversation...' },
  ]);

  /* ---------------- modal helpers ---------------- */
  // Manages the state of the modal: its type (create, edit, delete) and the associated campaign object.
  const [modal, setModal] = useState({ type: null, campaign: null });

  const openCreate = () => {
    setModal({ type: 'create', campaign: null });
    setFormData({ name: '', voice: 'Female', script: '' });
  };
  const openEdit = (campaign) => {
    setModal({ type: 'edit', campaign });
    setFormData({ name: campaign.name, voice: campaign.voice, script: campaign.script });
  };
  const openDelete = (campaign) => setModal({ type: 'delete', campaign });
  const closeModal = () => setModal({ type: null, campaign: null });

  /* ---------------- form state ---------------- */
  const [formData, setFormData] = useState({ name: '', voice: 'Female', script: '' });

  /* ---------------- actions ---------------- */
  /**
   * Returns Tailwind classes for status badges.
   * @param {string} s The status string ('Running', 'Paused', 'Completed').
   * @returns {string} Tailwind CSS class string.
   */
  const statusBadge = (s) =>
    s === 'Running'
      ? 'bg-green-100 text-green-800'
      : s === 'Paused'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-gray-100 text-gray-800';

  /**
   * Toggles the status of a campaign between 'Running' and 'Paused'.
   * @param {number} id The ID of the campaign to toggle.
   */
  const toggleStatus = (id) =>
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'Running' ? 'Paused' : 'Running' } : c
      )
    );

  /**
   * Deletes a campaign from the state.
   */
  const deleteCampaign = () => {
    setCampaigns((prev) => prev.filter((c) => c.id !== modal.campaign.id));
    closeModal();
  };

  /**
   * Handles the form submission for creating or editing a campaign.
   */
  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (modal.type === 'create') {
      // Create new campaign logic
      setCampaigns((prev) => [
        ...prev,
        { id: Date.now(), name: formData.name, voice: formData.voice, script: formData.script, status: 'Paused', calls: 0 },
      ]);
    } else if (modal.type === 'edit') {
      // Edit existing campaign logic
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === modal.campaign.id ? { ...c, ...formData } : c
        )
      );
    }
    closeModal();
  };

  /* ---------------- render ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-sans antialiased">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Outbound Campaigns</h1>
        <button
          onClick={openCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>New Campaign</span>
        </button>
      </div>

      {/* Campaigns table */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden animate-fade-in-down">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-medium text-gray-600">Campaign Name</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
              <th className="p-4 font-medium text-gray-600">Total Calls</th>
              <th className="p-4 font-medium text-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-900">{c.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${statusBadge(c.status)}`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4 text-gray-600">{c.calls}</td>
                <td className="py-4 flex gap-2 justify-center">
                  <button
                    onClick={() => openEdit(c)}
                    className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => toggleStatus(c.id)}
                    className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    {c.status === 'Running' ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button
                    onClick={() => openDelete(c)}
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
                {modal.type === 'create' ? 'Create New Campaign' : 'Edit Campaign'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Campaign Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Summer Sale 2025"
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
                <label className="block text-sm font-medium mb-1 text-gray-700">Script / Prompt</label>
                <textarea
                  rows={4}
                  value={formData.script}
                  onChange={(e) => setFormData({ ...formData, script: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Hi {{name}}, this is {{agent_name}}..."
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {modal.type === 'create' ? 'Create Campaign' : 'Save Changes'}
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
              <h2 className="text-2xl font-bold text-gray-800">Delete Campaign</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete “<span className="font-semibold">{modal.campaign?.name}</span>”?
            </p>
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                Cancel
              </button>
              <button type="button" onClick={deleteCampaign} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignManagement;
