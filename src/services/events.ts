import api from './api';
import type { Event, EventRegistration } from '../types';

// Sample data for development
const sampleEvents = [
  {
    id: '1',
    title: 'Introduction to Large Language Models',
    date: '2025-01-10',
    location: 'MIT Campus, Room 4-163',
    description: 'Learn about the fundamentals of LLMs and their applications in modern AI systems.',
    type: 'workshop' as const,
    chapterId: '1'
  },
  {
    id: '2',
    title: 'AI in Healthcare Symposium',
    date: '2025-01-20',
    location: 'Stanford Medical School',
    description: 'Industry experts discuss the latest developments in AI applications for healthcare.',
    type: 'conference' as const,
    chapterId: '2'
  }
];

// Load persisted registrations from localStorage or use initial data
const loadSampleRegistrations = (): Record<string, EventRegistration[]> => {
  const stored = localStorage.getItem('sampleRegistrations');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Initial sample data
  const initial: Record<string, EventRegistration[]> = {
    '1': [
      {
        id: '101',
        eventId: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '555-0123',
        company: 'Tech Corp',
        title: 'ML Engineer',
        isVolunteer: true,
        status: 'approved',
        registrationDate: '2024-01-05T10:00:00Z',
        notes: 'Interested in NLP applications',
        dietaryRequirements: 'Vegetarian'
      },
      {
        id: '102',
        eventId: '1',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '555-0124',
        company: 'AI Solutions',
        title: 'Data Scientist',
        isVolunteer: false,
        status: 'pending',
        registrationDate: '2024-01-06T15:30:00Z',
        notes: 'Looking forward to hands-on exercises',
        dietaryRequirements: 'None'
      }
    ],
    '2': [
      {
        id: '201',
        eventId: '2',
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.j@example.com',
        phone: '555-0125',
        company: 'Healthcare AI',
        title: 'Research Lead',
        isVolunteer: true,
        status: 'approved',
        registrationDate: '2024-01-07T09:15:00Z',
        notes: 'Working on medical imaging AI',
        dietaryRequirements: 'Gluten-free'
      }
    ]
  };

  localStorage.setItem('sampleRegistrations', JSON.stringify(initial));
  return initial;
};

let sampleRegistrations = loadSampleRegistrations();

export async function getEvents(): Promise<Event[]> {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.warn('Using sample event data');
    return sampleEvents;
  }
}

export async function getEvent(id: string): Promise<Event | null> {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Using sample event data');
    return sampleEvents.find(event => event.id === id) || null;
  }
}

export async function registerForEvent(eventId: string, data: Omit<EventRegistration, 'id' | 'status' | 'registrationDate'>): Promise<EventRegistration> {
  try {
    const response = await api.post(`/events/${eventId}/register`, data);
    return response.data;
  } catch (error) {
    // Development mode handling
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using mock registration response');
      const newRegistration: EventRegistration = {
        id: crypto.randomUUID(),
        eventId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        title: data.title,
        isVolunteer: data.isVolunteer,
        status: 'pending',
        registrationDate: new Date().toISOString(),
        notes: data.notes,
        dietaryRequirements: data.dietaryRequirements
      };
      
      // Add to sample registrations
      if (!sampleRegistrations[eventId]) {
        sampleRegistrations[eventId] = [];
      }
      sampleRegistrations[eventId].push(newRegistration);
      
      // Persist updated registrations
      localStorage.setItem('sampleRegistrations', JSON.stringify(sampleRegistrations));
      
      return newRegistration;
    }
    
    if (error instanceof Error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
    throw new Error('Registration failed');
  }
}

export async function getEventRegistrations(eventId: string): Promise<EventRegistration[]> {
  try {
    const response = await api.get(`/events/${eventId}/registrations`);
    return response.data;
  } catch (error) {
    // Development mode handling
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using sample registration data');
      // Reload from localStorage to ensure we have the latest data
      sampleRegistrations = loadSampleRegistrations();
      return sampleRegistrations[eventId] || [];
    }
    throw error;
  }
}

export async function updateRegistrationStatus(
  eventId: string,
  registrationId: string,
  status: 'approved' | 'rejected' | 'pending'
): Promise<EventRegistration> {
  try {
    const response = await api.put(`/events/${eventId}/registrations/${registrationId}`, { status });
    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // Update status in sample data
      const registration = sampleRegistrations[eventId]?.find(r => r.id === registrationId);
      if (registration) {
        registration.status = status;
        // Persist updated registrations
        localStorage.setItem('sampleRegistrations', JSON.stringify(sampleRegistrations));
        return registration;
      }
      throw new Error('Registration not found');
    }
    throw error;
  }
}