import React from 'react';
import { TextInput } from '../common/TextInput';
import { TextArea } from '../common/TextArea';
import { Checkbox } from '../common/Checkbox';
import type { Event } from '../../types';

interface EventRegistrationFormProps {
  event: Event;
  isSubmitting: boolean;
  onSubmit: (formData: any) => void;
}

export default function EventRegistrationForm({ event, isSubmitting, onSubmit }: EventRegistrationFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    onSubmit({
      ...data,
      isVolunteer: formData.get('isVolunteer') === 'on'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="First Name"
          name="firstName"
          required
        />
        <TextInput
          label="Last Name"
          name="lastName"
          required
        />
      </div>

      <TextInput
        label="Email"
        name="email"
        type="email"
        required
      />

      <TextInput
        label="Phone Number"
        name="phone"
        type="tel"
      />

      <TextInput
        label="Company/Organization"
        name="company"
      />

      <TextInput
        label="Title/Role"
        name="title"
      />

      <TextInput
        label="Dietary Requirements"
        name="dietaryRequirements"
        placeholder="Any dietary restrictions or preferences"
      />

      <TextArea
        label="Additional Notes"
        name="notes"
        placeholder="Any additional information we should know"
        rows={3}
      />

      <Checkbox
        label="I want to be an Event Volunteer Helper"
        name="isVolunteer"
      />

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </div>
    </form>
  );
}