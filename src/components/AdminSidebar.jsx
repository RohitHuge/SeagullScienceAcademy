import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  ChatBubbleLeftRightIcon, 
  DocumentTextIcon, 
  Cog6ToothIcon 
} from '@heroicons/react/24/outline';

const AdminSidebar = () => {
  const navItems = [
    { path: '/admin', icon: HomeIcon, label: 'Dashboard' },
    { path: '/admin/enquiries', icon: ChatBubbleLeftRightIcon, label: 'Enquiries' },
    { path: '/admin/applications', icon: DocumentTextIcon, label: 'Applications' },
    { path: '/admin/settings', icon: Cog6ToothIcon, label: 'Settings' }
  ];

  return (
    <div className="w-64 bg-black/80 backdrop-blur-md border-r border-neon-blue/30 h-screen fixed left-0 top-0 z-40">
      <div className="p-6">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-light-text">Seagull Academy</h1>
          <p className="text-neon-cyan text-sm">Admin Panel</p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                  isActive
                    ? 'bg-neon-blue/20 border border-neon-blue text-neon-cyan shadow-neon-blue'
                    : 'text-light-text hover:bg-neon-blue/10 hover:border hover:border-neon-blue/30'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
