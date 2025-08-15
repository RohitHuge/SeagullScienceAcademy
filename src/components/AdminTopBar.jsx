import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  BellIcon, 
  UserCircleIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './ui/Toast';

const AdminTopBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        showToast('Logged out successfully', 'success');
      } else {
        showToast('Logout failed', 'error');
      }
    } catch (error) {
      showToast('An error occurred during logout', 'error');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="h-16 bg-black/60 backdrop-blur-md border-b border-neon-blue/30 flex items-center justify-between px-6 ml-64">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search enquiries, applications..."
            className="w-full pl-10 pr-4 py-2 bg-black/30 border border-neon-blue/50 rounded-lg text-light-text placeholder-gray-400 focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all duration-300"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 text-light-text hover:text-neon-cyan hover:bg-neon-blue/10 rounded-lg transition-all duration-300">
          <BellIcon className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-neon-red rounded-full animate-pulse"></span>
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center space-x-2 p-2 text-light-text hover:text-neon-cyan hover:bg-neon-blue/10 rounded-lg transition-all duration-300"
          >
            <UserCircleIcon className="w-8 h-8" />
            <span className="text-sm font-medium">{user?.name || user?.email}</span>
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-neon-blue/30 rounded-lg shadow-neon-blue py-2 z-50">
              <div className="px-4 py-2 border-b border-neon-blue/20">
                <p className="text-light-text text-sm font-medium">{user?.name || 'Admin User'}</p>
                <p className="text-gray-400 text-xs">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-light-text hover:bg-neon-blue/20 hover:text-neon-cyan transition-all duration-300"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTopBar;
