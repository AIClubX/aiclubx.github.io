import React, { useEffect } from 'react';
import { Users, Building2, Calendar } from 'lucide-react';
import { useDashboardStore } from '../../stores/dashboardStore';
import { useActivityStore } from '../../stores/activityStore';
import { useResourceStore } from '../../stores/resourceStore';
import ActivityChart from '../../components/dashboard/ActivityChart';
import RecentActivity from '../../components/dashboard/RecentActivity';
import ResourceStats from '../../components/dashboard/ResourceStats';

export default function Dashboard() {
  const { 
    totalMembers, 
    activeChapters, 
    upcomingEvents,
    activityStats,
    isLoading: statsLoading,
    error: statsError,
    fetchStats 
  } = useDashboardStore();

  const {
    activities,
    isLoading: activitiesLoading,
    error: activitiesError,
    fetchActivities
  } = useActivityStore();

  const { fetchResources } = useResourceStore();

  useEffect(() => {
    fetchStats();
    fetchActivities();
    fetchResources();
  }, [fetchStats, fetchActivities, fetchResources]);

  const stats = [
    { 
      name: 'Total Members', 
      stat: totalMembers, 
      icon: Users,
      loading: statsLoading 
    },
    { 
      name: 'Active Chapters', 
      stat: activeChapters, 
      icon: Building2,
      loading: statsLoading 
    },
    { 
      name: 'Upcoming Events', 
      stat: upcomingEvents, 
      icon: Calendar,
      loading: statsLoading 
    }
  ];

  if (statsError || activitiesError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-md mt-6">
          {statsError || activitiesError}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      {/* Main Stats */}
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
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
                  {item.loading ? (
                    <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" />
                  ) : (
                    <p className="text-2xl font-semibold text-gray-900">
                      {item.stat.toLocaleString()}
                    </p>
                  )}
                </dd>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resource Stats */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Resources Overview</h2>
        <ResourceStats />
      </div>

      {/* Activity Charts and Recent Activity */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ActivityChart 
          title="30-Day Activity"
          data={activityStats}
          loading={statsLoading}
        />
        <RecentActivity 
          activities={activities}
          loading={activitiesLoading}
        />
      </div>
    </div>
  );
}