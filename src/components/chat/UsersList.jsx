import React from 'react';
import UserListItem from './UserListItem';

const UsersList = ({ filteredUsers, selectedUser, handleUserSelect }) => {
    return (
        <div
            className={`overflow-y-auto h-[calc(100vh-5rem)] ${
                filteredUsers.length ? 'scrollbar-hide' : 'overflow-y-scroll'
            }`}
        >
            {filteredUsers.map((user) => (
                <UserListItem
                    key={user.id}
                    user={user}
                    selectedUser={selectedUser}
                    handleUserSelect={handleUserSelect}
                />
            ))}
        </div>
    );
};

export default UsersList;