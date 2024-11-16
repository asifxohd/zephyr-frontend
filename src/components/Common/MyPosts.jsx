import React, { useState } from 'react';
import { Edit, Trash, MapPin, Clock } from 'lucide-react';
import Modal from './Modal';
import { handleConfirmPostDelete } from '@/src/services/api/feed';
import EditPostModal from './EditPostModal';

const PostDisplay = ({ post, onEdit, onDelete }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const handleEdit = () => setShowEditModal(true);
    const handleDelete = () => setShowDeleteModal(true);
    const toggleSave = () => setIsSaved(!isSaved);

    const handleConfirmDelete = async () => {
        onDelete(post.id);
        setShowDeleteModal(false);
        try {
            const response = await handleConfirmPostDelete(post.id);
            console.log(response);
            
        } catch (error) {
            console.error('Error deleting post:', error);

        } finally {
            setShowDeleteModal(false);
        }
    };

    const handleSaveEdit = async () => {
        await onEdit();
        setShowEditModal(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} seconds ago`;
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        }
    };

    return (
        <div className="bg-white rounded-xl mt-3 shadow-lg overflow-hidden max-w-sm transition-all duration-300 hover:shadow-xl">
            {/* Image Container */}
            <div className="relative group">
                <img
                    src={post.image ? post.image : 'https://imgs.search.brave.com/anfqR2Ugp5RSUqjDVO_gWU7LgnXf3ZThbPAY_zHCzbY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YTIuZGV2LnRvL2R5/bmFtaWMvaW1hZ2Uv/d2lkdGg9ODAwLGhl/aWdodD0sZml0PXNj/YWxlLWRvd24sZ3Jh/dml0eT1hdXRvLGZv/cm1hdD1hdXRvL2h0/dHBzOi8vY2RuLmhh/c2hub2RlLmNvbS9y/ZXMvaGFzaG5vZGUv/aW1hZ2UvdXBsb2Fk/L3YxNjU4OTA0MjMy/NjMzLzNocHVJLUt3/NC5wbmc'}
                    alt={post.id}
                    className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Floating Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                        onClick={handleEdit}
                        className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-blue-50 transition-colors duration-200"
                    >
                        <Edit size={16} className="text-blue-600" />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-red-50 transition-colors duration-200"
                    >
                        <Trash size={16} className="text-red-600" />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.caption}</p>

                {/* Meta Information */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                        <MapPin size={14} className="mr-1" />
                        <span>{post.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Clock size={14} className="mr-1" />
                        <div>{formatDate(post.created_at)}</div>
                    </div>
                </div>

                {/* Interaction Buttons */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-4">
                        <span className="text-xs">Likes: {post.total_likes}</span>
                        <span className="text-xs">Comments: {post.total_comments}</span>
                    </div>
                    <div className="flex space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                            {/* Share button, if needed */}
                        </button>
                        <button
                            onClick={toggleSave}
                            className={`p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 ${isSaved ? 'text-blue-500' : 'text-gray-600'
                                }`}
                        >
                            {/* Bookmark icon if needed */}
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <EditPostModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                post={post}
                handleSaveEdit={handleSaveEdit}
            />
            
            
            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <div className="bg-white p-6 rounded-xl ">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                        <Trash className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Delete Post</h2>
                    <p className="text-gray-600 text-center mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
                    <div className="flex justify-end space-x-2">
                        <button
                            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                            onClick={handleConfirmDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default PostDisplay;
