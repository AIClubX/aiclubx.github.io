import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import ContributorTable from '../../../components/admin/ContributorTable';
import ContributorForm from '../../../components/admin/ContributorForm';
import { getContributors, createContributor, updateContributor, deleteContributor } from '../../../services/contributors';
import type { Contributor } from '../../../types';

export default function ContributorsManager() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContributor, setEditingContributor] = useState<Contributor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContributors();
  }, []);

  const loadContributors = async () => {
    try {
      const data = await getContributors();
      setContributors(data);
    } catch (err) {
      setError('Failed to load contributors');
      console.error('Error loading contributors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (contributor: Contributor) => {
    setEditingContributor(contributor);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this contributor?')) {
      return;
    }

    try {
      await deleteContributor(id);
      setContributors(contributors.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting contributor:', err);
      alert('Failed to delete contributor');
    }
  };

  const handleSave = async (contributorData: Omit<Contributor, 'id'>) => {
    try {
      if (editingContributor) {
        const updated = await updateContributor(editingContributor.id, contributorData);
        setContributors(contributors.map(c => 
          c.id === editingContributor.id ? updated : c
        ));
      } else {
        const created = await createContributor(contributorData);
        setContributors([...contributors, created]);
      }
      setIsFormOpen(false);
      setEditingContributor(null);
    } catch (err) {
      console.error('Error saving contributor:', err);
      alert('Failed to save contributor');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Wall of Fame</h1>
        <button 
          onClick={() => {
            setEditingContributor(null);
            setIsFormOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Contributor
        </button>
      </div>

      <ContributorTable
        contributors={contributors}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <ContributorForm
          contributor={editingContributor}
          onSave={handleSave}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingContributor(null);
          }}
        />
      )}
    </div>
  );
}