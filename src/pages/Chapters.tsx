import React from 'react';
import ChapterCard from '../components/ChapterCard';
import type { Chapter } from '../types';

// Sample data (in a real app, this would come from an API)
const chapters: Chapter[] = [
  {
    id: '1',
    name: 'MIT AI Club',
    university: 'Massachusetts Institute of Technology',
    location: 'Cambridge, MA',
    memberCount: 150,
    leadEmail: 'lead@mit.edu'
  },
  {
    id: '2',
    name: 'Stanford AI Society',
    university: 'Stanford University',
    location: 'Stanford, CA',
    memberCount: 120,
    leadEmail: 'lead@stanford.edu'
  },
  // Add more sample chapters
];

export default function Chapters() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Chapters</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {chapters.map(chapter => (
          <ChapterCard key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </div>
  );
}