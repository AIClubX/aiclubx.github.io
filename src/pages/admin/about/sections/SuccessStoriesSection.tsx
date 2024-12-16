import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { SuccessStory } from '../../../../types/about';
import SuccessStoryForm from '../forms/SuccessStoryForm';
import { useSuccessStoriesStore } from '../../../../stores/successStoriesStore';

export default function SuccessStoriesSection() {
  const { stories, addStory, updateStory, deleteStory } = useSuccessStoriesStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);

  const handleAddStory = () => {
    setEditingStory(null);
    setIsFormOpen(true);
  };

  const handleEdit = (story: SuccessStory) => {
    setEditingStory(story);
    setIsFormOpen(true);
  };

  const handleSave = async (data: Omit<SuccessStory, 'id'>) => {
    try {
      if (editingStory) {
        const updatedStory = { ...data, id: editingStory.id };
        updateStory(editingStory.id, updatedStory);
      } else {
        const newStory = { ...data, id: crypto.randomUUID() };
        addStory(newStory);
      }
      setIsFormOpen(false);
      setEditingStory(null);
    } catch (error) {
      console.error('Failed to save story:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this story?')) {
      return;
    }

    try {
      deleteStory(id);
    } catch (error) {
      console.error('Failed to delete story:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Success Stories</h2>
        <button
          onClick={handleAddStory}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Story
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {story.image && (
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{story.title}</h3>
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    story.category === 'member' ? 'bg-blue-100 text-blue-800' :
                    story.category === 'chapter' ? 'bg-green-100 text-green-800' :
                    story.category === 'project' ? 'bg-purple-100 text-purple-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(story)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(story.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">{story.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                {new Date(story.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <SuccessStoryForm
          story={editingStory}
          onSave={handleSave}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingStory(null);
          }}
        />
      )}
    </div>
  );
}