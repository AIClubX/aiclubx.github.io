import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Advisor } from '../../../../types/about';
import AdvisorForm from '../forms/AdvisorForm';

export default function AdvisorsSection() {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAdvisor, setEditingAdvisor] = useState<Advisor | null>(null);

  const handleAddAdvisor = () => {
    setEditingAdvisor(null);
    setIsFormOpen(true);
  };

  const handleEdit = (advisor: Advisor) => {
    setEditingAdvisor(advisor);
    setIsFormOpen(true);
  };

  const handleSave = async (data: Omit<Advisor, 'id'>) => {
    try {
      if (editingAdvisor) {
        // Update existing advisor
        const updatedAdvisor = { ...data, id: editingAdvisor.id };
        setAdvisors(advisors.map(a => a.id === editingAdvisor.id ? updatedAdvisor : a));
      } else {
        // Add new advisor
        const newAdvisor = { ...data, id: crypto.randomUUID() };
        setAdvisors([...advisors, newAdvisor]);
      }
      setIsFormOpen(false);
      setEditingAdvisor(null);
    } catch (error) {
      console.error('Failed to save advisor:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this advisor?')) {
      return;
    }

    try {
      // TODO: Implement delete API call
      setAdvisors(advisors.filter(advisor => advisor.id !== id));
    } catch (error) {
      console.error('Failed to delete advisor:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Advisors</h2>
        <button
          onClick={handleAddAdvisor}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Advisor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advisors.map((advisor) => (
          <div
            key={advisor.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={advisor.image}
              alt={advisor.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{advisor.name}</h3>
              <p className="text-sm text-gray-500">{advisor.title}</p>
              <p className="text-sm text-gray-500">{advisor.organization}</p>
              <p className="mt-2 text-sm text-gray-600">{advisor.bio}</p>
              {advisor.linkedIn && (
                <a
                  href={advisor.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center text-indigo-600 hover:text-indigo-500"
                >
                  LinkedIn Profile
                </a>
              )}
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(advisor)}
                  className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(advisor.id)}
                  className="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <AdvisorForm
          advisor={editingAdvisor}
          onSave={handleSave}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingAdvisor(null);
          }}
        />
      )}
    </div>
  );
}