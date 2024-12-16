import React from 'react';
import Hero from '../components/Hero';
import ClubBenefits from '../components/ClubBenefits';
import ChapterCard from '../components/ChapterCard';
import EventCard from '../components/EventCard';
import WallOfFame from '../components/WallOfFame';
import type { Chapter, Event } from '../types';

// Sample data (in a real app, this would come from an API)
const featuredChapters: Chapter[] = [
  {
    id: '1',
    name: 'MIT AI Club',
    university: 'Massachusetts Institute of Technology',
    location: 'Cambridge, MA',
    memberCount: 150,
    leadEmail: 'lead@mit.edu',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=100&h=100',
    showMemberCount: true,
    chapterHead: {
      name: 'Michael Rodriguez',
      bio: 'PhD candidate in Machine Learning, focusing on reinforcement learning and robotics.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
      email: 'michael.r@mit.edu',
      phone: '(617) 555-0123'
    },
    coreTeam: [
      {
        id: '101',
        name: 'Sarah Chen',
        role: 'Technical Lead',
        classYear: '2024',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100'
      },
      {
        id: '102',
        name: 'James Wilson',
        role: 'Events Coordinator',
        classYear: '2025',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100'
      }
    ],
    members: [
      { id: '201', name: 'Alice Johnson', classYear: '2024' },
      { id: '202', name: 'Bob Smith', classYear: '2025' }
    ]
  },
  {
    id: '2',
    name: 'Stanford AI Society',
    university: 'Stanford University',
    location: 'Stanford, CA',
    memberCount: 120,
    leadEmail: 'lead@stanford.edu',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=100&h=100',
    showMemberCount: true,
    chapterHead: {
      name: 'Emily Chang',
      bio: 'Masters student in Computer Science with a focus on natural language processing.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100',
      email: 'emily.c@stanford.edu',
      phone: '(650) 555-0123'
    },
    coreTeam: [
      {
        id: '103',
        name: 'David Park',
        role: 'Research Lead',
        classYear: '2024',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100'
      }
    ],
    members: [
      { id: '203', name: 'Carol Martinez', classYear: '2024' },
      { id: '204', name: 'Daniel Lee', classYear: '2025' }
    ]
  }
];

const upcomingEvents: Event[] = [
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

export default function Home() {
  return (
    <div>
      <Hero />
      
      {/* Club Benefits - White background */}
      <ClubBenefits />
      
      {/* Featured Chapters - Gray background */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Featured Chapters</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {featuredChapters.map(chapter => (
              <ChapterCard key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events - White background */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Upcoming Events</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Wall of Fame - Gray background */}
      <div className="bg-gray-100">
        <WallOfFame />
      </div>

      {/* Call to Action - Indigo background */}
      <section className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-indigo-200">Start your AI journey today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/join"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}