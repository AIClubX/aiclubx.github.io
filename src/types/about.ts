export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Advisor {
  id: string;
  name: string;
  title: string;
  organization: string;
  bio: string;
  image: string;
  linkedIn?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
}

export interface SuccessStory {
  id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  category: 'member' | 'chapter' | 'project' | 'event';
}

export interface AboutContent {
  hero: {
    tagline: string;
    mission: string;
    backgroundImage: string;
  };
  vision: {
    statement: string;
    description: string;
  };
  mission: {
    statement: string;
    description: string;
  };
  whoWeAre: {
    title: string;
    content: string;
  };
  coreValues: CoreValue[];
  benefits: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  advisors: Advisor[];
  sponsors: Sponsor[];
  successStories: SuccessStory[];
  guidelines: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}