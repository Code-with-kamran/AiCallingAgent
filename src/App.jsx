import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RouterProvider, useRouter } from './context/RouterContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

// Public Pages
import HomePage from './pages/public/HomePage';
import FeaturesPage from './pages/public/FeaturesPage';
import PricingPage from './pages/public/PricingPage';
import LoginPage from './pages/public/LoginPage';
import SignupPage from './pages/public/SignupPage';
import UseCasesPage from './pages/public/UseCasesPage';
import AboutPage from './pages/public/AboutPage';
import BlogPage from './pages/public/BlogPage';

// Dashboard Pages
import DashboardOverview from './pages/dashboard/DashboardOverview';
import AgentManagement from './pages/dashboard/AgentManagement';
import CampaignManagement from './pages/dashboard/CampaignManagement';
import InboundManagement from './pages/dashboard/InboundManagement';
import ContactsPage from './pages/dashboard/ContactsPage';
import CallHistoryPage from './pages/dashboard/CallHistoryPage';
import CalendarPage from './pages/dashboard/CalendarPage';
import BillingPage from './pages/dashboard/BillingPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import EditProfilePage from './pages/dashboard/EditProfilePage';

const AppContent = () => {
  const { user, logout } = useAuth();
  const { currentPath, navigate } = useRouter();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // All dashboard routes
  const dashboardPaths = [
    '/dashboard', '/agents', '/campaigns', '/inbound',
    '/contacts', '/history', '/calendar', '/billing', '/settings', '/profile'
  ];

  // If logged in and on a dashboard path → show Sidebar layout
  if (user && dashboardPaths.includes(currentPath)) {
    return (
      <>
      <div className="bg-warm-gray">
        <Navbar
          onNavigate={navigate}
          onToggleSidebar={() => setSidebarOpen(true)}
          isDashboard
        />
        <div className="flex pt-16 bg-warm-gray h-screen">
          <Sidebar
            currentPath={currentPath}
            onNavigate={navigate}
            onLogout={logout}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <main className="flex-1 bg-warm-gray min-h-screen md:ml-64 p-6">
            {currentPath === '/dashboard' && <DashboardOverview />}
            {currentPath === '/agents' && <AgentManagement />}
            {currentPath === '/campaigns' && <CampaignManagement />}
            {currentPath === '/inbound' && <InboundManagement />}
            {currentPath === '/contacts' && <ContactsPage />}
            {currentPath === '/history' && <CallHistoryPage />}
            {currentPath === '/calendar' && <CalendarPage />}
            {currentPath === '/billing' && <BillingPage />}
            {currentPath === '/settings' && <SettingsPage />}
            {currentPath === '/profile' && <EditProfilePage />}
          </main>
        </div>
      </div>
      </>
    );
  }

  // Public Routes
  switch (currentPath) {
    case '/':
      return <HomePage />;
    case '/features':
      return <FeaturesPage />;
    case '/pricing':
      return <PricingPage />;
    case '/use-cases':
      return <UseCasesPage />;
    case '/about':
      return <AboutPage />;
    case '/blog':
      return <BlogPage />;
    case '/login':
      return <LoginPage />;
    case '/signup':
      return <SignupPage />;
    default:
      return <HomePage />;
  }
};

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </AuthProvider>
  );
};

export default App;
