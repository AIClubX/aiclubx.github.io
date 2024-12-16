import React from 'react';

interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      <div className="mt-4 space-y-4">
        {children}
      </div>
    </section>
  );
}