import React from 'react';
import { MapPin, Users, Mail, Phone } from 'lucide-react';
import type { Chapter } from '../types';
import { DEFAULT_AVATAR } from '../utils/constants';

interface ChapterCardProps {
  chapter: Chapter;
}

export default function ChapterCard({ chapter }: ChapterCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header with School Logo */}
      <div className="relative h-32 bg-indigo-600">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        {chapter.logo && (
          <img
            src={chapter.logo}
            alt={`${chapter.university} logo`}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-xl font-semibold text-white">{chapter.name}</h3>
        </div>
      </div>

      {/* Chapter Information */}
      <div className="p-6">
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{chapter.university}</span>
        </div>
        
        {chapter.showMemberCount && (
          <div className="flex items-center text-gray-600 mb-4">
            <Users className="h-4 w-4 mr-2" />
            <span>{chapter.memberCount} members</span>
          </div>
        )}

        {/* Chapter Head Section */}
        {chapter.chapterHead && (
          <div className="border-t pt-4 mt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-3">Chapter Head</h4>
            <div className="flex items-start space-x-3">
              <img
                src={chapter.chapterHead.image || DEFAULT_AVATAR}
                alt={chapter.chapterHead.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h5 className="font-medium text-gray-900">{chapter.chapterHead.name}</h5>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{chapter.chapterHead.bio}</p>
                <div className="mt-2 space-y-1">
                  <a
                    href={`mailto:${chapter.chapterHead.email}`}
                    className="flex items-center text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    {chapter.chapterHead.email}
                  </a>
                  {chapter.chapterHead.phone && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-1" />
                      {chapter.chapterHead.phone}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Learn More Link */}
        <div className="mt-6">
          <a
            href={`/chapters/${chapter.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}