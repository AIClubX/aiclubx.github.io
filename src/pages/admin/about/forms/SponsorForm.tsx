import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TextInput } from '../../../../components/common/TextInput';
import { TextArea } from '../../../../components/common/TextArea';
import { ImageUpload } from '../../../../components/common/ImageUpload';
import type { Sponsor } from '../../../../types/about';

interface SponsorFormProps {
  sponsor?: Sponsor | null;
  onSave: (data: Omit<Sponsor, 'id'>) => void;
  onCancel: () => void;
}

export default function SponsorForm({ sponsor, onSave, onCancel }: SponsorFormProps) {
  const [formData, setFormData] = useState({
    name: sponsor?.name || '',
    logo: sponsor?.logo || '',
    website: sponsor?.website || '',
    description: sponsor?.description || '',
    tier: sponsor?.tier || 'silver'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(formData as Omit<Sponsor, 'id'>);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {sponsor ? 'Edit Sponsor' : 'Add Sponsor'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Organization Name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            required
          />

          <ImageUpload
            label="Logo"
            value={formData.logo}
            onChange={(value) => setFormData({ ...formData, logo: value })}
            required
          />

          <TextInput
            label="Website URL"
            type="url"
            value={formData.website}
            onChange={(value) => setFormData({ ...formData, website: value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sponsorship Tier
            </label>
            <select
              value={formData.tier}
              onChange={(e) => setFormData({ ...formData, tier: e.target.value as Sponsor['tier'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="platinum">Platinum</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
            </select>
          </div>

          <TextArea
            label="Description"
            value={formData.description}
            onChange={(value) => setFormData({ ...formData, description: value })}
            required
            rows={4}
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