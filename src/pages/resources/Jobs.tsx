import React, { useState, useEffect } from 'react';
import { Calendar, Building2, ExternalLink } from 'lucide-react';
import { getResources } from '../../services/resources';
import type { Resource } from '../../types';
import PageHeader from '../../components/navigation/PageHeader';

export default function Jobs() {
  const [jobs, setJobs] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const resources = await getResources();
      const jobResources = resources.filter(resource => resource.type === 'job');
      setJobs(jobResources);
    } catch (err) {
      setError('Failed to load job opportunities');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PageHeader 
        title="Job Opportunities" 
        backTo="/resources"
        backLabel="Back to Resources"
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {job.title}
              </h3>
              
              {job.company && (
                <div className="flex items-center text-gray-600 mb-2">
                  <Building2 className="h-4 w-4 mr-2" />
                  <span>{job.company}</span>
                </div>
              )}
              
              {job.deadline && (
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              )}
              
              <p className="text-gray-600 mb-4">{job.description}</p>
              
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
              >
                View Details
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        ))}

        {jobs.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No job opportunities available at the moment.
          </div>
        )}
      </div>
    </div>
  );
}