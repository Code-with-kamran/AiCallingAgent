import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const CampaignManagement = () => {
  const campaigns = [
    { id: 1, name: 'Sales Outreach', status: 'Running', calls: 150 },
    { id: 2, name: 'Follow-up Campaign', status: 'Completed', calls: 80 }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Outbound Campaigns</h1>
        <Button size="md">+ New Campaign</Button>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 font-medium">Campaign Name</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Total Calls</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(c => (
              <tr key={c.id} className="border-t">
                <td className="p-4">{c.name}</td>
                <td className="p-4">{c.status}</td>
                <td className="p-4">{c.calls}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default CampaignManagement;
