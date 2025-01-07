import React from 'react';
import { Pencil, Users, Eye, EyeOff } from 'lucide-react';
import type { Chapter } from '../../../types';

interface ChaptersTableProps {
  chapters: Chapter[];
  onEdit: (chapter: Chapter) => void;
}

export default function ChaptersTable({ chapters, onEdit }: ChaptersTableProps) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Logo
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Chapter Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    University
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Location
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Chapter Head
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Members
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {chapters.map((chapter) => (
                  <tr key={chapter.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img
                          src={chapter.logo || 'https://via.placeholder.com/40'}
                          alt={`${chapter.name} logo`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                      {chapter.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {chapter.university}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {chapter.location}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <div className="flex items-center">
                        <img
                          src={chapter.chapterHead.image}
                          alt={chapter.chapterHead.name}
                          className="h-8 w-8 rounded-full mr-2"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {chapter.chapterHead.name}
                          </div>
                          <div className="text-gray-500">
                            {chapter.chapterHead.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="text-gray-900">{chapter.memberCount}</span>
                        {chapter.showMemberCount ? (
                          <Eye className="h-4 w-4 ml-2 text-green-500" />
                        ) : (
                          <EyeOff className="h-4 w-4 ml-2 text-gray-400" />
                        )}
                      </div>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => onEdit(chapter)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}