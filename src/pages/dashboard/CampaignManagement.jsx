import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const CampaignManagement = () => {
  /* ---------------- campaigns ---------------- */
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Sales Outreach', status: 'Running', calls: 150 },
    { id: 2, name: 'Follow-up Campaign', status: 'Completed', calls: 80 },
  ]);

  /* ---------------- modal helpers ---------------- */
  const [modal, setModal] = useState({ type: null, campaign: null });

  const openCreate   = () => setModal({ type: 'create', campaign: null });
  const openDelete   = (campaign) => setModal({ type: 'delete', campaign });
  const closeModal   = () => setModal({ type: null, campaign: null });

  /* ---------------- form state ---------------- */
  const [name, setName]   = useState('');
  const [voice, setVoice] = useState('Female');
  const [script, setScript] = useState('');

  /* ---------------- actions ---------------- */
  const statusBadge = (s) =>
    s === 'Running'
      ? 'bg-green-100 text-green-800'
      : s === 'Paused'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-gray-100 text-gray-800';

  const toggleStatus = (id) =>
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'Running' ? 'Paused' : 'Running' } : c
      )
    );

  const deleteCampaign = () => {
    setCampaigns((prev) => prev.filter((c) => c.id !== modal.campaign.id));
    closeModal();
  };

  /* create campaign */
  const handleCreate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setCampaigns((prev) => [
      ...prev,
      { id: Date.now(), name, voice, status: 'Paused', calls: 0 },
    ]);
    setName(''); setVoice('Female'); setScript('');
    closeModal();
  };

  /* ---------------- render ---------------- */
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Outbound Campaigns</h1>
        <Button size="md" onClick={openCreate}>
          + New Campaign
        </Button>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 font-medium">Campaign Name</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Total Calls</th>
              <th className="p-4 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{c.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${statusBadge(c.status)}`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4">{c.calls}</td>
                <td className="py-4 flex gap-2 justify-end">
                  <Button size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-28"
                    onClick={() => toggleStatus(c.id)}
                  >
                    {c.status === 'Running' ? 'Pause' : 'Resume'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"

                    className="text-red-600"
                    onClick={() => openDelete(c)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* ---------- CREATE MODAL ---------- */}
      <Modal
        open={modal.type === 'create'}
        onClose={closeModal}
        title="Create New Campaign"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Campaign Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. Summer Sale 2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Voice</label>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option>Female</option>
              <option>Male</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Script / Prompt</label>
            <textarea
              rows={4}
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full border rounded px-3 py-2 resize-none"
              placeholder="Hi {{name}}, this is {{agent_name}}..."
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">Create Campaign</Button>
          </div>
        </form>
      </Modal>

      {/* ---------- DELETE CONFIRM ---------- */}
      {modal.type === 'delete' && (
        <Modal open onClose={closeModal} title="Delete Campaign">
          <p className="mb-4">
            Are you sure you want to delete “{modal.campaign?.name}”?
          </p>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteCampaign}>
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CampaignManagement;