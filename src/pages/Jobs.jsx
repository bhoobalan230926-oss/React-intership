import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { JobCard, FilterPanel, LoadingSkeleton, EmptyState, Pagination } from '../components';
import SearchBar from '../components/SearchBar';
import { useJobs } from '../hooks/useContexts';

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    location: [],
    role: [],
    experience: [],
    jobType: [],
    salaryRange: [],
  });

  const { jobs, isLoading, searchJobs, filterJobs, addRecentSearch } = useJobs();
  const jobsPerPage = 9;

  // Check for role in URL params
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam) {
      setFilters(prev => ({
        ...prev,
        role: [roleParam],
      }));
    }
  }, [searchParams]);

  // Apply filters and search
  useEffect(() => {
    let results = jobs;

    // Apply search
    if (searchQuery) {
      results = searchJobs(searchQuery);
    }

    // Apply filters
    results = filterJobs({ ...filters, role: filters.role.length > 0 ? filters.role : undefined });

    setFilteredJobs(results);
    setCurrentPage(1);
  }, [jobs, searchQuery, filters, searchJobs, filterJobs]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      addRecentSearch(query);
    }
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClear = () => {
    setFilters({
      location: [],
      role: [],
      experience: [],
      jobType: [],
      salaryRange: [],
    });
    setSearchQuery('');
  };

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIdx = (currentPage - 1) * jobsPerPage;
  const paginatedJobs = filteredJobs.slice(startIdx, startIdx + jobsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Jobs
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Found {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} onRecentSearchClick={handleSearch} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <FilterPanel onFilter={handleFilter} onClear={handleClear} />
            </div>
          </div>

          {/* Main - Jobs List */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <LoadingSkeleton count={6} />
            ) : paginatedJobs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {paginatedJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            ) : (
              <EmptyState
                title="No Jobs Found"
                description="Try adjusting your search or filter criteria to find more jobs"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
