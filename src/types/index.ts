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

// ... rest of the existing types