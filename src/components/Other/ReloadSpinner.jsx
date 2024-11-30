import React, { useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { getPosts } from '@/src/services/api/feed';

const RefreshSpinner = ({ setter }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tooltipText, setTooltipText] = useState('Refresh feed');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    setTooltipText('Refreshing...');
    setShowSuccess(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await getPosts();
      setter(response);
      setTooltipText('Feed updated!');
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setTooltipText('Refresh feed');
      }, 2000);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTooltipText('Failed to refresh');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`
          relative
          p-3
          rounded-xl
          transform
          transition-all duration-300 ease-in-out
          ${isLoading ? 
            'bg-indigo-600 shadow-indigo-500/50' : 
            'bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
          }
          hover:shadow-lg hover:shadow-indigo-500/50
          hover:-translate-y-0.5
          active:translate-y-0
          disabled:opacity-75 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        `}
      >
        <div className="relative">
          {!isLoading && !showSuccess && (
            <RefreshCw 
              className={`
                h-2 w-2 text-white
                transform transition-transform duration-300
                group-hover:rotate-180
              `}
            />
            
          )}
          {isLoading && (
            <Loader2 
              className="h-5 w-5 text-white animate-spin"
            />
          )}
          {showSuccess && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                className="h-5 w-5 text-white animate-scale-check" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          )}
        </div>

        {/* Ripple effect */}
        {isLoading && (
          <span className="absolute inset-0 rounded-xl animate-ping-slow bg-white/20" />
        )}
      </button>

      {/* Enhanced floating tooltip */}
      <div className={`
        absolute -bottom-12 left-1/2 -translate-x-1/2
        px-4 py-2
        bg-gray-900/95 backdrop-blur-sm
        text-white text-sm font-medium
        rounded-lg
        opacity-0 group-hover:opacity-100
        transition-all duration-200
        whitespace-nowrap
        shadow-xl
        before:content-['']
        before:absolute
        before:-top-2
        before:left-1/2
        before:-translate-x-1/2
        before:border-4
        before:border-transparent
        before:border-b-gray-900/95
        ${showSuccess ? 'text-green-400' : ''}
        ${isLoading ? 'text-indigo-300' : ''}
      `}>
        {tooltipText}
      </div>
    </div>
  );
};

// Add custom animation for the success checkmark
const styles = `
  @keyframes scale-check {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes ping-slow {
    75%, 100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }

  .animate-scale-check {
    animation: scale-check 0.3s ease-out forwards;
  }

  .animate-ping-slow {
    animation: ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
`;

// Add styles to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default RefreshSpinner;