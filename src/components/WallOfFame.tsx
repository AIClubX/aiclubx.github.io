import React, { useState, useEffect } from 'react';
import { getFeaturedContributors } from '../services/contributors';
import type { Contributor } from '../types';

export default function WallOfFame() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadContributors = async () => {
      try {
        const data = await getFeaturedContributors();
        if (mounted) {
          setContributors(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to load contributors');
          console.error('Error loading contributors:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadContributors();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  if (error || !contributors.length) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Wall of Fame
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Celebrating our outstanding contributors who shape the future of AI education and research.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {contributors.map((contributor) => (
            <div key={contributor.id} className="relative">
              <div className="mx-auto w-32 h-32 rounded-full overflow-hidden">
                <img
                  src={contributor.image}
                  alt={contributor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium text-gray-900">{contributor.name}</h3>
                <p className="text-sm text-indigo-600 mb-2">{contributor.title}</p>
                <p className="text-sm text-gray-500">{contributor.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}