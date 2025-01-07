import React from 'react';
import AboutHero from './about/AboutHero';
import VisionMission from './about/VisionMission';
import CoreValues from './about/CoreValues';
import WhoWeAre from './about/WhoWeAre';
import SuccessStories from './about/SuccessStories';
import Guidelines from './about/Guidelines';

export default function About() {
  return (
    <div className="bg-white">
      <AboutHero />
      <VisionMission />
      <CoreValues />
      <WhoWeAre />
      <SuccessStories />
      <Guidelines />
    </div>
  );
}