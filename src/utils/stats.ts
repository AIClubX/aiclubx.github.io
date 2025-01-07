import type { Event, Resource, Chapter, Member } from '../types';

export function calculateActiveChapters(chapters: Chapter[]): number {
  return chapters.filter(chapter => chapter.memberCount > 0).length;
}

export function calculateUpcomingEvents(events: Event[]): number {
  const now = new Date();
  return events.filter(event => new Date(event.date) > now).length;
}

export function calculateTotalResources(resources: Resource[]): number {
  return resources.length;
}

export function calculateTotalMembers(members: Member[]): number {
  return members.filter(member => member.isActive).length;
}

export function calculateActivityStats(
  members: Member[],
  events: Event[],
  resources: Resource[]
): Array<{ label: string; count: number }> {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // New members in last 30 days
  const newMembers = members.filter(
    member => new Date(member.createdAt) > thirtyDaysAgo
  ).length;

  // Event registrations in last 30 days
  const eventRegistrations = events.reduce((total, event) => {
    const recentRegistrations = event.registrations?.filter(
      reg => new Date(reg.registrationDate) > thirtyDaysAgo
    ).length || 0;
    return total + recentRegistrations;
  }, 0);

  // Resources by type in last 30 days
  const recentResources = resources.filter(
    resource => new Date(resource.createdAt) > thirtyDaysAgo
  );

  const newJobs = recentResources.filter(r => r.type === 'job').length;
  const newProjects = recentResources.filter(r => r.type === 'project').length;
  const newLearning = recentResources.filter(r => r.type === 'learning').length;

  return [
    { label: 'New Members', count: newMembers },
    { label: 'Event Registrations', count: eventRegistrations },
    { label: 'New Jobs', count: newJobs },
    { label: 'New Projects', count: newProjects },
    { label: 'New Learning Resources', count: newLearning }
  ];
}