import React from 'react';
import { FaThumbsUp, FaComment, FaShare, FaPlusCircle } from 'react-icons/fa';

const PostSection = ({ openModal }) => {
  return (
    <div className="w-full max-w-2xl px-3">
      <div className="mb-2 bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
        <img
          src="https://cdn3.pixelcut.app/web/tools/workflow_remove_background_thumbnail.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <input
          type="text"
          placeholder="What's on your mind?"
          className="flex-1 p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
          disabled
        />
        <button
          className="bg-blue-400 text-white p-2 rounded-full ml-2 flex items-center justify-center"
          onClick={openModal}
        >
          <FaPlusCircle className="text-xl" />
        </button>
      </div>

      <div className="space-y-5">
        <div className="bg-white p-5 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <img
              src="https://assets.vogue.in/photos/637b18a8abfaf7db94442b01/1:1/w_1440,h_1440,c_limit/Kendall%20Jenner.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="text-gray-800 font-semibold">Alice Smith</h3>
              <p className="text-gray-500 text-sm">2 hours ago</p>
            </div>
          </div>
          <p className="text-gray-800 mb-4">Had a great meeting today with the team!</p>
          <img
            src="https://www.carrushome.com/media/2018/01/2018-Jeep-Wrangler-Rubicon-by-Mopar-Static-3-1920x1200.jpg"
            alt="Post"
            className="w-full rounded-lg mb-4"
          />
          <div className="flex justify-between">
            <button className="flex items-center text-gray-600 hover:text-blue-500">
              <FaThumbsUp className="mr-2 text-lg" /> Like
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-500">
              <FaComment className="mr-2 text-lg" /> Comment
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-500">
              <FaShare className="mr-2 text-lg" /> Share
            </button>
          </div>
        </div>
        {/* Add more posts similarly */}
      </div>
    </div>
  );
};

export default PostSection;
