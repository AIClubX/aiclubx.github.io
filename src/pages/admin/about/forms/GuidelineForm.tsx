import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TextInput } from '../../../../components/common/TextInput';
import { TextArea } from '../../../../components/common/TextArea';

interface GuidelineFormProps {
  guideline?: { id: string; title: string; content: string } | null;
  onSave: (data: { title: string; content: string }) => void;
  onCancel: () => void;
}

export default function GuidelineForm({ guideline, onSave, onCancel }: GuidelineFormProps) {
  const [formData, setFormData] = useState({
    title: guideline?.title || '',
    content: guideline?.content || ''
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
            {guideline ? 'Edit Guideline' : 'Add Guideline'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Guideline Title"
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            required
          />

          <TextArea
            label="Guideline Content"
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            required
            rows={6}
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