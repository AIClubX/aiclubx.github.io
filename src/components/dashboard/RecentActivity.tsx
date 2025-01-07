import React from 'react';
import { Activity } from 'lucide-react';
import { formatDate } from '../../utils/date-helpers';

export interface ActivityItem {
  id: string;
  type: 'member_joined' | 'event_created' | 'resource_added' | 'chapter_created';
  title: string;
  timestamp: string;
  actor?: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
  loading?: boolean;
}

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'member_joined':
      return '👤';
    case 'event_created':
      return '📅';
    case 'resource_added':
      return '📚';
    case 'chapter_created':
      return '🏛️';
    default:
      return '📝';
  }
};

export default function RecentActivity({ activities, loading }: RecentActivityProps) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="animate-pulse">
          <div className="h-6 w-1/3 bg-gray-200 rounded mb-4" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        <Activity className="h-5 w-5 text-gray-400" />
      </div>
      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, index) => (
            <li key={activity.id}>
              <div className="relative pb-8">
                {index < activities.length - 1 && (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-lg" role="img" aria-label={activity.type}>
                      {getActivityIcon(activity.type)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      {activity.title}
                      {activity.actor && (
                        <span className="text-gray-600"> by {activity.actor}</span>
                      )}
                    </p>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}