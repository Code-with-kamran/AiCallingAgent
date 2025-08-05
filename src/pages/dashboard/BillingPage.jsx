import React from 'react';

// A simple Card component for styling.
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-md ${className}`}>
    {children}
  </div>
);

// A simple Button component with styling variations.
const Button = ({ children, size = 'md', variant = 'default', ...props }) => {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200';
  const sizeStyle = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  const variantStyle = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
  };

  return (
    <button className={`${baseStyle} ${sizeStyle[size]} ${variantStyle[variant]}`} {...props}>
      {children}
    </button>
  );
};

// The main BillingPagelication component for the billing page.
const BillingPage = () => {
  // Mock data for invoices.
  const invoices = [
    { id: 'INV-001', date: 'Jan 15, 2025', amount: '$29', status: 'Paid' },
    { id: 'INV-002', date: 'Feb 15, 2025', amount: '$29', status: 'Paid' },
    { id: 'INV-003', date: 'Mar 15, 2025', amount: '$29', status: 'Pending' }
  ];

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-gray-50 font-sans antialiased">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Billing</h1>

      {/* Current Plan */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-2">Current Plan</h2>
        <p className="text-gray-600 mb-4">Pro Plan – $29/month</p>
        <Button size="md">Upgrade Plan</Button>
      </Card>

      {/* Usage Summary */}
      <Card className="p-6 mb-8">
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
              <th className="p-4 font-medium text-gray-700">Invoice ID</th>
              <th className="p-4 font-medium text-gray-700">Date</th>
              <th className="p-4 font-medium text-gray-700">Amount</th>
              <th className="p-4 font-medium text-gray-700">Status</th>
              <th className="p-4 font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t border-gray-200">
                <td className="p-4">{invoice.id}</td>
                <td className="p-4">{invoice.date}</td>
                <td className="p-4">{invoice.amount}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
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
