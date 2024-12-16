import React from 'react';

interface ImageInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function ImageInput({ label, value, onChange, required }: ImageInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        required={required}
      />
      {value && (
        <div className="mt-2">
          <img
            src={value}
            alt="Preview"
            className="h-20 w-20 rounded-full object-cover"
          />
        </div>
      )}
    </div>
  );
}