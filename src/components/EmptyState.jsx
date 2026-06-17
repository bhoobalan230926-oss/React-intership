import React from 'react';
import { FiSearch } from 'react-icons/fi';

const EmptyState = ({ title = 'No Results Found', description = 'Try adjusting your search or filters' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-gray-300 dark:text-gray-600 mb-4">
        <FiSearch size={64} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
