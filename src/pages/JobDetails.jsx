import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBookmark, FiShare2, FiMapPin, FiDollarSign, FiBriefcase, FiClock, FiUsers } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useJobs } from '../hooks/useContexts';
import { motion } from 'framer-motion';
import EmptyState from '../components/EmptyState';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById, saveJob, isSaved } = useJobs();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const jobData = getJobById(id);
    if (jobData) {
      setJob(jobData);
    }
  }, [id, getJobById]);

  const isBookmarked = job && isSaved(job.id);

  const handleSaveJob = () => {
    if (job) {
      saveJob(job.id);
      toast.success(isBookmarked ? 'Job removed from saved' : 'Job saved successfully!');
    }
  };

  const handleApply = () => {
    setApplied(true);
    toast.success('Application submitted! Good luck!');
    setTimeout(() => {
      navigate('/saved-jobs');
    }, 1500);
  };

  const handleShare = () => {
    if (navigator.share && job) {
      navigator.share({
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-primary hover:text-secondary mb-8 transition"
          >
            <FiArrowLeft size={20} />
            <span>Go Back</span>
          </button>
          <EmptyState title="Job Not Found" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-primary hover:text-secondary mb-8 transition font-medium"
        >
          <FiArrowLeft size={20} />
          <span>Go Back</span>
        </button>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border shadow-lg p-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
            <div className="flex items-start space-x-4 mb-6 md:mb-0">
              <img
                src={job.companyLogo}
                alt={job.company}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {job.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {job.company}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Posted {job.postedDate}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-border transition"
              >
                <FiShare2 size={20} />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                onClick={handleSaveJob}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                  isBookmarked
                    ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300'
                    : 'bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                <FiBookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
                <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-dark-border">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                Location
              </p>
              <div className="flex items-center space-x-2 text-gray-900 dark:text-white font-semibold">
                <FiMapPin size={18} />
                <span>{job.location}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                Salary
              </p>
              <div className="flex items-center space-x-2 text-gray-900 dark:text-white font-semibold">
                <FiDollarSign size={18} />
                <span>{job.salary}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                Job Type
              </p>
              <div className="flex items-center space-x-2 text-gray-900 dark:text-white font-semibold">
                <FiBriefcase size={18} />
                <span>{job.jobType}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                Experience
              </p>
              <div className="flex items-center space-x-2 text-gray-900 dark:text-white font-semibold">
                <FiUsers size={18} />
                <span>{job.experience}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              About This Role
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Responsibilities
            </h3>
            <ul className="space-y-3">
              {job.responsibilities.map((resp, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-3 text-gray-700 dark:text-gray-300"
                >
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Requirements
            </h3>
            <ul className="space-y-3">
              {job.requirements.map((req, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-3 text-gray-700 dark:text-gray-300"
                >
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {job.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Company Info */}
          <div className="bg-gray-50 dark:bg-dark-border rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              About {job.company}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {job.about}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">
                  Industry
                </p>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {job.industry}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">
                  Employees
                </p>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {job.employees}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">
                  Website
                </p>
                <a
                  href={`https://${job.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary font-semibold"
                >
                  Visit
                </a>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleApply}
              disabled={applied}
              className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {applied ? '✓ Application Submitted' : 'Apply Now'}
            </button>
            <button
              onClick={handleSaveJob}
              className={`flex-1 py-3 rounded-lg font-semibold border transition ${
                isBookmarked
                  ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 border-red-300 dark:border-red-800'
                  : 'bg-white dark:bg-dark-surface text-gray-900 dark:text-white border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border'
              }`}
            >
              {isBookmarked ? '❤️ Saved' : '🤍 Save Job'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobDetails;
