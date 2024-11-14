import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Camera,
  Loader,
  Trash,
  Image as ImageIcon
} from 'lucide-react';
import { handlePostUpload } from '@/src/services/api/feed';
import usegeoaddress from "usegeoaddress";
import useCurrentUser from '@/src/hooks/useCurrentUser';


const PostModal = ({ isOpen, onClose, onUpdate }) => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const maxChars = 2200;
  const { address } = usegeoaddress();
  const user = useCurrentUser()

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileDelete = () => {
    setFile(null);
  };

  const handlePost = async () => {
	if (!file && !caption.trim()){
		return;
	}
	// setIsLoading(true);
    const formData = new FormData();
	formData.append('caption', caption);
    if (file) {
        formData.append('image', file);
    }
	const loc = address.village+ " "+ address.state_district
	formData.append('location', loc)
	console.log(user.user_id)
	formData.append('user',parseInt(user.user_id))
	
	try {
		const response = await handlePostUpload(formData);
		console.log(response);
	} catch (error) {
		console.log(error);
	}finally{
		onClose();
		onUpdate(true);
	}

  };

  const modalContent = (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-md w-full max-w-4xl flex flex-col">
        {/* Header */}
        <div className="relative border-b px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg font-medium">New Post</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-1 min-h-[500px]">
          {/* Left Side - Upload and Caption */}
          <div className="w-1/2 p-4 border-r">
            {/* Upload Area */}
            <div
              className={`border ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              } p-8 flex flex-col items-center justify-center h-60`}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragging(false);
              }}
            >
              <Camera className="w-8 h-8 text-gray-400 mb-4" />
              <p className="text-sm text-gray-500 mb-4">Drag photo here</p>
              <label className="px-4 py-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-600 rounded">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                Select File
              </label>
            </div>

            {/* Caption */}
            <div className="mt-6">
              <textarea
                className="w-full p-3 border text-sm border-gray-200 resize-none focus:outline-none focus:border-blue-500 rounded"
                placeholder="Write a caption..."
                rows={8}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={maxChars}
              />
              <div className="flex items-center justify-between mt-2">
                
                <span className="text-sm text-gray-400">
                  {caption.length}/{maxChars}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Image Preview */}
          <div className="w-1/2 p-4 bg-gray-50">
            {file ? (
              <div className="relative ">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={handleFileDelete}
                  className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full hover:bg-black/70"
                >
                  <Trash className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <ImageIcon className="w-16 h-16 mb-4" />
                <p className="text-lg">No image selected</p>
                <p className="text-sm">Upload an image to see preview here</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="border-t p-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handlePost}
            disabled={!file && !caption.trim() || isLoading}
            className={`px-4 py-2 text-white rounded flex items-center gap-2
              ${!file && !caption.trim() || isLoading
                ? 'bg-gray-300'
                : 'bg-blue-500 hover:bg-blue-600'
              }`}
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Posting...
              </>
            ) : (
              'Share'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.getElementById('portel-one'));
};

export default PostModal;