import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Code, BookOpen } from 'lucide-react';
import { useResourceStore } from '../../stores/resourceStore';

export default function ResourceStats() {
  const { getResourceStats } = useResourceStore();
  const stats = getResourceStats();

  const items = [
    { 
      name: 'Job Opportunities', 
      count: stats.totalJobs,
      icon: Briefcase,
      href: '/admin/resources/jobs'
    },
    { 
      name: 'Open Projects', 
      count: stats.totalProjects,
      icon: Code,
      href: '/admin/resources/projects'
    },
    { 
      name: 'Learning Resources', 
      count: stats.totalLearning,
      icon: BookOpen,
      href: '/admin/resources/learning'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            to={item.href}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden hover:bg-gray-50 transition-colors"
          >
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.count}
              </p>
            </dd>
          </Link>
        );
      })}
    </div>
  );
}