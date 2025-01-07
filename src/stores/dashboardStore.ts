import { create } from 'zustand';
import { getMembers } from '../services/members';
import { getChapters } from '../services/chapters';
import { getEvents } from '../services/events';
import { getResources } from '../services/resources';
import {
  calculateActiveChapters,
  calculateUpcomingEvents,
  calculateTotalResources,
  calculateTotalMembers,
  calculateActivityStats
} from '../utils/stats';

interface DashboardStats {
  totalMembers: number;
  activeChapters: number;
  upcomingEvents: number;
  totalResources: number;
  activityStats: Array<{ label: string; count: number }>;
  isLoading: boolean;
  error: string | null;
}

interface DashboardStore extends DashboardStats {
  fetchStats: () => Promise<void>;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  totalMembers: 0,
  activeChapters: 0,
  upcomingEvents: 0,
  totalResources: 0,
  activityStats: [],
  isLoading: false,
  error: null,
  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      // Fetch all required data
      const [members, chapters, events, resources] = await Promise.all([
        getMembers(),
        getChapters(),
        getEvents(),
        getResources()
      ]);

      // Calculate stats
      const stats = {
        totalMembers: calculateTotalMembers(members),
        activeChapters: calculateActiveChapters(chapters),
        upcomingEvents: calculateUpcomingEvents(events),
        totalResources: calculateTotalResources(resources),
        activityStats: calculateActivityStats(members, events, resources)
      };

      set({
        ...stats,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch dashboard stats',
        isLoading: false 
      });
    }
  }
}));