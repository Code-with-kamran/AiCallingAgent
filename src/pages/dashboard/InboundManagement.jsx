import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const InboundManagement = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inbound Calls (IVR)</h1>
        <Button size="md">+ Create Call Flow</Button>
      </div>

      <Card className="p-6">
        <p className="text-gray-600 mb-4">
          Design your IVR flow here (visual flow builder can be integrated later).
        </p>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-500">
          Drag and drop steps to build your inbound call flow.
        </div>
      </Card>
    </div>
  );
};

export default InboundManagement;
