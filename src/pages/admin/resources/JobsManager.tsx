import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ResourceTable from '../../../components/admin/ResourceTable';
import type { Resource } from '../../../types';

// Sample data - would come from API in real app
const initialJobs: Resource[] = [
  {
    id: '1',
    title: 'AI Research Intern',
    type: 'job',
    description: 'Summer internship position for ML research',
    link: 'https://example.com/jobs/1',
    company: 'TechCorp',
    deadline: '2024-05-01'
  },
  {
    id: '2',
    title: 'Machine Learning Engineer',
    type: 'job',
    description: 'Full-time position for experienced ML engineers',
    link: 'https://example.com/jobs/2',
    company: 'AI Solutions Inc',
    deadline: '2024-04-15'
  }
];

export default function JobsManager() {
  const [jobs, setJobs] = useState<Resource[]>(initialJobs);

  const handleEdit = (job: Resource) => {
    // Implement edit functionality
    console.log('Edit job:', job);
  };

  const handleDelete = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Job Opportunities</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-5 w-5 mr-2" />
          Add Job
        </button>
      </div>

      <ResourceTable
        resources={jobs}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}