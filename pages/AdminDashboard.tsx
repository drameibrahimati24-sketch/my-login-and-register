import React, { useEffect, useState } from 'react';
import { Job, User, UserRole } from '../types';
import * as mockDb from '../services/mockDb';
import * as geminiService from '../services/geminiService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Sparkles, Users, Briefcase, X, Save } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'jobs' | 'users'>('jobs');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [newJob, setNewJob] = useState<Partial<Job>>({
    title: '', company: '', location: '', salaryRange: '', type: 'Full-time', summary: '', description: '', requirements: []
  });
  const [reqInput, setReqInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!user || user.role !== UserRole.ADMIN) {
      navigate('/');
      return;
    }
    setJobs(mockDb.getJobs());
    setUsers(mockDb.getUsers());
  }, [user, navigate]);

  const handleDeleteJob = (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      const updatedJobs = jobs.filter(j => j.id !== id);
      setJobs(updatedJobs);
      mockDb.saveJobs(updatedJobs);
    }
  };

  const handleGenerateDescription = async () => {
    if (!newJob.title || !newJob.company) {
      alert('Please enter a Job Title and Company Name first.');
      return;
    }
    setIsGenerating(true);
    try {
      const desc = await geminiService.generateJobDescription(newJob.title, newJob.company);
      setNewJob(prev => ({ ...prev, description: desc }));
    } catch (e) {
      alert('Failed to generate description');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddRequirement = () => {
    if (reqInput.trim()) {
      setNewJob(prev => ({ ...prev, requirements: [...(prev.requirements || []), reqInput.trim()] }));
      setReqInput('');
    }
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    const job: Job = {
      id: crypto.randomUUID(),
      title: newJob.title!,
      company: newJob.company!,
      location: newJob.location!,
      salaryRange: newJob.salaryRange!,
      type: newJob.type || 'Full-time',
      summary: newJob.summary || newJob.description?.slice(0, 150) + '...' || '',
      description: newJob.description!,
      requirements: newJob.requirements || [],
      postedDate: new Date().toISOString(),
      applicants: []
    };
    
    const updatedJobs = [job, ...jobs];
    setJobs(updatedJobs);
    mockDb.saveJobs(updatedJobs);
    setIsModalOpen(false);
    setNewJob({ title: '', company: '', location: '', salaryRange: '', type: 'Full-time', summary: '', description: '', requirements: [] });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage vacancies and user access</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Post New Job
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`${activeTab === 'jobs' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Active Listings
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`${activeTab === 'users' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Users className="w-4 h-4 mr-2" />
            Registered Users
          </button>
        </nav>
      </div>

      {activeTab === 'jobs' ? (
        <div className="bg-white shadow-sm rounded-lg border border-slate-200 overflow-hidden">
          <ul className="divide-y divide-slate-200">
            {jobs.map(job => (
              <li key={job.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">{job.title}</h3>
                    <div className="text-sm text-slate-500 mt-1">
                      {job.company} • {job.location} • Posted {new Date(job.postedDate).toLocaleDateString()}
                    </div>
                    <div className="mt-2 text-sm text-indigo-600 font-medium">
                      {job.applicants.length} Applicant(s)
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteJob(job.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
            {jobs.length === 0 && <li className="p-8 text-center text-slate-500">No active job listings.</li>}
          </ul>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg border border-slate-200 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {users.map(u => (
                <tr key={u.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{u.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">@{u.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${u.role === UserRole.ADMIN ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Active</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-5">
                   <h3 className="text-lg leading-6 font-medium text-slate-900" id="modal-title">Create New Vacancy</h3>
                   <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600"/></button>
                </div>
                
                <form id="create-job-form" onSubmit={handleCreateJob} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Job Title</label>
                      <input type="text" required value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Company</label>
                      <input type="text" required value={newJob.company} onChange={e => setNewJob({...newJob, company: e.target.value})} className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                      <label className="block text-sm font-medium text-slate-700">Location</label>
                      <input type="text" required value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Salary Range</label>
                      <input type="text" required value={newJob.salaryRange} onChange={e => setNewJob({...newJob, salaryRange: e.target.value})} className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2" />
                    </div>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-slate-700">Short Summary</label>
                     <input type="text" required value={newJob.summary} onChange={e => setNewJob({...newJob, summary: e.target.value})} className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-slate-700">Detailed Description</label>
                      <button 
                        type="button" 
                        onClick={handleGenerateDescription}
                        disabled={isGenerating}
                        className="text-xs flex items-center text-purple-600 hover:text-purple-800 font-medium"
                      >
                         <Sparkles className={`w-3 h-3 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
                         {isGenerating ? 'Generating...' : 'Auto-Generate with AI'}
                      </button>
                    </div>
                    <textarea 
                      required 
                      rows={6} 
                      value={newJob.description} 
                      onChange={e => setNewJob({...newJob, description: e.target.value})} 
                      className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 text-sm"
                      placeholder="Enter full job description..."
                    />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Requirements</label>
                     <div className="flex gap-2 mb-2">
                       <input 
                         type="text" 
                         value={reqInput} 
                         onChange={e => setReqInput(e.target.value)} 
                         className="flex-1 border border-slate-300 rounded-md shadow-sm p-2 text-sm" 
                         placeholder="Add a requirement"
                         onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRequirement())}
                        />
                       <button type="button" onClick={handleAddRequirement} className="px-3 py-2 bg-slate-100 text-slate-600 rounded-md text-sm hover:bg-slate-200">Add</button>
                     </div>
                     <div className="flex flex-wrap gap-2">
                       {newJob.requirements?.map((req, i) => (
                         <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                           {req}
                         </span>
                       ))}
                     </div>
                  </div>
                </form>
              </div>
              <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="submit" 
                  form="create-job-form"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Publish Job
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};