export const APP_NAME = import.meta.env.VITE_APP_NAME || 'AI Club X';
export const API_TIMEOUT = 30000; // 30 seconds
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
export const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330';

export const ROLES = {
  REGULAR: 'regular',
  CHAPTER_HEAD: 'chapter_head',
  CLUB_ADMIN: 'club_admin',
  ADVISOR: 'advisor',
  SPONSOR: 'sponsor'
} as const;

export const EVENT_TYPES = {
  WORKSHOP: 'workshop',
  MEETUP: 'meetup',
  CONFERENCE: 'conference'
} as const;