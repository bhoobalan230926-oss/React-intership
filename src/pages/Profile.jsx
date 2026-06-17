import React from 'react';
import { FiArrowLeft, FiMail, FiPhone, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useContexts';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-primary hover:text-secondary mb-8 transition"
        >
          <FiArrowLeft size={20} />
          <span>Back</span>
        </Link>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border shadow-lg overflow-hidden"
        >
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-primary to-secondary" />

          {/* Profile Content */}
          <div className="px-6 sm:px-8 pb-8">
            {/* Profile Image */}
            <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6 -mt-16 mb-8">
              <img
                src={user?.profileImage}
                alt={user?.name}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-dark-surface shadow-lg object-cover"
              />
              <div className="flex-1 text-center sm:text-left pt-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {user?.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Information */}
            <div className="space-y-6 mb-8 pb-8 border-b border-gray-200 dark:border-dark-border">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                  Email Address
                </p>
                <div className="flex items-center space-x-3 text-gray-900 dark:text-white">
                  <FiMail className="text-primary" size={20} />
                  <span>{user?.email}</span>
                </div>
              </div>

              {user?.mobile && (
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                    Mobile Number
                  </p>
                  <div className="flex items-center space-x-3 text-gray-900 dark:text-white">
                    <FiPhone className="text-primary" size={20} />
                    <span>{user.mobile}</span>
                  </div>
                </div>
              )}

              {user?.loginTime && (
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                    Member Since
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(user.loginTime).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Link
                to="/saved-jobs"
                className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center hover:bg-blue-100 dark:hover:bg-blue-900/40 transition"
              >
                <p className="text-2xl font-bold text-primary">0</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Applications
                </p>
              </Link>
              <Link
                to="/saved-jobs"
                className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center hover:bg-green-100 dark:hover:bg-green-900/40 transition"
              >
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">0</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Interviews
                </p>
              </Link>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2"
            >
              <FiLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>

        {/* Additional Info */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-900/40">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            💡 Tip
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Complete your profile with a professional photo and detailed information to increase your chances of getting hired.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
