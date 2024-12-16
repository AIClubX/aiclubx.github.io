import React from 'react';
import { BookOpen, Users, Trophy, Rocket } from 'lucide-react';

const benefits = [
  {
    title: 'Learning',
    description: 'Access cutting-edge AI courses, workshops, and hands-on projects guided by industry experts.',
    icon: BookOpen,
    color: 'bg-blue-100 text-blue-700'
  },
  {
    title: 'Networking',
    description: 'Connect with like-minded students, researchers, and professionals in the AI community.',
    icon: Users,
    color: 'bg-green-100 text-green-700'
  },
  {
    title: 'Leadership',
    description: 'Develop leadership skills by organizing events, leading projects, and mentoring peers.',
    icon: Trophy,
    color: 'bg-purple-100 text-purple-700'
  },
  {
    title: 'Startups',
    description: 'Transform your AI ideas into reality with startup resources and mentorship opportunities.',
    icon: Rocket,
    color: 'bg-orange-100 text-orange-700'
  }
];

export default function ClubBenefits() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Join AI Club X?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Unlock opportunities and accelerate your AI journey with us
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="relative">
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg border border-gray-100">
                  <div className={`p-3 rounded-full ${benefit.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-base text-gray-500 text-center">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}