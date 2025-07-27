import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const CampaignManagement = () => {
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Sales Outreach', status: 'Running', calls: 150 },
    { id: 2, name: 'Follow-up Campaign', status: 'Completed', calls: 80 }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState({ id: null, name: '', status: 'Running', calls: 0 });

  // Open Create Modal
  const openCreateModal = () => {
    setIsEditMode(false);
    setCurrentCampaign({ id: null, name: '', status: 'Running', calls: 0 });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (campaign) => {
    setIsEditMode(true);
    setCurrentCampaign(campaign);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCampaign({ id: null, name: '', status: 'Running', calls: 0 });
  };

  // Create Campaign
  const handleCreateCampaign = () => {
    if (!currentCampaign.name) {
      alert('Please enter a campaign name.');
      return;
    }
    setCampaigns([...campaigns, { id: Date.now(), ...currentCampaign }]);
    closeModal();
  };

  // Edit Campaign
  const handleEditCampaign = () => {
    if (!currentCampaign.name) {
      alert('Please enter a campaign name.');
      return;
    }
    setCampaigns(campaigns.map(c => c.id === currentCampaign.id ? currentCampaign : c));
    closeModal();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Outbound Campaigns</h1>
        <Button size="md" onClick={openCreateModal}>+ New Campaign</Button>
      </div>

      {/* Campaign Table */}
      <Card className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 font-medium">Campaign Name</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Total Calls</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(c => (
              <tr key={c.id} className="border-t">
                <td className="p-4">{c.name}</td>
                <td className="p-4">{c.status}</td>
                <td className="p-4">{c.calls}</td>
                <td className="p-4">
                  <Button variant="ghost" size="sm" onClick={() => openEditModal(c)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditMode ? "Edit Campaign" : "Create New Campaign"}
      >
        <div className="space-y-4">
          {/* Campaign Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Campaign Name</label>
            <input
              type="text"
              value={currentCampaign.name}
              onChange={(e) => setCurrentCampaign({ ...currentCampaign, name: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter campaign name"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Status</label>
            <select
              value={currentCampaign.status}
              onChange={(e) => setCurrentCampaign({ ...currentCampaign, status: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Running">Running</option>
              <option value="Completed">Completed</option>
              <option value="Paused">Paused</option>
            </select>
          </div>

          {/* Calls (only in edit mode) */}
          {isEditMode && (
            <div>
              <label className="block mb-2 font-medium text-gray-700">Total Calls</label>
              <input
                type="number"
                value={currentCampaign.calls}
                onChange={(e) => setCurrentCampaign({ ...currentCampaign, calls: Number(e.target.value) })}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
            {isEditMode ? (
              <Button onClick={handleEditCampaign}>Update Campaign</Button>
            ) : (
              <Button onClick={handleCreateCampaign}>Create Campaign</Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CampaignManagement;
