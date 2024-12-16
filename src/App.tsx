import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/layouts/MainLayout';

// Page imports
import Home from './pages/Home';
import About from './pages/About';
import Resources from './pages/Resources';
import AILearning from './pages/resources/AILearning';
import Chapters from './pages/Chapters';
import Events from './pages/Events';
import Join from './pages/auth/Join';
import Login from './pages/auth/Login';
import Contact from './pages/Contact';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';

// Admin imports
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ChatConfig from './pages/admin/ChatConfig';
import EventsManager from './pages/admin/events/EventsManager';
import EventRegistrations from './pages/admin/events/EventRegistrations';
import JobsManager from './pages/admin/resources/JobsManager';
import ProjectsManager from './pages/admin/resources/ProjectsManager';
import LearningManager from './pages/admin/resources/LearningManager';
import ContributorsManager from './pages/admin/contributors/ContributorsManager';
import SettingsManager from './pages/admin/settings/SettingsManager';
import MembersManager from './pages/admin/members/MembersManager';
import ChaptersManager from './pages/admin/chapters/ChaptersManager';
import AboutManager from './pages/admin/about/AboutManager';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['club_admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="chat-config" element={<ChatConfig />} />
              <Route path="events" element={<EventsManager />} />
              <Route path="events/:eventId/registrations" element={<EventRegistrations />} />
              <Route path="resources/jobs" element={<JobsManager />} />
              <Route path="resources/projects" element={<ProjectsManager />} />
              <Route path="resources/learning" element={<LearningManager />} />
              <Route path="contributors" element={<ContributorsManager />} />
              <Route path="settings" element={<SettingsManager />} />
              <Route path="members" element={<MembersManager />} />
              <Route path="chapters" element={<ChaptersManager />} />
              <Route path="about" element={<AboutManager />} />
            </Route>

            {/* Public routes */}
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="resources" element={<Resources />} />
              <Route path="resources/learning" element={<AILearning />} />
              <Route path="chapters" element={<Chapters />} />
              <Route path="events" element={<Events />} />
              <Route path="join" element={<Join />} />
              <Route path="login" element={<Login />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;