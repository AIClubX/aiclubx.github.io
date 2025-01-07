import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { registerForEvent } from '../services/events';
import type { Event } from '../types';

interface EventRegistrationModalProps {
  event: Event;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EventRegistrationModal({ event, onClose, onSuccess }: EventRegistrationModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    company: '',
    title: '',
    isVolunteer: false,
    dietaryRequirements: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.email) {
      setError('Email is required');
      return;
    }

    setIsSubmitting(true);

    try {
      await registerForEvent(event.id, {
        ...formData,
        userId: user?.id
      });
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register for event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-4">
          <h2 className="text-xl font-semibold text-gray-900">Register for Event</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 p-2"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-gray-900">{event.title}</h3>
          <p className="text-sm text-gray-500">
            {new Date(event.date).toLocaleDateString()} at {event.location}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Rest of the form remains the same */}
      </div>
    </div>
  );
}