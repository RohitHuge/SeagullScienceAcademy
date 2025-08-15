import { useState, useEffect } from 'react';
import { 
  EyeIcon, 
  PencilIcon, 
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import AdminLayout from '../components/AdminLayout';
import { useToast } from '../components/ui/Toast';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    subject: '',
    status: '',
    outcome: ''
  });
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { showToast } = useToast();

  const subjects = [
    'Admission Inquiry',
    'Course Information',
    'Fee Structure',
    'Batch Details',
    'General Query',
    'Other'
  ];

  const statuses = ['Pending', 'Addressed'];
  const outcomes = [
    'Converted to Admission',
    'Lost the Student',
    'Follow-up Required',
    'Custom'
  ];

  useEffect(() => {
    fetchEnquiries();
  }, [currentPage, filters]);

  const fetchEnquiries = async () => {
    try {
      // TODO: Implement actual API call with pagination and filters
      // Mock data for now
      const mockEnquiries = Array.from({ length: 25 }, (_, i) => ({
        id: `enq_${i + 1}`,
        name: `Student ${i + 1}`,
        phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        email: `student${i + 1}@example.com`,
        subject: subjects[Math.floor(Math.random() * subjects.length)],
        message: `This is a sample enquiry message ${i + 1}. It contains details about the student's interest in our courses and their specific requirements.`,
        status: Math.random() > 0.3 ? 'Addressed' : 'Pending',
        addressedBy: Math.random() > 0.3 ? 'Admin User' : '',
        outcome: Math.random() > 0.3 ? outcomes[Math.floor(Math.random() * outcomes.length)] : '',
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
      }));

      setEnquiries(mockEnquiries);
      setTotalPages(Math.ceil(mockEnquiries.length / 10));
    } catch (error) {
      showToast('Failed to fetch enquiries', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (enquiryId, newStatus) => {
    try {
      // TODO: Implement API call to update status
      setEnquiries(prev => prev.map(enq => 
        enq.id === enquiryId 
          ? { ...enq, status: newStatus, addressedBy: newStatus === 'Addressed' ? 'Admin User' : '' }
          : enq
      ));
      showToast('Status updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleOutcomeUpdate = async (enquiryId, newOutcome) => {
    try {
      // TODO: Implement API call to update outcome
      setEnquiries(prev => prev.map(enq => 
        enq.id === enquiryId ? { ...enq, outcome: newOutcome } : enq
      ));
      showToast('Outcome updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update outcome', 'error');
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    return (
      (!filters.subject || enquiry.subject === filters.subject) &&
      (!filters.status || enquiry.status === filters.status) &&
      (!filters.outcome || enquiry.outcome === filters.outcome)
    );
  });

  const paginatedEnquiries = filteredEnquiries.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const ViewModal = ({ enquiry, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/90 backdrop-blur-md border border-neon-blue rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-light-text">Enquiry Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-neon-red transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm">Name</label>
                <p className="text-light-text font-medium">{enquiry.name}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Phone</label>
                <p className="text-light-text font-medium">{enquiry.phone}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Email</label>
                <p className="text-light-text font-medium">{enquiry.email}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Subject</label>
                <p className="text-light-text font-medium">{enquiry.subject}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Status</label>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  enquiry.status === 'Pending' 
                    ? 'bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/30' 
                    : 'bg-neon-green/20 text-neon-green border border-neon-green/30'
                }`}>
                  {enquiry.status}
                </span>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Date</label>
                <p className="text-light-text font-medium">{enquiry.date}</p>
              </div>
            </div>
            
            <div>
              <label className="text-gray-400 text-sm">Message</label>
              <p className="text-light-text mt-1 bg-black/30 p-3 rounded border border-neon-blue/30">
                {enquiry.message}
              </p>
            </div>

            {enquiry.status === 'Addressed' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm">Addressed By</label>
                  <p className="text-light-text font-medium">{enquiry.addressedBy}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Outcome</label>
                  <p className="text-light-text font-medium">{enquiry.outcome || 'Not specified'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const EditModal = ({ enquiry, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      status: enquiry.status,
      outcome: enquiry.outcome || ''
    });

    const handleSave = () => {
      onSave(enquiry.id, formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-black/90 backdrop-blur-md border border-neon-blue rounded-lg max-w-md w-full">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-light-text">Edit Enquiry</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-neon-red transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 bg-black/30 border border-neon-blue/50 rounded text-light-text focus:border-neon-cyan focus:outline-none"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-gray-400 text-sm">Outcome</label>
                <select
                  value={formData.outcome}
                  onChange={(e) => setFormData(prev => ({ ...prev, outcome: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 bg-black/30 border border-neon-blue/50 rounded text-light-text focus:border-neon-cyan focus:outline-none"
                >
                  <option value="">Select outcome</option>
                  {outcomes.map(outcome => (
                    <option key={outcome} value={outcome}>{outcome}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-neon-blue/50 text-neon-blue rounded hover:bg-neon-blue/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-neon-blue text-black font-medium rounded hover:bg-neon-cyan transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
          <h1 className="text-3xl font-bold text-light-text">Enquiries Management</h1>
          <p className="text-gray-400 mt-2">Manage and respond to student enquiries</p>
        </div>

        {/* Filters */}
        <div className="bg-black/40 backdrop-blur-md border border-neon-blue/30 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-gray-400 text-sm font-medium mb-2 block">Subject</label>
              <select
                value={filters.subject}
                onChange={(e) => setFilters(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-3 py-2 bg-black/30 border border-neon-blue/50 rounded text-light-text focus:border-neon-cyan focus:outline-none"
              >
                <option value="">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-gray-400 text-sm font-medium mb-2 block">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 bg-black/30 border border-neon-blue/50 rounded text-light-text focus:border-neon-cyan focus:outline-none"
              >
                <option value="">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-gray-400 text-sm font-medium mb-2 block">Outcome</label>
              <select
                value={filters.outcome}
                onChange={(e) => setFilters(prev => ({ ...prev, outcome: e.target.value }))}
                className="w-full px-3 py-2 bg-black/30 border border-neon-blue/50 rounded text-light-text focus:border-neon-cyan focus:outline-none"
              >
                <option value="">All Outcomes</option>
                {outcomes.map(outcome => (
                  <option key={outcome} value={outcome}>{outcome}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-black/40 backdrop-blur-md border border-neon-blue/30 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/60">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neon-blue/20">
                {paginatedEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-neon-blue/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-light-text">{enquiry.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-light-text">{enquiry.phone}</div>
                      <div className="text-sm text-gray-400">{enquiry.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-light-text">{enquiry.subject}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-400 max-w-xs truncate">
                        {enquiry.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        enquiry.status === 'Pending' 
                          ? 'bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/30' 
                          : 'bg-neon-green/20 text-neon-green border border-neon-green/30'
                      }`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {enquiry.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedEnquiry(enquiry);
                            setShowViewModal(true);
                          }}
                          className="text-neon-blue hover:text-neon-cyan transition-colors"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedEnquiry(enquiry);
                            setShowEditModal(true);
                          }}
                          className="text-neon-cyan hover:text-neon-blue transition-colors"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        {enquiry.status === 'Pending' && (
                          <button
                            onClick={() => handleStatusUpdate(enquiry.id, 'Addressed')}
                            className="text-neon-green hover:text-neon-cyan transition-colors"
                            title="Mark as addressed"
                          >
                            <CheckIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, filteredEnquiries.length)} of {filteredEnquiries.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-neon-blue/50 text-neon-blue rounded hover:bg-neon-blue/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <span className="px-3 py-2 text-light-text">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-neon-blue/50 text-neon-blue rounded hover:bg-neon-blue/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showViewModal && selectedEnquiry && (
        <ViewModal
          enquiry={selectedEnquiry}
          onClose={() => {
            setShowViewModal(false);
            setSelectedEnquiry(null);
          }}
        />
      )}

      {showEditModal && selectedEnquiry && (
        <EditModal
          enquiry={selectedEnquiry}
          onClose={() => {
            setShowEditModal(false);
            setSelectedEnquiry(null);
          }}
          onSave={(id, data) => {
            if (data.status === 'Addressed') {
              handleStatusUpdate(id, data.status);
            }
            if (data.outcome) {
              handleOutcomeUpdate(id, data.outcome);
            }
          }}
        />
      )}
    </AdminLayout>
  );
};

export default AdminEnquiries;
