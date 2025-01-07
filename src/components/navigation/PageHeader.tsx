import React from 'react';
import BackButton from './BackButton';

interface PageHeaderProps {
  title: string;
  backTo?: string;
  backLabel?: string;
}

export default function PageHeader({ title, backTo, backLabel }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <BackButton to={backTo} label={backLabel} />
      <h1 className="text-3xl font-bold text-gray-900 mt-2">{title}</h1>
    </div>
  );
}