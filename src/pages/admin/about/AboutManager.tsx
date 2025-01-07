import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/Tabs';
import GeneralContentSection from './sections/GeneralContentSection';
import TeamSection from './sections/TeamSection';
import AdvisorsSection from './sections/AdvisorsSection';
import SponsorsSection from './sections/SponsorsSection';
import SuccessStoriesSection from './sections/SuccessStoriesSection';
import GuidelinesSection from './sections/GuidelinesSection';

export default function AboutManager() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">About Page Management</h1>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General Content</TabsTrigger>
          <TabsTrigger value="team">Our Team</TabsTrigger>
          <TabsTrigger value="advisors">Advisors</TabsTrigger>
          <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
          <TabsTrigger value="stories">Success Stories</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralContentSection />
        </TabsContent>

        <TabsContent value="team">
          <TeamSection />
        </TabsContent>

        <TabsContent value="advisors">
          <AdvisorsSection />
        </TabsContent>

        <TabsContent value="sponsors">
          <SponsorsSection />
        </TabsContent>

        <TabsContent value="stories">
          <SuccessStoriesSection />
        </TabsContent>

        <TabsContent value="guidelines">
          <GuidelinesSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}