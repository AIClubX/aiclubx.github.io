export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'job' | 'project' | 'learning';
  link: string;
  company?: string;
  deadline?: string;
  createdAt: string;
}

export interface Chapter {
  id: string;
  name: string;
  university: string;
  location: string;
  memberCount: number;
  leadEmail: string;
  logo?: string;
  chapterHead: {
    name: string;
    bio: string;
    image: string;
    email: string;
    phone?: string;
  };
  coreTeam: Array<{
    id: string;
    name: string;
    role: string;
    classYear: string;
    image?: string;
  }>;
  members: Array<{
    id: string;
    name: string;
    classYear: string;
  }>;
  showMemberCount: boolean;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  university?: string;
  company?: string;
  title?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: 'workshop' | 'meetup' | 'conference';
  chapterId: string;
  registrations?: Array<{
    id: string;
    userId: string;
    registrationDate: string;
    status: 'pending' | 'approved' | 'rejected';
  }>;
}