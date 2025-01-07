import React from 'react';
import { Brain, Heart, Users, Lightbulb, Star, Shield, Zap } from 'lucide-react';

const values = [
  { icon: Brain, title: 'Entrepreneurial', description: 'Foster innovation and initiative' },
  { icon: Heart, title: 'Integrity', description: 'Uphold ethical principles in AI' },
  { icon: Users, title: 'Inclusivity', description: 'Welcome diverse perspectives' },
  { icon: Lightbulb, title: 'Innovation', description: 'Push boundaries in AI development' },
  { icon: Star, title: 'Excellence', description: 'Strive for the highest standards' },
  { icon: Shield, title: 'Responsibility', description: 'Consider societal impact' },
  { icon: Zap, title: 'Impact', description: 'Create meaningful change' }
];

export default function CoreValues() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}