import React, { useState } from 'react';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import EventRegistrationModal from './modals/EventRegistrationModal';
import type { Event } from '../types';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { user } = useAuth();
  const [showRegistration, setShowRegistration] = useState(false);

  const handleRegisterClick = () => {
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = `/login?redirect=/events/${event.id}`;
      return;
    }
    setShowRegistration(true);
  };

  const handleRegistrationSuccess = () => {
    setShowRegistration(false);
    // You could add a success message or update UI here
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              event.type === 'workshop' ? 'bg-green-100 text-green-800' :
              event.type === 'meetup' ? 'bg-blue-100 text-blue-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {event.type}
            </span>
          </div>
          <div className="mt-2 flex items-center text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="mt-2 flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{event.location}</span>
          </div>
          <p className="mt-4 text-gray-600">{event.description}</p>
          <div className="mt-4">
            <button
              onClick={handleRegisterClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>

      {showRegistration && (
        <EventRegistrationModal
          event={event}
          onClose={() => setShowRegistration(false)}
          onSuccess={handleRegistrationSuccess}
        />
      )}
    </>
  );
}