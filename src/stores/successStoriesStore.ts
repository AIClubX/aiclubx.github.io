import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SuccessStory } from '../types/about';

interface SuccessStoriesState {
  stories: SuccessStory[];
  setStories: (stories: SuccessStory[]) => void;
  addStory: (story: SuccessStory) => void;
  updateStory: (id: string, story: SuccessStory) => void;
  deleteStory: (id: string) => void;
}

export const useSuccessStoriesStore = create<SuccessStoriesState>()(
  persist(
    (set) => ({
      stories: [],
      setStories: (stories) => set({ stories }),
      addStory: (story) => set((state) => ({
        stories: [...state.stories, story]
      })),
      updateStory: (id, story) => set((state) => ({
        stories: state.stories.map((s) => s.id === id ? story : s)
      })),
      deleteStory: (id) => set((state) => ({
        stories: state.stories.filter((s) => s.id !== id)
      }))
    }),
    {
      name: 'success-stories-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name)
      },
    }
  )
);