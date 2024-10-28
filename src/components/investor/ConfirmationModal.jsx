import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-4 sm:mx-0">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Confirm Logout</h2>
        <p className="text-gray-700 mb-4">
          Are you sure you want to log out? Logging out will end your current session and you will need to log in again to access your account. 
          If you have any unsaved changes, make sure to save them before proceeding. 
          This action cannot be undone and any temporary data may be lost.
        </p>
        
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-400 text-white py-2 px-4 rounded-full hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
