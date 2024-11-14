import React, { useState } from 'react';
import { Search, Users, UserPlus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import ReactDOM from 'react-dom';
import { BASE_URL } from '@/src/constents';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('portel-one')
  );
};

const FollowStats = ({ followers, following }) => {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const UserList = ({ users, title }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filterUsers = (users) => {
      return users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    const filteredUsers = filterUsers(users);

    return (
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-9 h-9 text-sm bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
          {filteredUsers.map((user) => (
            <div
              key={user.email}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <img
                src={user.avatar_image ? BASE_URL + user.avatar_image : 'https://thumbs.dreamstime.com/b/icon-profile-color-green-icon-profile-color-green-circle-color-dark-green-background-color-white-194702090.jpg'}
                alt={user.email}
                className="w-10 h-10 rounded-full object-cover border border-gray-100"
              />
              <div className="min-w-0">
                <h4 className="font-medium text-sm truncate">{user.name}</h4>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          ))}
          {filteredUsers.length === 0 && (
            <p className="text-center text-sm text-gray-500 py-3">No users found</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => setShowFollowers(true)}
        className="flex items-center space-x-1.5 text-sm hover:bg-gray-50 py-1.5 rounded-full transition-colors"
      >
        <Users className="h-4 w-4 text-gray-600" />
        <span className="font-semibold">{followers.length}</span>
        <span className="text-gray-600 text-xs">Followers</span>
      </button>

      <button
        onClick={() => setShowFollowing(true)}
        className="flex items-center space-x-1.5 text-sm hover:bg-gray-50 py-1.5 rounded-full transition-colors"
      >
        <UserPlus className="h-4 w-4 text-gray-600" />
        <span className="font-semibold">{following.length}</span>
        <span className="text-gray-600 text-xs">Following</span>
      </button>

      <Modal
        isOpen={showFollowers}
        onClose={() => setShowFollowers(false)}
        title="Followers"
      >
        <UserList users={followers} title="Followers" />
      </Modal>

      <Modal
        isOpen={showFollowing}
        onClose={() => setShowFollowing(false)}
        title="Following"
      >
        <UserList users={following} title="Following" />
      </Modal>
    </div>
  );
};

export default FollowStats;
