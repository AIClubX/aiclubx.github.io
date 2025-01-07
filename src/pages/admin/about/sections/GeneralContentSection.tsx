import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { TextInput } from '../../../../components/common/TextInput';
import { TextArea } from '../../../../components/common/TextArea';
import { ImageUpload } from '../../../../components/common/ImageUpload';

export default function GeneralContentSection() {
  const [formData, setFormData] = useState({
    heroTagline: 'Build Intelligence X with AI – A Supermind Community',
    heroMission: 'Be empowered, not overpowered by AI',
    heroBackgroundImage: '',
    visionStatement: 'Build a global supermind community with AI',
    visionDescription: '',
    missionStatement: 'Empower young professionals and students worldwide',
    missionDescription: '',
    whoWeAreTitle: 'Who We Are',
    whoWeAreContent: ''
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // TODO: Implement API call to save general content
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Hero Section</h3>
        <TextInput
          label="Tagline"
          value={formData.heroTagline}
          onChange={(value) => setFormData({ ...formData, heroTagline: value })}
          required
        />
        <TextInput
          label="Mission Statement"
          value={formData.heroMission}
          onChange={(value) => setFormData({ ...formData, heroMission: value })}
          required
        />
        <ImageUpload
          label="Background Image"
          value={formData.heroBackgroundImage}
          onChange={(value) => setFormData({ ...formData, heroBackgroundImage: value })}
          required
        />
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Vision & Mission</h3>
        <TextInput
          label="Vision Statement"
          value={formData.visionStatement}
          onChange={(value) => setFormData({ ...formData, visionStatement: value })}
          required
        />
        <TextArea
          label="Vision Description"
          value={formData.visionDescription}
          onChange={(value) => setFormData({ ...formData, visionDescription: value })}
          required
        />
        <TextInput
          label="Mission Statement"
          value={formData.missionStatement}
          onChange={(value) => setFormData({ ...formData, missionStatement: value })}
          required
        />
        <TextArea
          label="Mission Description"
          value={formData.missionDescription}
          onChange={(value) => setFormData({ ...formData, missionDescription: value })}
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
            isSaving ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}