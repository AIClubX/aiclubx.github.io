import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import type { Chapter } from '../../../types';
import { createChapter, updateChapter } from '../../../services/chapters';

interface ChapterFormProps {
  chapter?: Chapter | null;
  onSave: (chapter: Chapter) => void;
  onCancel: () => void;
}

export default function ChapterForm({ chapter, onSave, onCancel }: ChapterFormProps) {
  const [formData, setFormData] = useState({
    name: chapter?.name || '',
    university: chapter?.university || '',
    location: chapter?.location || '',
    logo: chapter?.logo || '',
    showMemberCount: chapter?.showMemberCount ?? true,
    chapterHead: {
      name: chapter?.chapterHead.name || '',
      bio: chapter?.chapterHead.bio || '',
      image: chapter?.chapterHead.image || '',
      email: chapter?.chapterHead.email || '',
      phone: chapter?.chapterHead.phone || ''
    },
    coreTeam: chapter?.coreTeam || []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = chapter
        ? await updateChapter(chapter.id, formData)
        : await createChapter(formData);
      onSave(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save chapter');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addCoreTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      coreTeam: [
        ...prev.coreTeam,
        {
          id: crypto.randomUUID(),
          name: '',
          role: '',
          classYear: '',
          image: ''
        }
      ]
    }));
  };

  const removeCoreTeamMember = (id: string) => {
    setFormData(prev => ({
      ...prev,
      coreTeam: prev.coreTeam.filter(member => member.id !== id)
    }));
  };

  const updateCoreTeamMember = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      coreTeam: prev.coreTeam.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {chapter ? 'Edit Chapter' : 'Add New Chapter'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chapter Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                University
              </label>
              <input
                type="text"
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chapter Logo URL
              </label>
              <input
                type="url"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showMemberCount"
              checked={formData.showMemberCount}
              onChange={(e) => setFormData({ ...formData, showMemberCount: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="showMemberCount" className="ml-2 block text-sm text-gray-900">
              Show member count publicly
            </label>
          </div>

          {/* Chapter Head Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Chapter Head Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.chapterHead.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    chapterHead: { ...formData.chapterHead, name: e.target.value }
                  })}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.chapterHead.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    chapterHead: { ...formData.chapterHead, email: e.target.value }
                  })}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                value={formData.chapterHead.bio}
                onChange={(e) => setFormData({
                  ...formData,
                  chapterHead: { ...formData.chapterHead, bio: e.target.value }
                })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  value={formData.chapterHead.image}
                  onChange={(e) => setFormData({
                    ...formData,
                    chapterHead: { ...formData.chapterHead, image: e.target.value }
                  })}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.chapterHead.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    chapterHead: { ...formData.chapterHead, phone: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Core Team Members */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Core Team Members</h3>
              <button
                type="button"
                onClick={addCoreTeamMember}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Member
              </button>
            </div>

            <div className="space-y-4">
              {formData.coreTeam.map((member, index) => (
                <div key={member.id} className="flex items-start space-x-4">
                  <div className="flex-grow grid grid-cols-4 gap-4">
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateCoreTeamMember(member.id, 'name', e.target.value)}
                      placeholder="Name"
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => updateCoreTeamMember(member.id, 'role', e.target.value)}
                      placeholder="Role"
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      value={member.classYear}
                      onChange={(e) => updateCoreTeamMember(member.id, 'classYear', e.target.value)}
                      placeholder="Class Year"
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <input
                      type="url"
                      value={member.image || ''}
                      onChange={(e) => updateCoreTeamMember(member.id, 'image', e.target.value)}
                      placeholder="Image URL"
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCoreTeamMember(member.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

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