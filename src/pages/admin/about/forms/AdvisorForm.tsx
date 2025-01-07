import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TextInput } from '../../../../components/common/TextInput';
import { TextArea } from '../../../../components/common/TextArea';
import { ImageUpload } from '../../../../components/common/ImageUpload';
import type { Advisor } from '../../../../types/about';

interface AdvisorFormProps {
  advisor?: Advisor | null;
  onSave: (data: Omit<Advisor, 'id'>) => void;
  onCancel: () => void;
}

export default function AdvisorForm({ advisor, onSave, onCancel }: AdvisorFormProps) {
  const [formData, setFormData] = useState({
    name: advisor?.name || '',
    title: advisor?.title || '',
    organization: advisor?.organization || '',
    bio: advisor?.bio || '',
    image: advisor?.image || '',
    linkedIn: advisor?.linkedIn || ''
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
            {advisor ? 'Edit Advisor' : 'Add Advisor'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

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

          <TextInput
            label="Organization/Company"
            value={formData.organization}
            onChange={(value) => setFormData({ ...formData, organization: value })}
            required
          />

          <ImageUpload
            label="Profile Image"
            value={formData.image}
            onChange={(value) => setFormData({ ...formData, image: value })}
            required
          />

          <TextArea
            label="Bio"
            value={formData.bio}
            onChange={(value) => setFormData({ ...formData, bio: value })}
            required
            rows={4}
          />

          <TextInput
            label="LinkedIn Profile URL"
            type="url"
            value={formData.linkedIn}
            onChange={(value) => setFormData({ ...formData, linkedIn: value })}
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