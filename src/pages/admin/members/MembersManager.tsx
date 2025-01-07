import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import MembersTable from './MembersTable';
import MemberForm from './MemberForm';
import { getMembers, updateMemberStatus } from '../../../services/members';
import type { Member } from '../../../types';

export default function MembersManager() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const data = await getMembers();
      setMembers(data);
      setError(null);
    } catch (err) {
      setError('Failed to load members');
      console.error('Error loading members:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };

  const handleStatusChange = async (memberId: string, isActive: boolean) => {
    try {
      await updateMemberStatus(memberId, isActive);
      setMembers(members.map(member => 
        member.id === memberId ? { ...member, isActive } : member
      ));
    } catch (err) {
      console.error('Error updating member status:', err);
    }
  };

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Members</h1>
        <button
          onClick={() => {
            setEditingMember(null);
            setIsFormOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Member
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <MembersTable
        members={filteredMembers}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
      />

      {isFormOpen && (
        <MemberForm
          member={editingMember}
          onSave={async (memberData) => {
            await loadMembers();
            setIsFormOpen(false);
          }}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingMember(null);
          }}
        />
      )}
    </div>
  );
}