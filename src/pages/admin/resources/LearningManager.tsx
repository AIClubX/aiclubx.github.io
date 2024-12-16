import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ResourceTable from '../../../components/admin/ResourceTable';
import type { Resource } from '../../../types';

// Sample data - would come from API in real app
const initialResources: Resource[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    type: 'learning',
    description: 'Comprehensive course covering ML fundamentals',
    link: 'https://example.com/courses/ml-intro',
  },
  {
    id: '2',
    title: 'Deep Learning Specialization',
    type: 'learning',
    description: 'Advanced deep learning concepts and implementations',
    link: 'https://example.com/courses/deep-learning',
  }
];

export default function LearningManager() {
  const [resources, setResources] = useState<Resource[]>(initialResources);

  const handleEdit = (resource: Resource) => {
    // Implement edit functionality
    console.log('Edit resource:', resource);
  };

  const handleDelete = (id: string) => {
    setResources(resources.filter(resource => resource.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Learning Resources</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-5 w-5 mr-2" />
          Add Resource
        </button>
      </div>

      <ResourceTable
        resources={resources}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}