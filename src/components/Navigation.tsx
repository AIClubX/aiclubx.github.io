import { Menu, X, Brain } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/chapters', label: 'Chapters' },
    { path: '/events', label: 'Events' },
    { path: '/resources', label: 'Resources' },
  ];

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Brain className="h-8 w-8 text-white" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {user.role === 'club_admin' && (
                    <Link
                      to="/admin"
                      className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => logout()}
                    className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/join"
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-400"
                  >
                    Join Us
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-100 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-indigo-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <>
                {user.role === 'club_admin' && (
                  <Link
                    to="/admin"
                    className="text-indigo-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="text-indigo-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-indigo-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/join"
                  className="text-indigo-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Join Us
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}