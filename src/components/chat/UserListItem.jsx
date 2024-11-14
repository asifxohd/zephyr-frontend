// UserListItem.js
import React from 'react';

const UserListItem = ({ user, selectedUser, handleUserSelect }) => {
    return (
        <div
            onClick={() => handleUserSelect(user)}
            className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedUser?.id === user.id ? 'bg-blue-50' : ''
            }`}
        >
            <div className="relative">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <span
                    className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                        user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                />
            </div>
            <div className="ml-4 flex-1">
                <div className="flex justify-between items-start">
                    <h3 className="text-sm font-semibold text-gray-800">{user.name}</h3>
                    <span className="text-xs text-gray-400">{user.time}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1 truncate">{user.lastMessage}</p>
            </div>
        </div>
    );
};

export default UserListItem;