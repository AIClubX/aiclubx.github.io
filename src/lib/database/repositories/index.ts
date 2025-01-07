import { DatabaseClient } from '../types';
import { UserRepository } from './UserRepository';
import { ChapterRepository } from './ChapterRepository';
import { EventRepository } from './EventRepository';
import { ResourceRepository } from './ResourceRepository';
import { ContributorRepository } from './ContributorRepository';

export interface Repositories {
  users: UserRepository;
  chapters: ChapterRepository;
  events: EventRepository;
  resources: ResourceRepository;
  contributors: ContributorRepository;
}

export function createRepositories(client: DatabaseClient): Repositories {
  return {
    users: new UserRepository(client),
    chapters: new ChapterRepository(client),
    events: new EventRepository(client),
    resources: new ResourceRepository(client),
    contributors: new ContributorRepository(client),
  };
}