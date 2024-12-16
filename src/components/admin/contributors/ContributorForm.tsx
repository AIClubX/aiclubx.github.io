import React, { useState } from 'react';
import type { Contributor } from '../../../types';
import { ImageInput } from '../../common/ImageInput';
import { DateRangeInputs } from '../../common/DateRangeInputs';
import { TextArea } from '../../common/TextArea';
import { TextInput } from '../../common/TextInput';
import { Checkbox } from '../../common/Checkbox';

interface ContributorFormProps {
  contributor?: Contributor | null;
  onSave: (contributor: Omit<Contributor, 'id'>) => void;
  onCancel: () => void;
}

export default function ContributorForm({ contributor, onSave, onCancel }: ContributorFormProps) {
  const [formData, setFormData] = useState({
    name: contributor?.name || '',
    title: contributor?.title || '',
    bio: contributor?.bio || '',
    image: contributor?.image || '',
    featured: contributor?.featured || false,
    startDate: contributor?.startDate || new Date().toISOString().split('T')[0],
    endDate: contributor?.endDate || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-xl font-semibold mb-4">
          {contributor ? 'Edit Contributor' : 'Add New Contributor'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            required
          />

          <TextInput
            label="Title"
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            required
          />

          <TextArea
            label="Bio"
            value={formData.bio}
            onChange={(value) => setFormData({ ...formData, bio: value })}
            required
          />

          <ImageInput
            label="Profile Image"
            value={formData.image}
            onChange={(value) => setFormData({ ...formData, image: value })}
            required
          />

          <DateRangeInputs
            startDate={formData.startDate}
            endDate={formData.endDate}
            onStartDateChange={(value) => setFormData({ ...formData, startDate: value })}
            onEndDateChange={(value) => setFormData({ ...formData, endDate: value })}
          />

          <Checkbox
            label="Featured on Wall of Fame"
            checked={formData.featured}
            onChange={(checked) => setFormData({ ...formData, featured: checked })}
          />

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}