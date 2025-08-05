import React, { useState } from 'react';
import { BarChart3, Mic, Target, PhoneCall, Users, History, Calendar, CreditCard, Settings, LogOut, Menu, X } from 'lucide-react';

const Sidebar = ({ currentPath, onNavigate, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/agents', label: 'AI Agents', icon: Mic },
    { path: '/campaigns', label: 'Outbound Campaigns', icon: Target },
    { path: '/inbound', label: 'Inbound Calls', icon: PhoneCall },
    { path: '/contacts', label: 'Contacts', icon: Users },
    { path: '/history', label: 'Call History', icon: History },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
    { path: '/billing', label: 'Billing', icon: CreditCard },
     { path: '/profile', label: 'Edit Profile', icon: Settings },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];

  /* ---------- Sidebar drawer ---------- */
  const SidebarContent = ({ mobile }) => (
    <aside
      className={
        mobile
          ? `fixed inset-y-0 left-0 z-30 w-64 bg-dark text-light flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
          : 'hidden lg:flex lg:flex-col lg:w-64 lg:bg-dark lg:text-light lg:fixed lg:inset-y-0 lg:left-0'
      }
    >
      {/* Brand */}
      <div className="h-16 flex items-center px-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">VoiceAI</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {menuItems.map(({ path, label, icon: Icon }) => (
          <button
            key={path}
            onClick={() => {
              onNavigate(path);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${currentPath === path ? 'bg-brand text-white' : 'hover:bg-gray-700'}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-red-900/30"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop / fixed sidebar */}
      <SidebarContent mobile={false} />

      {/* Mobile overlay drawer */}
      <SidebarContent mobile={true} />
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Hamburger button (only on mobile) */}
      <button
        className="lg:hidden fixed top-18 right-8 text-dark bg-transparent z-40 p-2  z-3 rounded-md shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {/* {sidebarOpen ? <X size={24} /> : <Menu size={24} />} */}
        {sidebarOpen ?  <p>Close Sidebar</p>: <p>Open Sidebar</p>}
      </button>
    </>
  );
};

export default Sidebar;