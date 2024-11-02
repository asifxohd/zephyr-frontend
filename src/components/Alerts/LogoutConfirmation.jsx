import React from 'react';
import { LogOut, Info, CheckCircle } from "lucide-react";

const LogoutConfirmation = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
        <div className="flex items-center gap-4 mb-4">
          <LogOut className="w-8 h-8 text-red-600" />
          <h2 className="text-xl font-semibold text-gray-900">Sign Out Confirmation</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Are you sure you want to sign out? You'll need to sign in again to access your account.
        </p>
        <div className="flex items-center gap-3 mb-4">
          <Info className="w-5 h-5 text-gray-500" />
          <span className="text-gray-600">Your progress will be saved.</span>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-gray-600">You can log back in anytime.</span>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="mr-4 rounded-lg border border-gray-300 bg-transparent hover:bg-gray-100 transition-colors px-6 py-2 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors px-6 py-2"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
