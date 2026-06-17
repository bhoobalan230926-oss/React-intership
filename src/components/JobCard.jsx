import React from 'react';
import { Link } from 'react-router-dom';
import { FiBookmark, FiArrowRight, FiMapPin, FiDollarSign, FiBriefcase } from 'react-icons/fi';
import { useJobs } from '../hooks/useContexts';
import { motion } from 'framer-motion';

const JobCard = ({ job }) => {
  const { saveJob, isSaved } = useJobs();
  const isBookmarked = isSaved(job.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border p-6 hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start space-x-4 flex-1">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {job.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {job.company}
            </p>
          </div>
        </div>
        <button
          onClick={() => saveJob(job.id)}
          className={`p-2 rounded-lg transition ${
            isBookmarked
              ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300'
              : 'bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-400 hover:bg-gray-200'
          }`}
        >
          <FiBookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Job Info Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <FiMapPin size={16} />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <FiDollarSign size={16} />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <FiBriefcase size={16} />
          <span>{job.jobType}</span>
        </div>
        <div className="text-gray-600 dark:text-gray-400">
          {job.experience}
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 3).map((skill, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 dark:bg-dark-border text-gray-700 dark:text-gray-300 text-xs rounded-full">
            +{job.skills.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-dark-border">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {job.postedDate}
        </span>
        <Link
          to={`/job/${job.id}`}
          className="flex items-center space-x-2 text-primary hover:text-secondary transition font-medium"
        >
          <span>View Details</span>
          <FiArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

export default JobCard;
