import React, { createContext, useState, useCallback, useEffect } from 'react';
import jobsData from '../data/jobs.json';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load jobs and saved jobs from localStorage on mount
  useEffect(() => {
    setIsLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setJobs(jobsData.jobs);
        setCompanies(jobsData.companies);
        
        const storedSavedJobs = localStorage.getItem('career_connect_saved_jobs');
        if (storedSavedJobs) {
          setSavedJobs(JSON.parse(storedSavedJobs));
        }
        
        const storedSearches = localStorage.getItem('career_connect_recent_searches');
        if (storedSearches) {
          setRecentSearches(JSON.parse(storedSearches));
        }
        
        setIsLoading(false);
      }, 500);
    } catch (err) {
      console.error('Error loading jobs:', err);
      setIsLoading(false);
    }
  }, []);

  const saveJob = useCallback((jobId) => {
    setSavedJobs(prev => {
      const isAlreadySaved = prev.includes(jobId);
      const updated = isAlreadySaved ? prev.filter(id => id !== jobId) : [...prev, jobId];
      localStorage.setItem('career_connect_saved_jobs', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getSavedJobDetails = useCallback(() => {
    return jobs.filter(job => savedJobs.includes(job.id));
  }, [jobs, savedJobs]);

  const addRecentSearch = useCallback((query) => {
    if (!query.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== query);
      const updated = [query, ...filtered].slice(0, 5);
      localStorage.setItem('career_connect_recent_searches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('career_connect_recent_searches');
  }, []);

  const searchJobs = useCallback((query) => {
    if (!query.trim()) return jobs;
    const lowerQuery = query.toLowerCase();
    return jobs.filter(job =>
      job.title.toLowerCase().includes(lowerQuery) ||
      job.company.toLowerCase().includes(lowerQuery) ||
      job.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
    );
  }, [jobs]);

  const filterJobs = useCallback((criteria) => {
    let filtered = [...jobs];

    if (criteria.location && criteria.location.length > 0) {
      filtered = filtered.filter(job => criteria.location.includes(job.location));
    }

    if (criteria.role && criteria.role.length > 0) {
      filtered = filtered.filter(job => criteria.role.includes(job.title));
    }

    if (criteria.experience && criteria.experience.length > 0) {
      filtered = filtered.filter(job => criteria.experience.includes(job.experience));
    }

    if (criteria.jobType && criteria.jobType.length > 0) {
      filtered = filtered.filter(job => criteria.jobType.includes(job.jobType));
    }

    if (criteria.salaryRange && criteria.salaryRange.length > 0) {
      filtered = filtered.filter(job => {
        const jobSalary = parseInt(job.salary.split('-')[0]);
        return criteria.salaryRange.some(range => {
          if (range === '3') return jobSalary >= 3;
          if (range === '5') return jobSalary >= 5;
          if (range === '10') return jobSalary >= 10;
          if (range === '15') return jobSalary >= 15;
          return true;
        });
      });
    }

    return filtered;
  }, [jobs]);

  const getJobById = useCallback((id) => {
    return jobs.find(job => job.id === parseInt(id));
  }, [jobs]);

  const getCompanyById = useCallback((company) => {
    return companies.find(c => c.name === company);
  }, [companies]);

  const getStatistics = useCallback(() => {
    return {
      totalJobs: jobs.length,
      companiesHiring: companies.length,
      internshipsAvailable: jobs.filter(j => j.jobType === 'Internship').length,
      savedJobs: savedJobs.length,
    };
  }, [jobs, companies, savedJobs]);

  const value = {
    jobs,
    companies,
    savedJobs,
    recentSearches,
    isLoading,
    saveJob,
    getSavedJobDetails,
    addRecentSearch,
    clearRecentSearches,
    searchJobs,
    filterJobs,
    getJobById,
    getCompanyById,
    getStatistics,
    isSaved: (jobId) => savedJobs.includes(jobId),
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};
