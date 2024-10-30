import React from 'react';

const PremiumCard = () => {
  return (
    <div className="w-full ml-5 max-lg:hidden md:w-2/4 bg-gray-50 shadow-lg rounded-lg">
      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
        <h2 className="text-gray-800 text-lg font-semibold mb-4">Upgrade to Premium</h2>
        <p className="text-gray-600 text-sm mb-4">Start with a 7-day free trial and get access to exclusive features:</p>
        <ul className="list-disc list-inside mb-4 text-gray-700 text-sm">
          <li>Unlimited Meetings</li>
          <li>Priority Support</li>
          <li>Advanced Analytics</li>
          <li>Custom Branding</li>
        </ul>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full w-full font-semibold hover:bg-yellow-600 transition">
          Start Free Trial
        </button>
      </div>

      <div className="p-6 mt-5 bg-white rounded-lg border border-gray-200 shadow-md">
        <h2 className="text-gray-800 text-lg font-semibold mb-4">Upgrade to Premium</h2>
        <p className="text-gray-600 text-sm mb-4">Start with a 7-day free trial and get access to exclusive features:</p>
        <ul className="list-disc list-inside mb-4 text-gray-700 text-sm">
          <li>Unlimited Meetings</li>
          <li>Priority Support</li>
          <li>Advanced Analytics</li>
          <li>Custom Branding</li>
        </ul>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full w-full font-semibold hover:bg-yellow-600 transition">
          Start Free Trial
        </button>
      </div>
    </div>
  );
};

export default PremiumCard;
