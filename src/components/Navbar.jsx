import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut, FiUser, FiMoon, FiSun, FiBookmark } from 'react-icons/fi';
import { useAuth } from '../hooks/useContexts';
import { useTheme } from '../hooks/useContexts';
import { useJobs } from '../hooks/useContexts';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { savedJobs } = useJobs();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              CC
            </div>
            <span className="hidden sm:inline font-bold text-lg text-gray-900 dark:text-white">
              Career Connect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link to="/jobs" className="text-gray-700 dark:text-gray-300 hover:text-primary transition">
                  Jobs
                </Link>
                <Link to="/companies" className="text-gray-700 dark:text-gray-300 hover:text-primary transition">
                  Companies
                </Link>
                <Link to="/saved-jobs" className="relative text-gray-700 dark:text-gray-300 hover:text-primary transition">
                  <FiBookmark size={20} />
                  {savedJobs.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {savedJobs.length}
                    </span>
                  )}
                </Link>
                <div className="flex items-center space-x-4 pl-4 border-l border-gray-200 dark:border-dark-border">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-dark-surface text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
                  </button>
                  <div className="relative group">
                    <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition">
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="hidden sm:inline text-gray-700 dark:text-gray-300 text-sm">
                        {user.name}
                      </span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-surface rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible">
                      <Link to="/profile" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border first:rounded-t-lg">
                        <FiUser className="inline mr-2" /> Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border last:rounded-b-lg"
                      >
                        <FiLogOut className="inline mr-2" /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-dark-surface text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>
                <Link
                  to="/login"
                  className="px-4 py-2 text-primary hover:text-secondary transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-surface text-gray-900 dark:text-white"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-dark-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user ? (
                <>
                  <Link
                    to="/jobs"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Jobs
                  </Link>
                  <Link
                    to="/companies"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Companies
                  </Link>
                  <Link
                    to="/saved-jobs"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Saved Jobs ({savedJobs.length})
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 bg-primary text-white rounded-lg text-center hover:bg-secondary transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
