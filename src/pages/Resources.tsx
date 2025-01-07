import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Code, BookOpen } from 'lucide-react';

export default function Resources() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Resources</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Job Opportunities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Briefcase className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold">Job Opportunities</h2>
          </div>
          <p className="text-gray-600 mb-4">Discover AI-related job openings and internships.</p>
          <Link
            to="/resources/jobs"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            View Opportunities →
          </Link>
        </div>

        {/* Open Projects */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Code className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold">Open Projects</h2>
          </div>
          <p className="text-gray-600 mb-4">Collaborate on exciting AI projects.</p>
          <Link
            to="/resources/projects"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Browse Projects →
          </Link>
        </div>

        {/* AI Learning */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold">AI Learning</h2>
          </div>
          <p className="text-gray-600 mb-4">Access curated learning resources and tutorials.</p>
          <Link
            to="/resources/learning"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Start Learning →
          </Link>
        </div>
      </div>
    </div>
  );
}