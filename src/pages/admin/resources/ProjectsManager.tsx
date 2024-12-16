import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ResourceTable from '../../../components/admin/ResourceTable';
import type { Resource } from '../../../types';

// Sample data - would come from API in real app
const initialProjects: Resource[] = [
  {
    id: '1',
    title: 'AI Image Recognition System',
    type: 'project',
    description: 'Open source project for developing an advanced image recognition system',
    link: 'https://github.com/example/ai-vision',
  },
  {
    id: '2',
    title: 'NLP Research Project',
    type: 'project',
    description: 'Collaborative research project on natural language processing',
    link: 'https://github.com/example/nlp-research',
  }
];

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Resource[]>(initialProjects);

  const handleEdit = (project: Resource) => {
    // Implement edit functionality
    console.log('Edit project:', project);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Open Projects</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-5 w-5 mr-2" />
          Add Project
        </button>
      </div>

      <ResourceTable
        resources={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}