import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import WhoWeAreForm from '../forms/WhoWeAreForm';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  email: string;
  phone?: string;
  linkedin?: string;
}

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const handleAddMember = () => {
    setEditingMember(null);
    setIsFormOpen(true);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };

  const handleSave = async (data: Omit<TeamMember, 'id'>) => {
    try {
      if (editingMember) {
        // Update existing member
        const updatedMember = { ...data, id: editingMember.id };
        setTeamMembers(members => members.map(m => m.id === editingMember.id ? updatedMember : m));
      } else {
        // Add new member
        const newMember = { ...data, id: crypto.randomUUID() };
        setTeamMembers(members => [...members, newMember]);
      }
      setIsFormOpen(false);
      setEditingMember(null);
    } catch (error) {
      console.error('Failed to save team member:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) {
      return;
    }

    try {
      setTeamMembers(members => members.filter(member => member.id !== id));
    } catch (error) {
      console.error('Failed to delete team member:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Our Team</h2>
        <button
          onClick={handleAddMember}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Team Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.title}</p>
              <p className="mt-2 text-sm text-gray-600">{member.bio}</p>
              <div className="mt-4 space-y-1">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Email:</span> {member.email}
                </p>
                {member.phone && (
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Phone:</span> {member.phone}
                  </p>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    LinkedIn Profile
                  </a>
                )}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <WhoWeAreForm
          initialData={editingMember}
          onSave={handleSave}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingMember(null);
          }}
        />
      )}
    </div>
  );
}