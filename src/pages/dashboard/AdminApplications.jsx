import { useState, useEffect } from 'react';
import { 
  EyeIcon, 
  PencilIcon, 
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import AdminLayout from '../../components/AdminLayout';
import { useToast } from '../../components/ui/Toast';
import { Client, Databases, Query } from 'appwrite';
import { appwriteDatabaseId, appwriteApplicationCollectionId, appwriteEndpoint, appwriteProjectId } from '../../data/config';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    course: '',
    status: '',
    interest: '',
    outcome: ''
  });
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { showToast } = useToast();

  const courses = [
    '9th & 10th Foundation',
    '11th & 12th Science (PCMB)',
    'IIT-JEE Preparation',
    'NEET-UG Preparation',
    'MHT-CET Preparation',
    'Foundation Course (6th-8th)',
    'NDA Preparation'
  ];

  const statuses = ['Pending', 'Addressed'];
  const mapOutcomes = {
    'Converted to Admission': 'ConvertedToAdmission',
    'Lost the Student': 'LostTheStudent',
    'Follow-up Required': 'FollowUpRequired',
    'Custom': 'Custom'
  };

  const outcomes = Object.keys(mapOutcomes);
  const mapInterests = {
    'Interested': 'Interested',
    'Not Interested': 'NotInterested',
    'Custom': 'Custom'
  };
  const interests = Object.keys(mapInterests);

  useEffect(() => {
    fetchApplications();
  }, [currentPage, filters]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const client = new Client()
          .setEndpoint(appwriteEndpoint)    
          .setProject(appwriteProjectId);

      const databases = new Databases(client);
      
      const pageSize = 10;
      const queries = [
        Query.limit(pageSize),
        Query.offset((currentPage - 1) * pageSize)
      ];

      if (filters.course) queries.push(Query.equal("course", filters.course));
      if (filters.status) queries.push(Query.equal("status", filters.status));
      if (filters.interest) queries.push(Query.equal("interest", filters.interest));
      if (filters.outcome) queries.push(Query.equal("outcome", filters.outcome));

      const response = await databases.listDocuments(
        appwriteDatabaseId,
        appwriteApplicationCollectionId,
        queries
      );

      setApplications(response.documents);
      setTotalPages(Math.ceil(response.total / pageSize)); 
    } catch (err) {
      showToast("Failed to fetch applications", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      // TODO: Implement API call to update status
      const client = new Client()
          .setEndpoint(appwriteEndpoint)    
          .setProject(appwriteProjectId);

      const databases = new Databases(client);

      const response = await databases.updateDocument(
        appwriteDatabaseId,
        appwriteApplicationCollectionId,
        applicationId,
        { status: newStatus }
      );
      if (response) {
        showToast('Status updated successfully', 'success');
      } else {
        showToast('Failed to update status || if else logic', 'error');
      }
      setApplications(prev => prev.map(app => 
        app.$id === applicationId 
          ? { ...app, status: newStatus }
          : app
      ));
    } catch (error) {
      showToast('Failed to update status || catch block', 'error');
      console.log(error);
    }
  };

  const handleInterestUpdate = async (applicationId, newInterest) => {
    try {
      // TODO: Implement API call to update interest
      const client = new Client()
          .setEndpoint(appwriteEndpoint)    
          .setProject(appwriteProjectId);

      const databases = new Databases(client);

      const response = await databases.updateDocument(
        appwriteDatabaseId,
        appwriteApplicationCollectionId,
        applicationId,
        { interest: mapInterests[newInterest] }
      );
      if (response) {
        showToast('Interest updated successfully', 'success');
      } else {
        showToast('Failed to update interest || if else logic', 'error');
      }
      setApplications(prev => prev.map(app => 
        app.$id === applicationId ? { ...app, interest: mapInterests[newInterest] } : app
      ));
    } catch (error) {
      showToast('Failed to update interest || catch block', 'error');
      console.log(error);
    }
  };

  const handleOutcomeUpdate = async (applicationId, newOutcome) => {
    try {
      // TODO: Implement API call to update outcome
      const client = new Client()
          .setEndpoint(appwriteEndpoint)    
          .setProject(appwriteProjectId);

      const databases = new Databases(client);

      const response = await databases.updateDocument(
        appwriteDatabaseId,
        appwriteApplicationCollectionId,
        applicationId,
        { outcome: mapOutcomes[newOutcome] }
      );
      if (response) {
        showToast('Outcome updated successfully', 'success');
      } else {
        showToast('Failed to update outcome || if else logic', 'error');
      }
      setApplications(prev => prev.map(app => 
        app.$id === applicationId ? { ...app, outcome: mapOutcomes[newOutcome] } : app
      ));
    } catch (error) {
      showToast('Failed to update outcome || catch block', 'error');
      console.log(error);
    }
  };



  const ViewModal = ({ application, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/90 backdrop-blur-md border border-neon-blue rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-light-text">Application Details</h2>
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
                <p className="text-light-text font-medium">{application.name}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Phone</label>
                <p className="text-light-text font-medium">{application.phone}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Email</label>
                <p className="text-light-text font-medium">{application.email}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Course</label>
                <p className="text-light-text font-medium">{application.course}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Status</label>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  application.status === 'Pending' 
                    ? 'bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/30' 
                    : 'bg-neon-green/20 text-neon-green border border-neon-green/30'
                }`}>
                  {application.status}
                </span>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Interest Level</label>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  application.interest === mapInterests['Interested']
                    ? 'bg-neon-green/20 text-neon-green border border-neon-green/30'
                    : application.interest === mapInterests['Not Interested']
                    ? 'bg-neon-red/20 text-neon-red border border-neon-red/30'
                    : 'bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/30'
                }`}>
                  {application.interest}
                </span>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Date</label>
                 <p className="text-light-text font-medium">{new Date(application.$createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Outcome</label>
                <p className="text-light-text font-medium">{application.outcome || 'Not specified'}</p>
              </div>
            </div>
            
            <div>
              <label className="text-gray-400 text-sm">Message</label>
              <p className="text-light-text mt-1 bg-black/30 p-3 rounded border border-neon-blue/30">
                {application.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const EditModal = ({ application, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      status: application.status,
      interest: application.interest,
      outcome: application.outcome || ''
    });

    const handleSave = () => {
              onSave(application.$id, formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-black/90 backdrop-blur-md border border-neon-blue rounded-lg max-w-md w-full">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-light-text">Edit Application</h2>
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
                <label className="text-gray-400 text-sm">Interest Level</label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData(prev => ({ ...prev, interest: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 bg-black/30 border border-neon-blue/50 rounded text-light-text focus:border-neon-cyan focus:outline-none"
                >
                  {interests.map(interest => (
                    <option key={interest} value={interest}>{interest}</option>
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
          <h1 className="text-3xl font-bold text-light-text">Applications Management</h1>
          <p className="text-gray-400 mt-2">Manage and process student applications</p>
        </div>

        {/* Filters */}
        <div className="bg-black/40 backdrop-blur-md border border-neon-blue/30 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-gray-400 text-sm font-medium mb-2 block">Course</label>
              <select
                value={filters.course}
                onChange={(e) => setFilters(prev => ({ ...prev, course: e.target.value }))}
                className="w-full px-3 py-2 bg-black/30 border border-neon-blue/50 rounded text-light-text focus:border-neon-cyan focus:outline-none"
              >
                <option value="">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
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
              <label className="text-gray-400 text-sm font-medium mb-2 block">Interest</label>
              <select
                value={filters.interest}
                onChange={(e) => setFilters(prev => ({ ...prev, interest: e.target.value }))}
                className="w-full px-3 py-2 bg-black/30 border border-neon-blue/50 rounded text-light-text focus:border-neon-cyan focus:outline-none"
              >
                <option value="">All Interest Levels</option>
                {interests.map(interest => (
                  <option key={interest} value={interest}>{interest}</option>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Interest</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neon-blue/20">
                                 {applications.map((application) => (
                  <tr key={application.$id} className="hover:bg-neon-blue/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-light-text">{application.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-light-text">{application.phone}</div>
                      <div className="text-sm text-gray-400">{application.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-light-text">{application.course}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-400 max-w-xs truncate">
                        {application.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        application.status === 'Pending' 
                          ? 'bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/30' 
                          : 'bg-neon-green/20 text-neon-green border border-neon-green/30'
                      }`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        application.interest === 'Interested' 
                          ? 'bg-neon-green/20 text-neon-green border border-neon-green/30'
                          : application.interest === 'Not Interested'
                          ? 'bg-neon-red/20 text-neon-red border border-neon-red/30'
                          : 'bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/30'
                      }`}>
                        {application.interest}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                       {new Date(application.$createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setShowViewModal(true);
                          }}
                          className="text-neon-blue hover:text-neon-cyan transition-colors"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setShowEditModal(true);
                          }}
                          className="text-neon-cyan hover:text-neon-blue transition-colors"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        {application.status === 'Pending' && (
                          <button
                            onClick={() => handleStatusUpdate(application.$id, 'Addressed')}
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
             Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, applications.length)} of {applications.length} results
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
      {showViewModal && selectedApplication && (
        <ViewModal
          application={selectedApplication}
          onClose={() => {
            setShowViewModal(false);
            setSelectedApplication(null);
          }}
        />
      )}

      {showEditModal && selectedApplication && (
        <EditModal
          application={selectedApplication}
          onClose={() => {
            setShowEditModal(false);
            setSelectedApplication(null);
          }}
          onSave={(id, data) => {
            if (data.status === 'Addressed') {
              handleStatusUpdate(id, data.status);
            }
            if (data.interest) {
              handleInterestUpdate(id, data.interest);
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

export default AdminApplications;
