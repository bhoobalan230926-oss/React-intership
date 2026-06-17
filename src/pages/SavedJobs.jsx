import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useJobs } from '../hooks/useContexts';
import { JobCard, EmptyState } from '../components';

const SavedJobs = () => {
  const { getSavedJobDetails, saveJob, isLoading } = useJobs();
  const savedJobs = getSavedJobDetails();

  const handleRemove = (jobId) => {
    saveJob(jobId);
    toast.success('Job removed from saved');
  };

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
            Saved Jobs
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You have {savedJobs.length} saved job{savedJobs.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Jobs Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        ) : savedJobs.length > 0 ? (
          <div className="space-y-4">
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col md:flex-row md:items-center gap-4 bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex-1">
                  <JobCard job={job} />
                </div>
                <button
                  onClick={() => handleRemove(job.id)}
                  className="md:flex-shrink-0 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition flex items-center justify-center space-x-2"
                >
                  <FiTrash2 size={20} />
                  <span className="md:hidden">Remove</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Saved Jobs"
            description="Start saving jobs to view them later"
          />
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
