import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TextInput } from '../../../../components/common/TextInput';
import { TextArea } from '../../../../components/common/TextArea';
import { ImageUpload } from '../../../../components/common/ImageUpload';
import type { SuccessStory } from '../../../../types/about';

interface SuccessStoryFormProps {
  story?: SuccessStory | null;
  onSave: (data: Omit<SuccessStory, 'id'>) => void;
  onCancel: () => void;
}

export default function SuccessStoryForm({ story, onSave, onCancel }: SuccessStoryFormProps) {
  const [formData, setFormData] = useState({
    title: story?.title || '',
    description: story?.description || '',
    image: story?.image || '',
    date: story?.date || new Date().toISOString().split('T')[0],
    category: story?.category || 'member'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(formData as Omit<SuccessStory, 'id'>);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {story ? 'Edit Success Story' : 'Add Success Story'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Story Title"
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            required
          />

          <ImageUpload
            label="Cover Image"
            value={formData.image}
            onChange={(value) => setFormData({ ...formData, image: value })}
          />

          <TextArea
            label="Story Summary"
            value={formData.description}
            onChange={(value) => setFormData({ ...formData, description: value })}
            required
            rows={4}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as SuccessStory['category'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="member">Member Success</option>
              <option value="chapter">Chapter Achievement</option>
              <option value="project">Project Milestone</option>
              <option value="event">Event Highlight</option>
            </select>
          </div>

          <TextInput
            label="Date"
            type="date"
            value={formData.date}
            onChange={(value) => setFormData({ ...formData, date: value })}
            required
          />

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