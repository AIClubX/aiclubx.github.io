import React, { useState, useEffect } from 'react';
import { Code, ExternalLink, Plus } from 'lucide-react';
import { useResourceStore } from '../../stores/resourceStore';
import type { Resource } from '../../types';
import PageHeader from '../../components/navigation/PageHeader';
import ResourceForm from '../../components/forms/ResourceForm';

export default function OpenProjects() {
  const { resources, isLoading, error, fetchResources, addResource } = useResourceStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  // Ensure resources is an array before filtering
  const projects = Array.isArray(resources) 
    ? resources.filter(resource => resource.type === 'project')
    : [];

  const handleAddProject = async (data: Omit<Resource, 'id'>) => {
    try {
      await addResource({
        ...data,
        type: 'project'
      });
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to add project:', error);
    }
  };

  if (isLoading) {
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
        title="Open Projects" 
        backTo="/resources"
        backLabel="Back to Resources"
      />
      
      <div className="mb-6">
        <button
          onClick={() => {
            setEditingResource(null);
            setIsFormOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Project
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {project.title}
                </h3>
                <Code className="h-5 w-5 text-indigo-600" />
              </div>
              
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="flex items-center justify-between mt-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
                >
                  View Project
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full text-center text-gray-500 bg-white rounded-lg shadow-md p-8">
            <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p>No open projects available at the moment.</p>
          </div>
        )}
      </div>

      {isFormOpen && (
        <ResourceForm
          resource={editingResource}
          onSave={handleAddProject}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingResource(null);
          }}
        />
      )}
    </div>
  );
}