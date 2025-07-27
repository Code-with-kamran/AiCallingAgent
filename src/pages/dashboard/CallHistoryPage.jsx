import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { Search } from 'lucide-react';

const CallHistoryPage = () => {
  const allCalls = [
    { id: 1, type: 'Inbound', customer: 'Sarah Johnson', duration: '4:32', date: '2025-07-20', status: 'Completed' },
    { id: 2, type: 'Outbound', customer: 'Mark Smith', duration: '2:10', date: '2025-07-21', status: 'Missed' },
    { id: 3, type: 'Outbound', customer: 'John Doe', duration: '3:00', date: '2025-07-22', status: 'Completed' }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedCall, setSelectedCall] = useState(null); // For View Modal

  // Filter & Search Logic
  const filteredCalls = allCalls.filter(call => {
    const matchesType = filterType === 'All' || call.type === filterType;
    const matchesSearch = call.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">Call History</h1>
      <p className="text-gray-600 mb-6">View all inbound and outbound calls with details.</p>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex items-center border rounded-lg px-4 py-2 w-full md:w-1/3">
          <Search className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search by customer name..."
            className="w-full outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4">
          <Button
            variant={filterType === 'All' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterType('All')}
          >
            All Calls
          </Button>
          <Button
            variant={filterType === 'Inbound' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterType('Inbound')}
          >
            Inbound
          </Button>
          <Button
            variant={filterType === 'Outbound' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterType('Outbound')}
          >
            Outbound
          </Button>
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
            {filteredCalls.length > 0 ? (
              filteredCalls.map((call) => (
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
                    <Button variant="ghost" size="sm" onClick={() => setSelectedCall(call)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No calls found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* View Details Modal */}
      <Modal
        isOpen={!!selectedCall}
        onClose={() => setSelectedCall(null)}
        title="Call Details"
      >
        {selectedCall && (
          <div className="space-y-4">
            <p><strong>Customer:</strong> {selectedCall.customer}</p>
            <p><strong>Type:</strong> {selectedCall.type}</p>
            <p><strong>Duration:</strong> {selectedCall.duration}</p>
            <p><strong>Date:</strong> {selectedCall.date}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCall.status === 'Completed'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {selectedCall.status}
              </span>
            </p>
            <div className="flex justify-end">
              <Button onClick={() => setSelectedCall(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CallHistoryPage;
