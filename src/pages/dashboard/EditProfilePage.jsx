// src/pages/EditProfilePage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Adjust the import path as needed
import Button from '../../components/ui/Button';

const EditProfilePage = () => {
  const { user, setUser } = useAuth(); // setUser must be exposed by AuthProvider
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(user?.avatar || '/api/placeholder/40/40');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Avatar preview on file select
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));

    setUser({ ...user, name, email, avatar });
    alert('Profile updated!');
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-warm-gray h-full">
      <h1 className="text-h1 font-bold mb-6">Edit Profile</h1>

      {/* Avatar */}
      <div className="mb-6 flex items-center space-x-4">
        <img
          src={avatar}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover border-2 border-brand"
        />
        <label className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">
          Change photo
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </label>
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Full Name</label>
        <input
          type="text"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">New Password (optional)</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full border rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      {password && (
        <div className="mb-4">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter new password"
          />
        </div>
      )}

      <Button onClick={handleSave} disabled={loading}>
        {loading ? 'Saving…' : 'Save Changes'}
      </Button>
    </div>
  );
};

export default EditProfilePage;