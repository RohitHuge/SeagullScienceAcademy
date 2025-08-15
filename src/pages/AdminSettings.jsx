import { useState } from 'react';
import { 
  Cog6ToothIcon, 
  BellIcon, 
  ShieldCheckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import AdminLayout from '../components/AdminLayout';
import { useToast } from '../components/ui/Toast';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    autoRefresh: false,
    darkMode: true
  });
  const { showToast } = useToast();

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    showToast(`${key.replace(/([A-Z])/g, ' $1').toLowerCase()} updated`, 'success');
  };

  const SettingCard = ({ title, description, icon: Icon, children }) => (
    <div className="bg-black/40 backdrop-blur-md border border-neon-blue/30 rounded-lg p-6">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-neon-blue/20 rounded-lg">
          <Icon className="w-6 h-6 text-neon-blue" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-light-text mb-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>
          {children}
        </div>
      </div>
    </div>
  );

  const ToggleSwitch = ({ enabled, onChange, label }) => (
    <div className="flex items-center justify-between">
      <span className="text-light-text text-sm">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-black ${
          enabled ? 'bg-neon-blue' : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-light-text">Settings</h1>
          <p className="text-gray-400 mt-2">Configure your admin dashboard preferences</p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notifications */}
          <SettingCard
            title="Notifications"
            description="Manage how you receive alerts and updates"
            icon={BellIcon}
          >
            <div className="space-y-4">
              <ToggleSwitch
                enabled={settings.notifications}
                onChange={(value) => handleSettingChange('notifications', value)}
                label="Enable push notifications"
              />
              <ToggleSwitch
                enabled={settings.emailAlerts}
                onChange={(value) => handleSettingChange('emailAlerts', value)}
                label="Email alerts for new enquiries"
              />
            </div>
          </SettingCard>

          {/* Interface */}
          <SettingCard
            title="Interface"
            description="Customize your dashboard appearance and behavior"
            icon={Cog6ToothIcon}
          >
            <div className="space-y-4">
              <ToggleSwitch
                enabled={settings.autoRefresh}
                onChange={(value) => handleSettingChange('autoRefresh', value)}
                label="Auto-refresh data every 5 minutes"
              />
              <ToggleSwitch
                enabled={settings.darkMode}
                onChange={(value) => handleSettingChange('darkMode', value)}
                label="Dark mode (always enabled)"
              />
            </div>
          </SettingCard>

          {/* Security */}
          <SettingCard
            title="Security"
            description="Manage your account security settings"
            icon={ShieldCheckIcon}
          >
            <div className="space-y-4">
              <button className="px-4 py-2 border border-neon-blue/50 text-neon-blue rounded hover:bg-neon-blue/10 transition-colors">
                Change Password
              </button>
              <button className="px-4 py-2 border border-neon-blue/50 text-neon-blue rounded hover:bg-neon-blue/10 transition-colors">
                Enable 2FA
              </button>
            </div>
          </SettingCard>

          {/* Team */}
          <SettingCard
            title="Team Management"
            description="Manage admin users and permissions"
            icon={UserGroupIcon}
          >
            <div className="space-y-4">
              <button className="px-4 py-2 border border-neon-blue/50 text-neon-blue rounded hover:bg-neon-blue/10 transition-colors">
                Add Admin User
              </button>
              <button className="px-4 py-2 border border-neon-blue/50 text-neon-blue rounded hover:bg-neon-blue/10 transition-colors">
                Manage Permissions
              </button>
            </div>
          </SettingCard>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-3 bg-neon-blue text-black font-medium rounded-lg hover:bg-neon-cyan hover:shadow-neon-cyan transition-all duration-300">
            Save Changes
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
