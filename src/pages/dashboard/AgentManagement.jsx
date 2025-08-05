// src/pages/AgentManagement.jsx
import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AgentManagement = () => {
  const [agents, setAgents] = useState([
    { id: 1, name: 'Sales Bot', voice: 'Female', status: 'Active' },
    { id: 2, name: 'Support Bot', voice: 'Male', status: 'Paused' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(null); // agent being edited or created

  /* ---------- Modal helpers ---------- */
  const openCreate = () => {
    setCurrent({ id: null, name: '', voice: 'Female', status: 'Active' });
    setModalOpen(true);
  };

  const openEdit = (agent) => {
    setCurrent({ ...agent });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const saveAgent = () => {
    // basic validation
    if (!current.name.trim()) return alert('Name is required');

    if (current.id) {
      // EDIT
      setAgents((prev) =>
        prev.map((a) => (a.id === current.id ? { ...current } : a))
      );
    } else {
      // CREATE
      setAgents((prev) => [
        ...prev,
        { ...current, id: Date.now() },
      ]);
    }
    closeModal();
  };

  const toggleStatus = (id) =>
    setAgents((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === 'Active' ? 'Paused' : 'Active' }
          : a
      )
    );

  const deleteAgent = (id) => {
    if (window.confirm('Delete this agent?')) {
      setAgents((prev) => prev.filter((a) => a.id !== id));
    }
  };

  /* ---------- Render ---------- */
  const badge = (status) =>
    status === 'Active'
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800';

  return (
    <div className="p-6 bg-warm-gray">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AI Agents</h1>
        <Button size="md" onClick={openCreate}>
          + Create Agent
        </Button>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Voice</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{agent.name}</td>
                <td className="p-4">{agent.voice}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${badge(
                      agent.status
                    )}`}
                  >
                    {agent.status}
                  </span>
                </td>
                <td className="py-4 flex gap-2 justify-center">
                  <Button
                    
                    size="sm"
                    onClick={() => openEdit(agent)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-28"
                    onClick={() => toggleStatus(agent.id)}
                  >
                    {agent.status === 'Active' ? 'Pause' : 'Resume'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600"
                    onClick={() => deleteAgent(agent.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* ---------- Modal ---------- */}
      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">
              {current.id ? 'Edit Agent' : 'Create Agent'}
            </h2>

            <div className="space-y-4">
              <label className="block font-medium">Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={current.name}
                onChange={(e) =>
                  setCurrent({ ...current, name: e.target.value })
                }
              />

              <label className="block font-medium">Voice</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={current.voice}
                onChange={(e) =>
                  setCurrent({ ...current, voice: e.target.value })
                }
              >
                <option>Female</option>
                <option>Male</option>
              </select>

              <label className="block font-medium">Status</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={current.status}
                onChange={(e) =>
                  setCurrent({ ...current, status: e.target.value })
                }
              >
                <option>Active</option>
                <option>Paused</option>
              </select>
            </div>

            <div className="mt-6 flex gap-2 justify-end">
              <Button variant="ghost" onClick={closeModal}>
                Cancel
              </Button>
              <Button onClick={saveAgent}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentManagement;