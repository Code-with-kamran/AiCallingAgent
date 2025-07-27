import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const AgentManagement = () => {
  const [agents, setAgents] = useState([
    { id: 1, name: 'Sales Bot', voice: 'Female', status: 'Active' },
    { id: 2, name: 'Support Bot', voice: 'Male', status: 'Paused' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAgent, setCurrentAgent] = useState({ id: null, name: '', voice: 'Female', status: 'Active' });

  const handleCreateAgent = () => {
    if (!currentAgent.name) {
      alert('Please enter agent name.');
      return;
    }
    setAgents([...agents, { id: Date.now(), ...currentAgent }]);
    closeModal();
  };

  const handleEditAgent = () => {
    if (!currentAgent.name) {
      alert('Please enter agent name.');
      return;
    }
    setAgents(agents.map(agent => agent.id === currentAgent.id ? currentAgent : agent));
    closeModal();
  };

  const openCreateModal = () => {
    setIsEditMode(false);
    setCurrentAgent({ id: null, name: '', voice: 'Female', status: 'Active' });
    setIsModalOpen(true);
  };

  const openEditModal = (agent) => {
    setIsEditMode(true);
    setCurrentAgent(agent);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAgent({ id: null, name: '', voice: 'Female', status: 'Active' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AI Agents</h1>
        <Button size="md" onClick={openCreateModal}>+ Create Agent</Button>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Voice</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(agent => (
              <tr key={agent.id} className="border-t">
                <td className="p-4">{agent.name}</td>
                <td className="p-4">{agent.voice}</td>
                <td className="p-4">{agent.status}</td>
                <td className="p-4">
                  <Button variant="ghost" size="sm" onClick={() => openEditModal(agent)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Modal for Create/Edit Agent */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditMode ? "Edit Agent" : "Create New Agent"}
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Agent Name</label>
            <input
              type="text"
              value={currentAgent.name}
              onChange={(e) => setCurrentAgent({ ...currentAgent, name: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter agent name"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Voice</label>
            <select
              value={currentAgent.voice}
              onChange={(e) => setCurrentAgent({ ...currentAgent, voice: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Status</label>
            <select
              value={currentAgent.status}
              onChange={(e) => setCurrentAgent({ ...currentAgent, status: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
            {isEditMode ? (
              <Button onClick={handleEditAgent}>Update Agent</Button>
            ) : (
              <Button onClick={handleCreateAgent}>Create Agent</Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AgentManagement;
