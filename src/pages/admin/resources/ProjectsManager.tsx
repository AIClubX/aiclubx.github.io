import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import ResourceTable from '../../../components/admin/ResourceTable';
import ResourceForm from '../../../components/forms/ResourceForm';
import { getResources } from '../../../services/resources';
import type { Resource } from '../../../types';

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Resource[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const resources = await getResources();
      const projectResources = resources.filter(resource => resource.type === 'project');
      setProjects(projectResources);
      setError(null);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Resource) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      // TODO: Implement delete API call
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Open Projects</h1>
        <button
          onClick={() => {
            setEditingProject(null);
            setIsFormOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Project
        </button>
      </div>

      <ResourceTable
        resources={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <ResourceForm
          resource={editingProject}
          onSave={async (data) => {
            // TODO: Implement save API call
            if (editingProject) {
              setProjects(projects.map(p => 
                p.id === editingProject.id ? { ...p, ...data } : p
              ));
            } else {
              setProjects([...projects, { ...data, id: crypto.randomUUID() }]);
            }
            setIsFormOpen(false);
          }}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingProject(null);
          }}
        />
      )}
    </div>
  );
}