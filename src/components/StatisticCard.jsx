import React from 'react';
import { motion } from 'framer-motion';

const StatisticCard = ({ icon: Icon, title, value, color = 'bg-blue-100 dark:bg-blue-900' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {value}
          </p>
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <Icon size={28} className="text-blue-600 dark:text-blue-400" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatisticCard;
