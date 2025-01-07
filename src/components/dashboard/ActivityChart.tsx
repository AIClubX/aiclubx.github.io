import React from 'react';
import { BarChart, Activity } from 'lucide-react';

interface ActivityData {
  label: string;
  count: number;
}

interface ActivityChartProps {
  title: string;
  data: ActivityData[];
  loading?: boolean;
}

export default function ActivityChart({ title, data, loading }: ActivityChartProps) {
  const maxValue = Math.max(...data.map(d => d.count));

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="animate-pulse">
          <div className="h-6 w-1/3 bg-gray-200 rounded mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-8 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <BarChart className="h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="relative">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{item.label}</span>
              <span className="text-gray-900 font-medium">{item.count}</span>
            </div>
            <div className="mt-1 h-2 bg-gray-100 rounded-full">
              <div
                className="h-2 bg-indigo-500 rounded-full"
                style={{ width: `${(item.count / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}