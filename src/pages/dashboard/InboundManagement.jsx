import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const InboundManagement = () => {
  const [callFlows, setCallFlows] = useState([
    { id: 1, name: 'Support IVR', description: 'Handles customer support calls' },
    { id: 2, name: 'Sales IVR', description: 'Routes calls to sales team' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentFlow, setCurrentFlow] = useState({ id: null, name: '', description: '' });

  // Open Create Modal
  const openCreateModal = () => {
    setIsEditMode(false);
    setCurrentFlow({ id: null, name: '', description: '' });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (flow) => {
    setIsEditMode(true);
    setCurrentFlow(flow);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFlow({ id: null, name: '', description: '' });
  };

  // Create Flow
  const handleCreateFlow = () => {
    if (!currentFlow.name) {
      alert('Please enter a flow name.');
      return;
    }
    setCallFlows([...callFlows, { id: Date.now(), ...currentFlow }]);
    closeModal();
  };

  // Edit Flow
  const handleEditFlow = () => {
    if (!currentFlow.name) {
      alert('Please enter a flow name.');
      return;
    }
    setCallFlows(callFlows.map(flow => (flow.id === currentFlow.id ? currentFlow : flow)));
    closeModal();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inbound Calls (IVR)</h1>
        <Button size="md" onClick={openCreateModal}>+ Create Call Flow</Button>
      </div>

      {/* Existing Call Flows */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Existing IVR Flows</h2>
        {callFlows.length > 0 ? (
          <ul className="space-y-4">
            {callFlows.map(flow => (
              <li key={flow.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-900">{flow.name}</h3>
                  <p className="text-gray-600 text-sm">{flow.description}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => openEditModal(flow)}>Edit</Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No call flows created yet.</p>
        )}
      </Card>

      {/* Drag & Drop Builder Placeholder */}
      <Card className="p-6">
        <p className="text-gray-600 mb-4">
          Design your IVR flow here (visual flow builder can be integrated later).
        </p>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-500">
          Drag and drop steps to build your inbound call flow.
        </div>
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditMode ? 'Edit Call Flow' : 'Create New Call Flow'}
      >
        <div className="space-y-4">
          {/* Flow Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Flow Name</label>
            <input
              type="text"
              value={currentFlow.name}
              onChange={(e) => setCurrentFlow({ ...currentFlow, name: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter flow name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Description</label>
            <textarea
              value={currentFlow.description}
              onChange={(e) => setCurrentFlow({ ...currentFlow, description: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter a short description"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
            {isEditMode ? (
              <Button onClick={handleEditFlow}>Update Flow</Button>
            ) : (
              <Button onClick={handleCreateFlow}>Create Flow</Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InboundManagement;
