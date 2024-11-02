import React from "react";
import ReactDOM from "react-dom";
import { X, AlertCircle, CheckCircle } from "lucide-react"; 

const BlockConfirmationModal = ({ isOpen, onClose, onConfirm, message, confirmText = "Confirm", cancelText = "Cancel" }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 relative space-y-6">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        {/* Icon and Message */}
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="text-red-500" size={48} />
          <h3 className="text-xl font-semibold text-gray-800 text-center">{message}</h3>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 text-white flex items-center space-x-2 hover:bg-red-700 transition"
          >
            <CheckCircle size={20} />
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portel-one")
  );
};

export default BlockConfirmationModal;
