import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AgentManagement = () => {
  const agents = [
    { id: 1, name: 'Sales Bot', voice: 'Female', status: 'Active' },
    { id: 2, name: 'Support Bot', voice: 'Male', status: 'Paused' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AI Agents</h1>
        <Button size="md">+ Create Agent</Button>
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
                  <Button variant="ghost" size="sm">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default AgentManagement;
