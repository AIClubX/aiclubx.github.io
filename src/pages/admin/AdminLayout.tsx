import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNav from '../../components/AdminNav';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-white border-r border-gray-200">
            <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
              </div>
              <div className="mt-5 flex-grow">
                <AdminNav />
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}