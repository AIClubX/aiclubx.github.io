import React from 'react';

export default function VisionMission() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-xl text-gray-600 mb-4">Build a global supermind community with AI.</p>
            <p className="text-gray-600">
              We envision a future where AI technology empowers individuals and communities to achieve their full potential.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 mb-4">Empower young professionals and students worldwide.</p>
            <p className="text-gray-600">
              Through education, collaboration, and innovation, we strive to make AI accessible and beneficial for everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}