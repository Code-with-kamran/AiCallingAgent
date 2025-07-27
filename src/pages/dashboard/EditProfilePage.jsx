import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const EditProfilePage = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('/api/placeholder/100/100'); // Default image

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleUpdate = () => {
    alert('Profile updated successfully!');
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Edit Profile</h1>
      <p className="text-gray-600 mb-8">Update your personal information and profile settings.</p>

      <Card className="p-8 max-w-3xl">
        {/* Profile Picture */}
        <div className="flex items-center gap-6 mb-8">
          <img
            src={avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-300 object-cover"
          />
          <div>
            <label className="block text-sm font-medium mb-2">Change Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block text-sm text-gray-600"
            />
          </div>
        </div>

        {/* Profile Form */}
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="Leave blank to keep current password"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Button size="md" onClick={handleUpdate}>Save Changes</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EditProfilePage;
