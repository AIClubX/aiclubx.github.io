import React from 'react';
import { Pencil, UserCheck, UserX } from 'lucide-react';
import type { Member } from '../../../types';

interface MembersTableProps {
  members: Member[];
  onEdit: (member: Member) => void;
  onStatusChange: (id: string, isActive: boolean) => void;
}

export default function MembersTable({ members, onEdit, onStatusChange }: MembersTableProps) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    University/Company
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {members.map((member) => (
                  <tr key={member.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                      {member.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {member.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        member.role === 'club_admin' ? 'bg-purple-100 text-purple-800' :
                        member.role === 'chapter_head' ? 'bg-blue-100 text-blue-800' :
                        member.role === 'advisor' ? 'bg-green-100 text-green-800' :
                        member.role === 'sponsor' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {member.university || member.company || '-'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <button
                        onClick={() => onStatusChange(member.id, !member.isActive)}
                        className={`inline-flex items-center px-2 py-1 rounded-md text-sm ${
                          member.isActive
                            ? 'text-green-700 bg-green-50 hover:bg-green-100'
                            : 'text-red-700 bg-red-50 hover:bg-red-100'
                        }`}
                      >
                        {member.isActive ? (
                          <>
                            <UserCheck className="h-4 w-4 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <UserX className="h-4 w-4 mr-1" />
                            Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => onEdit(member)}
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