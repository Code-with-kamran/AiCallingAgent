import React, { useState } from 'react';
import Button from '../../components/ui/Button';

const EditProfilePage = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');

  const handleSave = () => {
    alert('Profile updated successfully!');
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Full Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default EditProfilePage;
