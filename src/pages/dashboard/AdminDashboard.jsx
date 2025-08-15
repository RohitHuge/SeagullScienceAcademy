import { useState, useEffect } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  DocumentTextIcon, 
  UserGroupIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';
import AdminLayout from '../../components/AdminLayout';
import { useToast } from '../../components/ui/Toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    pendingEnquiries: 0,
    totalApplications: 0,
    pendingApplications: 0
  });
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // TODO: Implement actual API calls to fetch statistics
      // For now, using mock data
      setStats({
        totalEnquiries: 156,
        pendingEnquiries: 23,
        totalApplications: 89,
        pendingApplications: 12
      });
    } catch (error) {
      showToast('Failed to fetch dashboard statistics', 'error');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-black/40 backdrop-blur-md border border-neon-blue/30 rounded-lg p-6 hover:border-neon-cyan hover:shadow-neon-cyan transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-light-text mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-neon-green' : 'text-neon-red'}`}>
              {change > 0 ? '+' : ''}{change} from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-black" />
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, onClick, color }) => (
    <button
      onClick={onClick}
      className="w-full bg-black/40 backdrop-blur-md border border-neon-blue/30 rounded-lg p-6 text-left hover:border-neon-cyan hover:shadow-neon-cyan transition-all duration-300 group"
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-black" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-light-text">{title}</h3>
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>
      </div>
    </button>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-neon-blue border-r-2 border-b-2 border-transparent"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-light-text">Dashboard Overview</h1>
          <p className="text-gray-400 mt-2">Welcome back! Here's what's happening with your enquiries and applications.</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Enquiries"
            value={stats.totalEnquiries}
            icon={ChatBubbleLeftRightIcon}
            color="bg-neon-blue"
            change={12}
          />
          <StatCard
            title="Pending Enquiries"
            value={stats.pendingEnquiries}
            icon={ClockIcon}
            color="bg-neon-yellow"
            change={-5}
          />
          <StatCard
            title="Total Applications"
            value={stats.totalApplications}
            icon={DocumentTextIcon}
            color="bg-neon-cyan"
            change={8}
          />
          <StatCard
            title="Pending Applications"
            value={stats.pendingApplications}
            icon={UserGroupIcon}
            color="bg-neon-green"
            change={-2}
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-light-text mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickActionCard
              title="View Pending Enquiries"
              description="Review and respond to new enquiries"
              icon={ChatBubbleLeftRightIcon}
              color="bg-neon-blue"
              onClick={() => window.location.href = '/admin/enquiries'}
            />
            <QuickActionCard
              title="Review Applications"
              description="Process new student applications"
              icon={DocumentTextIcon}
              color="bg-neon-cyan"
              onClick={() => window.location.href = '/admin/applications'}
            />
            <QuickActionCard
              title="Generate Reports"
              description="Create detailed analytics reports"
              icon={UserGroupIcon}
              color="bg-neon-green"
              onClick={() => showToast('Report generation coming soon!', 'info')}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-light-text mb-4">Recent Activity</h2>
          <div className="bg-black/40 backdrop-blur-md border border-neon-blue/30 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                <span className="text-gray-400">New enquiry received from John Doe</span>
                <span className="text-neon-cyan">2 minutes ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                <span className="text-gray-400">Application status updated for Jane Smith</span>
                <span className="text-neon-cyan">15 minutes ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-neon-yellow rounded-full"></div>
                <span className="text-gray-400">Follow-up reminder sent to 5 pending enquiries</span>
                <span className="text-neon-cyan">1 hour ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
