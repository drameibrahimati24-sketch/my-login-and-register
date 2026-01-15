import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Job, UserRole } from '../types';
import * as mockDb from '../services/mockDb';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, AlertCircle, Building, MapPin, DollarSign, Calendar, ArrowLeft, FileText } from 'lucide-react';

export const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate Fetch
    setTimeout(() => {
      const jobs = mockDb.getJobs();
      const foundJob = jobs.find(j => j.id === id);
      if (foundJob) {
        setJob(foundJob);
        if (user && foundJob.applicants.includes(user.id)) {
          setHasApplied(true);
        }
      }
      setLoading(false);
    }, 400);
  }, [id, user]);

  const handleApply = async () => {
    if (!job || !user) return;
    
    // Optimistic update
    const updatedApplicants = [...job.applicants, user.id];
    const updatedJob = { ...job, applicants: updatedApplicants };
    
    setJob(updatedJob);
    setHasApplied(true);

    // Persist
    const allJobs = mockDb.getJobs();
    const jobIndex = allJobs.findIndex(j => j.id === job.id);
    if (jobIndex !== -1) {
      allJobs[jobIndex] = updatedJob;
      mockDb.saveJobs(allJobs);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 text-center bg-white rounded-xl shadow-lg border border-slate-100">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
          <AlertCircle className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Member Access Required</h2>
        <p className="text-slate-600 mb-8">You must be logged in to view job details and apply.</p>
        <div className="flex gap-4 justify-center">
           <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">Sign In</Link>
           <Link to="/register" className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors">Create Account</Link>
        </div>
      </div>
    );
  }

  if (loading) return <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  if (!job) return <div className="text-center mt-20 text-slate-500">Job not found</div>;

  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Jobs
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-600">
                <div className="flex items-center"><Building className="w-4 h-4 mr-1.5"/> {job.company}</div>
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-1.5"/> {job.location}</div>
                <div className="flex items-center"><Calendar className="w-4 h-4 mr-1.5"/> Posted {new Date(job.postedDate).toLocaleDateString()}</div>
              </div>
            </div>
            {!isAdmin && (
               hasApplied ? (
                <div className="flex flex-col items-end">
                  <button disabled className="flex items-center px-6 py-3 bg-green-100 text-green-700 rounded-lg font-medium cursor-default mb-2">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Applied
                  </button>
                  <span className="text-xs text-slate-500">
                    Application received on {new Date().toLocaleDateString()}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-end">
                  <button 
                    onClick={handleApply}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Apply Now
                  </button>
                  <div className="mt-2 text-right">
                    {user?.resumeData ? (
                       <span className="flex items-center text-xs text-green-600">
                         <CheckCircle className="w-3 h-3 mr-1" />
                         Apply with {user.resumeName || 'Profile Resume'}
                       </span>
                    ) : (
                       <Link to="/profile" className="flex items-center text-xs text-amber-600 hover:underline">
                         <AlertCircle className="w-3 h-3 mr-1" />
                         Upload resume to your profile
                       </Link>
                    )}
                  </div>
                </div>
              )
            )}
            {isAdmin && (
                <div className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg font-medium text-sm">
                    Admin View
                </div>
            )}
          </div>
        </div>

        <div className="p-8">
          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Job Summary</h2>
            <p className="text-slate-600 leading-relaxed">{job.summary}</p>
          </section>

          <section className="mb-8">
             <div className="flex items-center mb-4">
                 <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                 <span className="text-lg font-semibold text-slate-900">{job.salaryRange}</span>
             </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Full Description</h2>
            <div className="prose prose-slate max-w-none text-slate-600">
              <p className="whitespace-pre-line">{job.description}</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Requirements</h2>
            <ul className="grid gap-2">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-600 mt-2.5 mr-3"></span>
                  <span className="text-slate-600">{req}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};