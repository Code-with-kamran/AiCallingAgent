import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const BillingPage = () => {
  const invoices = [
    { id: 'INV-001', date: 'Jan 15, 2025', amount: '$29', status: 'Paid' },
    { id: 'INV-002', date: 'Feb 15, 2025', amount: '$29', status: 'Paid' },
    { id: 'INV-003', date: 'Mar 15, 2025', amount: '$29', status: 'Pending' }
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Billing</h1>

      {/* Current Plan */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-2">Current Plan</h2>
        <p className="text-gray-600 mb-4">Pro Plan – $29/month</p>
        <Button size="md">Upgrade Plan</Button>
      </Card>

      {/* Usage Summary */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Usage Summary</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-4xl font-bold text-blue-600">500</p>
            <p className="text-gray-600">Minutes Used</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-purple-600">3</p>
            <p className="text-gray-600">Active Agents</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-600">$87</p>
            <p className="text-gray-600">Total Spent</p>
          </div>
        </div>
      </Card>

      {/* Invoices */}
      <Card className="overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4 p-6">Invoices</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 font-medium">Invoice ID</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t">
                <td className="p-4">{invoice.id}</td>
                <td className="p-4">{invoice.date}</td>
                <td className="p-4">{invoice.amount}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      invoice.status === 'Paid'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="p-4">
                  <Button variant="ghost" size="sm">Download</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default BillingPage;
