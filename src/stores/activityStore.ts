import { create } from 'zustand';
import type { ActivityItem } from '../components/dashboard/RecentActivity';

interface ActivityStore {
  activities: ActivityItem[];
  isLoading: boolean;
  error: string | null;
  fetchActivities: () => Promise<void>;
}

// Sample data for development
const sampleActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'member_joined',
    title: 'New member joined',
    actor: 'Sarah Chen',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
  },
  {
    id: '2',
    type: 'event_created',
    title: 'New workshop scheduled',
    actor: 'Michael Rodriguez',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
  },
  {
    id: '3',
    type: 'resource_added',
    title: 'New learning resource added',
    actor: 'Emily Chang',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() // 5 hours ago
  }
];

export const useActivityStore = create<ActivityStore>((set) => ({
  activities: [],
  isLoading: false,
  error: null,
  fetchActivities: async () => {
    set({ isLoading: true, error: null });
    try {
      // In development, return sample data
      // In production, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ activities: sampleActivities, isLoading: false });
    } catch (error) {
      set({ 
        error: 'Failed to fetch activities',
        isLoading: false 
      });
    }
  }
}));