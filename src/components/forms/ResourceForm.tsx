import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TextInput } from '../common/TextInput';
import { TextArea } from '../common/TextArea';
import type { Resource } from '../../types';

interface ResourceFormProps {
  resource?: Resource | null;
  onSave: (data: Omit<Resource, 'id'>) => void;
  onCancel: () => void;
}

export default function ResourceForm({ resource, onSave, onCancel }: ResourceFormProps) {
  const [formData, setFormData] = useState({
    title: resource?.title || '',
    description: resource?.description || '',
    type: resource?.type || 'learning',
    link: resource?.link || '',
    company: resource?.company || '',
    deadline: resource?.deadline ? new Date(resource.deadline).toISOString().split('T')[0] : ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {resource ? 'Edit Resource' : 'Add Resource'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Title"
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            required
          />

          <TextArea
            label="Description"
            value={formData.description}
            onChange={(value) => setFormData({ ...formData, description: value })}
            required
            rows={3}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="learning">Learning Resource</option>
              <option value="project">Project</option>
              <option value="job">Job Opportunity</option>
            </select>
          </div>

          <TextInput
            label="Link"
            type="url"
            value={formData.link}
            onChange={(value) => setFormData({ ...formData, link: value })}
            required
          />

          {formData.type === 'job' && (
            <>
              <TextInput
                label="Company"
                value={formData.company}
                onChange={(value) => setFormData({ ...formData, company: value })}
              />

              <TextInput
                label="Application Deadline"
                type="date"
                value={formData.deadline}
                onChange={(value) => setFormData({ ...formData, deadline: value })}
              />
            </>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}