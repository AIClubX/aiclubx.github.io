import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getResources, createResource, updateResource, deleteResource } from '../services/resources';
import { loadResources, saveResources } from '../services/resources/storage';
import type { Resource } from '../types';

interface ResourceStore {
  resources: Resource[];
  isLoading: boolean;
  error: string | null;
  fetchResources: () => Promise<void>;
  addResource: (data: Omit<Resource, 'id'>) => Promise<void>;
  updateResource: (id: string, data: Partial<Resource>) => Promise<void>;
  deleteResource: (id: string) => Promise<void>;
  getResourcesByType: (type: 'job' | 'project' | 'learning') => Resource[];
  getResourceStats: () => {
    totalJobs: number;
    totalProjects: number;
    totalLearning: number;
    recentlyAdded: number;
  };
}

// Initialize with empty array to ensure resources is always an array
const initialState = {
  resources: [] as Resource[],
  isLoading: false,
  error: null as string | null
};

export const useResourceStore = create<ResourceStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      fetchResources: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await getResources();
          set({ resources: data, isLoading: false });
          saveResources(data);
        } catch (error) {
          set({ error: 'Failed to fetch resources', isLoading: false });
        }
      },

      addResource: async (data) => {
        try {
          const newResource = await createResource(data);
          const updatedResources = [...get().resources, newResource];
          set({ resources: updatedResources });
          saveResources(updatedResources);
        } catch (error) {
          set({ error: 'Failed to create resource' });
          throw error;
        }
      },

      updateResource: async (id, data) => {
        try {
          const updated = await updateResource(id, data);
          const updatedResources = get().resources.map(r => r.id === id ? updated : r);
          set({ resources: updatedResources });
          saveResources(updatedResources);
        } catch (error) {
          set({ error: 'Failed to update resource' });
          throw error;
        }
      },

      deleteResource: async (id) => {
        try {
          await deleteResource(id);
          const updatedResources = get().resources.filter(r => r.id !== id);
          set({ resources: updatedResources });
          saveResources(updatedResources);
        } catch (error) {
          set({ error: 'Failed to delete resource' });
          throw error;
        }
      },

      getResourcesByType: (type) => {
        return get().resources.filter(r => r.type === type);
      },

      getResourceStats: () => {
        const resources = get().resources;
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        return {
          totalJobs: resources.filter(r => r.type === 'job').length,
          totalProjects: resources.filter(r => r.type === 'project').length,
          totalLearning: resources.filter(r => r.type === 'learning').length,
          recentlyAdded: resources.filter(r => new Date(r.createdAt) > thirtyDaysAgo).length
        };
      }
    }),
    {
      name: 'resources-storage',
      storage: {
        getItem: () => {
          const resources = loadResources();
          return { state: { ...initialState, resources } };
        },
        setItem: (_, value) => {
          saveResources(value.state.resources);
        },
        removeItem: () => {
          saveResources([]);
        }
      },
    }
  )
);