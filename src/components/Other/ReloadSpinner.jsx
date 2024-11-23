import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getPosts } from '@/src/services/api/feed';

const RefreshSpinner = ({ setter }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tooltipText, setTooltipText] = useState('Refresh');

  const handleClick = async () => {
    setIsLoading(true);
    setTooltipText('Refreshing...');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await getPosts();
      setter(response);
      setTooltipText('Refresh');
    } catch (error) {
      console.error('Error fetching data:', error);
      setTooltipText('Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="relative p-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full hover:bg-gradient-to-r from-blue-600 to-indigo-600 transition-colors duration-200 flex items-center justify-center shadow-lg"
    >
      <Loader2
        className={`h-6 w-6 text-white ${isLoading ? 'animate-spin' : ''}`}
      />
      {/* Tooltip */}
      <span
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full text-xs text-white bg-black rounded px-2 py-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        {tooltipText}
      </span>
    </button>
  );
};

export default RefreshSpinner;