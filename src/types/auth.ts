export interface User {
  id: string;
  name: string;
  email: string;
  role: 'regular' | 'chapter_head' | 'club_admin' | 'advisor' | 'sponsor';
  profileImage?: string;
  googleId?: string;
}

export interface AdminPanelLink {
  name: string;
  href: string;
  icon: string;
}

export interface OAuthUser {
  email: string;
  name: string;
  picture?: string;
  googleId?: string;
}