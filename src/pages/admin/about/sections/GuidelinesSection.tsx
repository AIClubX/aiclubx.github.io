import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import GuidelineForm from '../forms/GuidelineForm';

interface Guideline {
  id: string;
  title: string;
  content: string;
}

export default function GuidelinesSection() {
  const [guidelines, setGuidelines] = useState<Guideline[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGuideline, setEditingGuideline] = useState<Guideline | null>(null);

  const handleAddGuideline = () => {
    setEditingGuideline(null);
    setIsFormOpen(true);
  };

  const handleEdit = (guideline: Guideline) => {
    setEditingGuideline(guideline);
    setIsFormOpen(true);
  };

  const handleSave = async (data: { title: string; content: string }) => {
    try {
      if (editingGuideline) {
        // Update existing guideline
        const updatedGuideline = { ...data, id: editingGuideline.id };
        setGuidelines(guidelines => guidelines.map(g => g.id === editingGuideline.id ? updatedGuideline : g));
      } else {
        // Add new guideline
        const newGuideline = { ...data, id: crypto.randomUUID() };
        setGuidelines([...guidelines, newGuideline]);
      }
      setIsFormOpen(false);
      setEditingGuideline(null);
    } catch (error) {
      console.error('Failed to save guideline:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this guideline?')) {
      return;
    }

    try {
      setGuidelines(guidelines.filter(guideline => guideline.id !== id));
    } catch (error) {
      console.error('Failed to delete guideline:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Club Guidelines</h2>
        <button
          onClick={handleAddGuideline}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Guideline
        </button>
      </div>

      <div className="space-y-4">
        {guidelines.map((guideline) => (
          <div
            key={guideline.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{guideline.title}</h3>
                <div className="mt-2 prose prose-sm max-w-none text-gray-600">
                  {guideline.content}
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(guideline)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(guideline.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <GuidelineForm
          guideline={editingGuideline}
          onSave={handleSave}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingGuideline(null);
          }}
        />
      )}
    </div>
  );
}