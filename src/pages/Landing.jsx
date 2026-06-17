import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Landing = () => {
  const features = [
    {
      title: 'Smart Search',
      description: 'Find the perfect job with our advanced search and filtering options',
      icon: '🔍',
    },
    {
      title: 'Instant Notifications',
      description: 'Get notified about new job postings matching your profile',
      icon: '🔔',
    },
    {
      title: 'Save for Later',
      description: 'Bookmark interesting jobs and review them at your convenience',
      icon: '💾',
    },
    {
      title: 'Company Insights',
      description: 'Learn more about companies and their culture before applying',
      icon: '🏢',
    },
    {
      title: 'Easy Apply',
      description: 'Apply to jobs with just one click from your profile',
      icon: '✅',
    },
    {
      title: 'Career Growth',
      description: 'Track your applications and grow your career',
      icon: '📈',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary dark:from-gray-800 dark:to-gray-700 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Find Your Dream Job Today
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-blue-100 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Discover thousands of job opportunities from top companies and take the next step in your career.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/register"
              className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition flex items-center justify-center space-x-2"
            >
              <span>Get Started</span>
              <FiArrowRight size={20} />
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Career Connect?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We make it easy to find and apply for jobs that match your skills and aspirations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white dark:bg-dark-surface rounded-lg p-8 border border-gray-200 dark:border-dark-border hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">10,000+</p>
              <p className="text-gray-600 dark:text-gray-400">Active Job Listings</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">500+</p>
              <p className="text-gray-600 dark:text-gray-400">Hiring Companies</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">50,000+</p>
              <p className="text-gray-600 dark:text-gray-400">Successful Placements</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Next Opportunity?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of job seekers who have already found their dream job.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-2 bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            <span>Start Your Search</span>
            <FiArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
