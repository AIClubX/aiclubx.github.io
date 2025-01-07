import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Code, BookOpen } from 'lucide-react';

const resourceTypes = [
  {
    name: 'Job Opportunities',
    description: 'Manage job listings and internship opportunities',
    href: '/admin/resources/jobs',
    icon: Briefcase,
    count: 12
  },
  {
    name: 'Open Projects',
    description: 'Manage collaborative AI projects',
    href: '/admin/resources/projects',
    icon: Code,
    count: 8
  },
  {
    name: 'Learning Resources',
    description: 'Manage educational content and tutorials',
    href: '/admin/resources/learning',
    icon: BookOpen,
    count: 24
  }
];

export default function ResourcesManager() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Resources Management</h1>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {resourceTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Link
              key={type.name}
              to={type.href}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg overflow-hidden hover:bg-gray-50 transition-colors duration-200"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 ring-4 ring-white">
                  <Icon className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {type.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {type.description}
                </p>
              </div>
              <span className="absolute top-6 right-6 text-sm text-gray-400">
                {type.count} items
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}