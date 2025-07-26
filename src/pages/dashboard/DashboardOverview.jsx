import React from 'react';
import Card from '../../components/ui/Card';
import { PhoneCall, Mic, DollarSign } from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    { icon: PhoneCall, label: 'Total Calls', value: '1,240' },
    { icon: Mic, label: 'Active Agents', value: '5' },
    { icon: DollarSign, label: 'This Month Spend', value: '$230' }
  ];

  const recentCalls = [
    { id: 1, type: 'Inbound', customer: 'Sarah', duration: '4:32', status: 'Completed' },
    { id: 2, type: 'Outbound', customer: 'Mark', duration: '2:10', status: 'Missed' },
    { id: 3, type: 'Outbound', customer: 'John', duration: '3:00', status: 'Completed' }
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <Card key={i} className="p-6 text-center" hover>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon size={24} />
              </div>
              <h3 className="text-2xl font-bold">{item.value}</h3>
              <p className="text-gray-600">{item.label}</p>
            </Card>
          );
        })}
      </div>

     
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Calls</h2>
        <Card className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Duration</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map(call => (
                <tr key={call.id} className="border-t">
                  <td className="p-4">{call.type}</td>
                  <td className="p-4">{call.customer}</td>
                  <td className="p-4">{call.duration}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      call.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {call.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
