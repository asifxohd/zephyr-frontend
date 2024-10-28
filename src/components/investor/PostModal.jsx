import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const PostModal = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="bg-white p-6 rounded-lg shadow-lg mx-auto my-auto max-w-lg w-full"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h3 className="text-gray-800 text-lg font-semibold mb-4">Create a Post</h3>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
      />
      <textarea
        placeholder="What's on your mind?"
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        rows="4"
      />
      <input
        type="file"
        className="mb-4"
      />
      <div className="flex justify-end">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Post
        </button>
      </div>
    </Modal>
  );
};

export default PostModal;
