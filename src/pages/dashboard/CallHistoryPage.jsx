import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Search } from 'lucide-react';

const CallHistoryPage = () => {
  const callLogs = [
    {
      id: 1,
      type: 'Inbound',
      customer: 'Sarah Johnson',
      duration: '4:32',
      date: '2025-07-20',
      status: 'Completed'
    },
    {
      id: 2,
      type: 'Outbound',
      customer: 'Mark Smith',
      duration: '2:10',
      date: '2025-07-21',
      status: 'Missed'
    },
    {
      id: 3,
      type: 'Outbound',
      customer: 'John Doe',
      duration: '3:00',
      date: '2025-07-22',
      status: 'Completed'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">Call History</h1>
      <p className="text-gray-600 mb-6">View all inbound and outbound calls with details.</p>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center border rounded-lg px-4 py-2 w-full md:w-1/3">
          <Search className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search by customer name..."
            className="w-full outline-none text-gray-700"
          />
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="sm">All Calls</Button>
          <Button variant="outline" size="sm">Inbound</Button>
          <Button variant="outline" size="sm">Outbound</Button>
        </div>
      </div>

      {/* Call Logs Table */}
      <Card className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Duration</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {callLogs.map((call) => (
              <tr key={call.id} className="border-t">
                <td className="p-4">{call.type}</td>
                <td className="p-4">{call.customer}</td>
                <td className="p-4">{call.duration}</td>
                <td className="p-4">{call.date}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      call.status === 'Completed'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {call.status}
                  </span>
                </td>
                <td className="p-4">
                  <Button variant="ghost" size="sm">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default CallHistoryPage;
