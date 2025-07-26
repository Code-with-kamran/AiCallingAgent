import React from 'react';
import { BarChart3, Mic, Target, PhoneCall, Users, History, Calendar, CreditCard, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ currentPath, onNavigate, onLogout }) => {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/agents', label: 'AI Agents', icon: Mic },
    { path: '/campaigns', label: 'Outbound Campaigns', icon: Target },
    { path: '/inbound', label: 'Inbound Calls', icon: PhoneCall },
    { path: '/contacts', label: 'Contacts', icon: Users },
    { path: '/history', label: 'Call History', icon: History },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
    { path: '/billing', label: 'Billing', icon: CreditCard },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-200 fixed">
      <div className="p-6 font-bold text-xl text-blue-600">VoiceAI</div>
      <nav className="flex-1 space-y-2 px-4">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                currentPath === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-4 py-3 text-gray-500 hover:text-red-600"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
