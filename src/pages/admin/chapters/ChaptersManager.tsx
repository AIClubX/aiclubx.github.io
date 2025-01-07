import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import ChaptersTable from './ChaptersTable';
import ChapterForm from './ChapterForm';
import { getChapters } from '../../../services/chapters';
import type { Chapter } from '../../../types';

export default function ChaptersManager() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadChapters();
  }, []);

  const loadChapters = async () => {
    try {
      const data = await getChapters();
      setChapters(data);
      setError(null);
    } catch (err) {
      setError('Failed to load chapters');
      console.error('Error loading chapters:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (chapter: Chapter) => {
    setEditingChapter(chapter);
    setIsFormOpen(true);
  };

  const filteredChapters = chapters.filter(chapter => 
    chapter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chapter.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chapter.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Chapters</h1>
        <button
          onClick={() => {
            setEditingChapter(null);
            setIsFormOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Chapter
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search chapters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <ChaptersTable
        chapters={filteredChapters}
        onEdit={handleEdit}
      />

      {isFormOpen && (
        <ChapterForm
          chapter={editingChapter}
          onSave={async () => {
            await loadChapters();
            setIsFormOpen(false);
          }}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingChapter(null);
          }}
        />
      )}
    </div>
  );
}