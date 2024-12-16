import React from 'react';

export default function AboutHero() {
  return (
    <div 
      className="relative h-[60vh] bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&h=1080&q=80")'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Build Intelligence X with AI
          </h1>
          <p className="text-xl md:text-3xl font-light">
            A Supermind Community
          </p>
          <p className="mt-6 text-lg md:text-xl text-indigo-100">
            Be empowered, not overpowered by AI
          </p>
        </div>
      </div>
    </div>
  );
}