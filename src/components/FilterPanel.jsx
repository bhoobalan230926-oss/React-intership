import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const FilterPanel = ({ onFilter, onClear }) => {
  const [expanded, setExpanded] = useState({
    location: true,
    role: false,
    experience: false,
    jobType: false,
    salaryRange: false,
  });

  const [filters, setFilters] = useState({
    location: [],
    role: [],
    experience: [],
    jobType: [],
    salaryRange: [],
  });

  const filterOptions = {
    location: ['Chennai', 'Bangalore', 'Hyderabad', 'Mumbai', 'Pune', 'Remote'],
    role: [
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'Data Analyst',
      'Data Scientist',
      'DevOps Engineer',
      'UI/UX Designer',
      'Software Engineer',
    ],
    experience: ['Fresher', '0-1 Years', '1-3 Years', '3-5 Years', '5+ Years'],
    jobType: ['Full-Time', 'Part-Time', 'Internship', 'Contract', 'Remote'],
    salaryRange: [
      { label: '3 LPA+', value: '3' },
      { label: '5 LPA+', value: '5' },
      { label: '10 LPA+', value: '10' },
      { label: '15 LPA+', value: '15' },
    ],
  };

  const toggleExpanded = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleFilter = (section, value) => {
    setFilters(prev => {
      const updated = { ...prev };
      if (updated[section].includes(value)) {
        updated[section] = updated[section].filter(v => v !== value);
      } else {
        updated[section].push(value);
      }
      onFilter(updated);
      return updated;
    });
  };

  const handleClear = () => {
    const emptyFilters = {
      location: [],
      role: [],
      experience: [],
      jobType: [],
      salaryRange: [],
    };
    setFilters(emptyFilters);
    onClear();
  };

  const activeFiltersCount = Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);

  const FilterSection = ({ title, section }) => (
    <div className="border-b border-gray-200 dark:border-dark-border">
      <button
        onClick={() => toggleExpanded(section)}
        className="w-full flex items-center justify-between px-4 py-3 text-gray-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-dark-border transition"
      >
        <span>{title}</span>
        {expanded[section] ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      <AnimatePresence>
        {expanded[section] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 space-y-2 bg-gray-50 dark:bg-dark-surface/50">
              {filterOptions[section].map((option) => {
                const value = typeof option === 'object' ? option.value : option;
                const label = typeof option === 'object' ? option.label : option;
                const isChecked = filters[section].includes(value);

                return (
                  <label
                    key={value}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-border p-2 rounded transition"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleFilter(section, value)}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {label}
                    </span>
                  </label>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
        <h3 className="font-bold text-gray-900 dark:text-white">
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 text-sm bg-primary text-white rounded-full px-2 py-1">
              {activeFiltersCount}
            </span>
          )}
        </h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={handleClear}
            className="text-primary hover:text-secondary text-sm font-medium flex items-center space-x-1"
          >
            <FiX size={16} />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="divide-y divide-gray-200 dark:divide-dark-border">
        <FilterSection title="Location" section="location" />
        <FilterSection title="Role" section="role" />
        <FilterSection title="Experience" section="experience" />
        <FilterSection title="Job Type" section="jobType" />
        <FilterSection title="Salary Range" section="salaryRange" />
      </div>
    </div>
  );
};

export default FilterPanel;
