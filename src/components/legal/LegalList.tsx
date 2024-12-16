import React from 'react';

interface LegalListProps {
  items: string[];
}

export default function LegalList({ items }: LegalListProps) {
  return (
    <ul className="list-disc pl-6 mt-2 space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-gray-600">{item}</li>
      ))}
    </ul>
  );
}