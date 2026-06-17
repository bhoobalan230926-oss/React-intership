import React from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiBriefcase } from 'react-icons/fi';
import { motion } from 'framer-motion';

const CompanyCard = ({ company }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border p-6 hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start mb-4">
        <img
          src={company.logo}
          alt={company.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {company.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {company.industry}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
        <div>
          <span className="font-semibold">Employees:</span> {company.employees}
        </div>
        <div className="flex items-center space-x-2">
          <FiBriefcase size={16} />
          <span>
            <span className="font-semibold">{company.openPositions}</span> open
            positions
          </span>
        </div>
      </div>

      {/* Footer */}
      <a
        href={`https://${company.website}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 text-primary hover:text-secondary transition font-medium"
      >
        <span>Visit Website</span>
        <FiExternalLink size={16} />
      </a>
    </motion.div>
  );
};

export default CompanyCard;
