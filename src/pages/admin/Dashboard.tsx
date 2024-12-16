import React from 'react';
import { Users, Building2, Calendar, BookOpen } from 'lucide-react';

const stats = [
  { name: 'Total Members', stat: '1,200', icon: Users },
  { name: 'Active Chapters', stat: '25', icon: Building2 },
  { name: 'Upcoming Events', stat: '12', icon: Calendar },
  { name: 'Resources', stat: '48', icon: BookOpen },
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
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
                    {item.stat}
                  </p>
                </dd>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}