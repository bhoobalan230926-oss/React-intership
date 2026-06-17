import React, { useState, useMemo } from 'react';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useJobs } from '../hooks/useContexts';
import { CompanyCard, EmptyState } from '../components';
import { motion } from 'framer-motion';

const Companies = () => {
  const { companies, isLoading } = useJobs();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompanies = useMemo(() => {
    if (!searchQuery.trim()) return companies;
    const query = searchQuery.toLowerCase();
    return companies.filter(
      company =>
        company.name.toLowerCase().includes(query) ||
        company.industry.toLowerCase().includes(query)
    );
  }, [companies, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link
            to="/"
            className="flex items-center space-x-2 text-primary hover:text-secondary transition"
          >
            <FiArrowLeft size={20} />
            <span>Back</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Top Companies
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore companies and their job openings
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <FiSearch className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies by name or industry..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Companies Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Loading companies...</p>
          </div>
        ) : filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company, idx) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <CompanyCard company={company} />
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Companies Found"
            description="Try searching with different keywords"
          />
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">
              {companies.length}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Active Companies
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">
              {companies.reduce((sum, c) => sum + c.openPositions, 0)}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Total Openings
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">
              {new Set(companies.map(c => c.industry)).size}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Industries
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
