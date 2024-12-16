import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Check, X, Clock, UserCheck } from 'lucide-react';
import { getEvent, getEventRegistrations, updateRegistrationStatus } from '../../../services/events';
import type { Event, EventRegistration } from '../../../types';

export default function EventRegistrations() {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEventData();
  }, [eventId]);

  const loadEventData = async () => {
    if (!eventId) return;
    
    try {
      const [eventData, registrationsData] = await Promise.all([
        getEvent(eventId),
        getEventRegistrations(eventId)
      ]);
      setEvent(eventData);
      setRegistrations(registrationsData);
    } catch (err) {
      setError('Failed to load event data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (registrationId: string, status: 'approved' | 'rejected' | 'pending') => {
    if (!eventId) return;

    try {
      await updateRegistrationStatus(eventId, registrationId, status);
      setRegistrations(prev =>
        prev.map(reg =>
          reg.id === registrationId ? { ...reg, status } : reg
        )
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!event) return <div className="p-4">Event not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
        <p className="text-gray-600">
          {new Date(event.date).toLocaleDateString()} at {event.location}
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {registrations.map((registration) => (
            <li key={registration.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {registration.firstName} {registration.lastName}
                  </h3>
                  <div className="mt-1 text-sm text-gray-500 space-y-1">
                    <p>Email: {registration.email}</p>
                    {registration.phone && <p>Phone: {registration.phone}</p>}
                    {registration.company && <p>Company: {registration.company}</p>}
                    {registration.title && <p>Title: {registration.title}</p>}
                    <p>Registered: {new Date(registration.registrationDate).toLocaleDateString()}</p>
                    {registration.isVolunteer && (
                      <p className="flex items-center text-indigo-600">
                        <UserCheck className="h-4 w-4 mr-1" />
                        Volunteer
                      </p>
                    )}
                  </div>
                  {registration.dietaryRequirements && (
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Dietary Requirements:</span> {registration.dietaryRequirements}
                    </p>
                  )}
                  {registration.notes && (
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Notes:</span> {registration.notes}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(registration.id, 'approved')}
                    className={`p-2 rounded-full ${
                      registration.status === 'approved'
                        ? 'bg-green-100 text-green-600'
                        : 'hover:bg-green-100 text-gray-400 hover:text-green-600'
                    }`}
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(registration.id, 'rejected')}
                    className={`p-2 rounded-full ${
                      registration.status === 'rejected'
                        ? 'bg-red-100 text-red-600'
                        : 'hover:bg-red-100 text-gray-400 hover:text-red-600'
                    }`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(registration.id, 'pending')}
                    className={`p-2 rounded-full ${
                      registration.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'hover:bg-yellow-100 text-gray-400 hover:text-yellow-600'
                    }`}
                  >
                    <Clock className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}