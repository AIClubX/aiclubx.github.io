import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import ResourceTable from '../../../components/admin/ResourceTable';
import ResourceForm from '../../../components/forms/ResourceForm';
import { getResources } from '../../../services/resources';
import type { Resource } from '../../../types';

export default function LearningManager() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const allResources = await getResources();
      const learningResources = allResources.filter(resource => resource.type === 'learning');
      setResources(learningResources);
      setError(null);
    } catch (err) {
      setError('Failed to load learning resources');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) {
      return;
    }

    try {
      // TODO: Implement delete API call
      setResources(resources.filter(resource => resource.id !== id));
    } catch (error) {
      console.error('Failed to delete resource:', error);
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
        <h1 className="text-2xl font-semibold text-gray-900">Learning Resources</h1>
        <button
          onClick={() => {
            setEditingResource(null);
            setIsFormOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Resource
        </button>
      </div>

      <ResourceTable
        resources={resources}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <ResourceForm
          resource={editingResource}
          onSave={async (data) => {
            // TODO: Implement save API call
            if (editingResource) {
              setResources(resources.map(r => 
                r.id === editingResource.id ? { ...r, ...data } : r
              ));
            } else {
              setResources([...resources, { ...data, id: crypto.randomUUID() }]);
            }
            setIsFormOpen(false);
          }}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingResource(null);
          }}
        />
      )}
    </div>
  );
}