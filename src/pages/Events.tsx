import React from 'react';
import EventCard from '../components/EventCard';
import type { Event } from '../types';

// Sample data (in a real app, this would come from an API)
const events: Event[] = [
  {
    id: '1',
    title: 'Introduction to Large Language Models',
    date: '2025-01-10',
    location: 'MIT Campus, Room 4-163',
    description: 'Learn about the fundamentals of LLMs and their applications in modern AI systems.',
    type: 'workshop',
    chapterId: '1'
  },
  {
    id: '2',
    title: 'AI in Healthcare Symposium',
    date: '2025-01-20',
    location: 'Stanford Medical School',
    description: 'Industry experts discuss the latest developments in AI applications for healthcare.',
    type: 'conference',
    chapterId: '2'
  }
];

export default function Events() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Upcoming Events</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}