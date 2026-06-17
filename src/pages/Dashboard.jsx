import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiUsers, FiBookmark, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useJobs } from '../hooks/useContexts';
import { useAuth } from '../hooks/useContexts';
import { JobCard, StatisticCard, LoadingSkeleton } from '../components';
import SearchBar from '../components/SearchBar';

const Dashboard = () => {
  const { jobs, savedJobs, isLoading, getStatistics } = useJobs();
  const { user } = useAuth();
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setFeaturedJobs(jobs.slice(0, 6));
    setStats(getStatistics());
  }, [jobs, getStatistics]);

  const categories = [
    { name: 'Frontend Developer', count: 12, icon: '💻' },
    { name: 'Backend Developer', count: 8, icon: '⚙️' },
    { name: 'Full Stack Developer', count: 15, icon: '🔗' },
    { name: 'Data Scientist', count: 5, icon: '📊' },
    { name: 'UI/UX Designer', count: 6, icon: '🎨' },
    { name: 'DevOps Engineer', count: 4, icon: '🚀' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary dark:from-gray-800 dark:to-gray-700 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-lg text-blue-100 dark:text-gray-300">
              Explore thousands of amazing job opportunities
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <SearchBar onSearch={() => {}} onRecentSearchClick={() => {}} />
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats && (
            <>
              <StatisticCard
                icon={FiBriefcase}
                title="Active Jobs"
                value={stats.totalJobs}
              />
              <StatisticCard
                icon={FiUsers}
                title="Companies"
                value={stats.companiesHiring}
              />
              <StatisticCard
                icon={FiTrendingUp}
                title="Internships"
                value={stats.internshipsAvailable}
              />
              <StatisticCard
                icon={FiBookmark}
                title="Saved Jobs"
                value={stats.savedJobs}
              />
            </>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Featured Jobs */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Featured Jobs
            </h2>
            <Link
              to="/jobs"
              className="text-primary hover:text-secondary font-semibold transition"
            >
              View All →
            </Link>
          </div>

          {isLoading ? (
            <LoadingSkeleton count={3} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Browse by Role
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Link
                  to={`/jobs?role=${encodeURIComponent(category.name)}`}
                  className="bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{category.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {category.count} positions
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trending Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Stay Ahead of Competition
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Discover the latest job trends, skill requirements, and career growth opportunities in your field.
              </p>
              <Link
                to="/jobs"
                className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition"
              >
                <span>Explore Jobs</span>
                <FiTrendingUp size={20} />
              </Link>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                    🎯
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Personalized Matches
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Find jobs tailored to your skills
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-white font-bold">
                    ⚡
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Quick Applications
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Apply with just one click
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
