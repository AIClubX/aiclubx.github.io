import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import ChatWidget from '../chat/ChatWidget';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      <ChatWidget />
    </div>
  );
}