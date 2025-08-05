import React, { useState } from 'react';
import { Mail, Bell, Lock, User, Trash2, X } from 'lucide-react';

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
    danger: 'bg-red-600 text-white hover:bg-red-700',
    'danger-ghost': 'bg-transparent text-red-600 hover:bg-red-100',
  };

  return (
    <button className={`${baseStyle} ${sizeStyle[size]} ${variantStyle[variant]} ${props.className}`} {...props}>
      {children}
    </button>
  );
};

// The main application component for the settings page.
const SettingsPage = () => {
  // State for general settings form
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
  });

  // State for notifications
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
  });

  // State for the delete account modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State for showing confirmation messages
  const [profileSavedMessage, setProfileSavedMessage] = useState(false);
  const [passwordChangeMessage, setPasswordChangeMessage] = useState(false);

  // Handlers for form changes
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleNotificationsChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };
  
  // Handler for saving profile
  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Logic to save profile data (e.g., API call)
    console.log('Profile saved:', profile);
    // Show confirmation message
    setProfileSavedMessage(true);
    // Hide message after 3 seconds
    setTimeout(() => setProfileSavedMessage(false), 3000);
  };

  // Handler for changing password
  const handleChangePassword = () => {
    console.log('Change password initiated');
    // Show confirmation message
    setPasswordChangeMessage(true);
    // Hide message after 3 seconds
    setTimeout(() => setPasswordChangeMessage(false), 3000);
  };

  // Handler for account deletion
  const handleDeleteAccount = () => {
    console.log('Account deletion confirmed');
    // Logic to delete the user's account (e.g., API call)
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-warm-gray  antialiased h-[calc(100vh-6rem)] overflow-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      <div className="space-y-8">
        {/* General Settings */}
        <Card className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <User size={24} className="text-gray-500" />
            <h2 className="text-2xl font-semibold text-gray-900">General</h2>
          </div>
          <p className="text-gray-600 mb-4">Update your profile information.</p>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="pt-2">
              <Button type="submit" size="md">Save Changes</Button>
              {profileSavedMessage && (
                <p className="mt-2 text-sm text-green-600 font-medium animate-fade-in">Profile saved successfully!</p>
              )}
            </div>
          </form>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Bell size={24} className="text-gray-500" />
            <h2 className="text-2xl font-semibold text-gray-900">Notifications</h2>
          </div>
          <p className="text-gray-600 mb-4">Manage your notification preferences.</p>
          <div className="flex items-center justify-between">
            <label htmlFor="emailNotifications" className="text-gray-700 font-medium">Email Notifications</label>
            <input
              type="checkbox"
              id="emailNotifications"
              name="emailNotifications"
              checked={notifications.emailNotifications}
              onChange={handleNotificationsChange}
              className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
            />
          </div>
        </Card>
        
        {/* Password */}
        <Card className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Lock size={24} className="text-gray-500" />
            <h2 className="text-2xl font-semibold text-gray-900">Password</h2>
          </div>
          <p className="text-gray-600 mb-4">Secure your account with a strong password.</p>
          <Button onClick={handleChangePassword} size="md">Change Password</Button>
          {passwordChangeMessage && (
            <p className="mt-2 text-sm text-blue-600 font-medium animate-fade-in">
              Password change flow initiated. Check your email for instructions.
            </p>
          )}
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-2 border-red-500 bg-red-50">
          <div className="flex items-center space-x-4 mb-4">
            <Trash2 size={24} className="text-red-500" />
            <h2 className="text-2xl font-semibold text-red-800">Account Management</h2>
          </div>
          <p className="text-red-700 mb-4">Permanently delete your account and all associated data.</p>
          <Button onClick={() => setIsDeleteModalOpen(true)} size="md" variant="danger">
            Delete Account
          </Button>
        </Card>
      </div>

      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 m-4 animate-scale-in">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Delete Account</h2>
              <button onClick={() => setIsDeleteModalOpen(false)} className="text-gray-500 hover:text-gray-800 transition-colors">
                <X size={24} />
              </button>
            </div>
            <p className="mb-4 text-gray-700">
              Are you sure you want to permanently delete your account? This action cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <Button type="button" onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2" variant="ghost">
                Cancel
              </Button>
              <Button type="button" onClick={handleDeleteAccount} className="px-4 py-2" variant="danger">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
