import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { getResources } from '../../services/resources';
import { Search, BookOpen } from 'lucide-react';
import PageHeader from '../../components/navigation/PageHeader';
import type { Resource } from '../../types';

export default function AILearning() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      setLoading(true);
      const allResources = await getResources();
      // Filter only learning type resources
      const learningResources = allResources.filter(resource => resource.type === 'learning');
      setResources(learningResources);
      if (learningResources.length > 0) {
        setSelectedResource(learningResources[0]);
      }
      setError(null);
    } catch (err) {
      setError('Failed to load learning resources');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <PageHeader 
            title="AI Learning Resources" 
            backTo="/resources"
            backLabel="Back to Resources"
          />
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64">
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white rounded-lg p-6 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader 
          title="AI Learning Resources" 
          backTo="/resources"
          backLabel="Back to Resources"
        />
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PageHeader 
        title="AI Learning Resources" 
        backTo="/resources"
        backLabel="Back to Resources"
      />
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <nav className="space-y-1">
            {filteredResources.map((resource) => (
              <button
                key={resource.id}
                onClick={() => setSelectedResource(resource)}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                  selectedResource?.id === resource.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {resource.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {selectedResource ? (
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedResource.title}
              </h2>
              <div className="prose prose-indigo max-w-none">
                <ReactMarkdown>{selectedResource.description}</ReactMarkdown>
              </div>
              <div className="mt-6">
                <a
                  href={selectedResource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
                >
                  Access Resource →
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 bg-white rounded-lg shadow-md p-8">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p>Select a resource to start learning</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}