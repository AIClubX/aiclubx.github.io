import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Sponsor } from '../../../../types/about';
import SponsorForm from '../forms/SponsorForm';

export default function SponsorsSection() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);

  const handleAddSponsor = () => {
    setEditingSponsor(null);
    setIsFormOpen(true);
  };

  const handleEdit = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor);
    setIsFormOpen(true);
  };

  const handleSave = async (data: Omit<Sponsor, 'id'>) => {
    try {
      if (editingSponsor) {
        // Update existing sponsor
        const updatedSponsor = { ...data, id: editingSponsor.id };
        setSponsors(sponsors.map(s => s.id === editingSponsor.id ? updatedSponsor : s));
      } else {
        // Add new sponsor
        const newSponsor = { ...data, id: crypto.randomUUID() };
        setSponsors([...sponsors, newSponsor]);
      }
      setIsFormOpen(false);
      setEditingSponsor(null);
    } catch (error) {
      console.error('Failed to save sponsor:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this sponsor?')) {
      return;
    }

    try {
      // TODO: Implement delete API call
      setSponsors(sponsors.filter(sponsor => sponsor.id !== id));
    } catch (error) {
      console.error('Failed to delete sponsor:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Sponsors</h2>
        <button
          onClick={handleAddSponsor}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Sponsor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4">
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-16 object-contain mx-auto mb-4"
              />
              <h3 className="text-lg font-medium text-gray-900">{sponsor.name}</h3>
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                sponsor.tier === 'platinum' ? 'bg-purple-100 text-purple-800' :
                sponsor.tier === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                sponsor.tier === 'silver' ? 'bg-gray-100 text-gray-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)}
              </span>
              <p className="mt-2 text-sm text-gray-600">{sponsor.description}</p>
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center text-indigo-600 hover:text-indigo-500"
              >
                Visit Website
              </a>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(sponsor)}
                  className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(sponsor.id)}
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
        <SponsorForm
          sponsor={editingSponsor}
          onSave={handleSave}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingSponsor(null);
          }}
        />
      )}
    </div>
  );
}