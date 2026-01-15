import React from 'react';
import { Job } from '../types';
import { Link } from 'react-router-dom';
import { MapPin, Building, DollarSign, Clock } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const postedDate = new Date(job.postedDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white overflow-hidden rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <div className="flex items-center mt-1 text-slate-600">
              <Building className="w-4 h-4 mr-1.5" />
              <span className="text-sm font-medium">{job.company}</span>
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
            {job.type}
          </span>
        </div>

        <p className="text-slate-600 text-sm mb-6 line-clamp-2">
          {job.summary}
        </p>

        <div className="grid grid-cols-2 gap-y-2 mb-6 text-sm text-slate-500">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-slate-400" />
            {job.location}
          </div>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-slate-400" />
            {job.salaryRange}
          </div>
          <div className="flex items-center col-span-2">
            <Clock className="w-4 h-4 mr-2 text-slate-400" />
            Posted {postedDate}
          </div>
        </div>

        <Link
          to={`/job/${job.id}`}
          className="block w-full text-center px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};