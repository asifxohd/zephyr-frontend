// ChatPage.js (Main Component)
import React, { useState, useEffect, useRef } from 'react';
import { fetchMessagingUsers, fetchConversationMessages } from '@/src/services/api/chat';
import { BASE_URL_IMG } from '@/src/constents';
import ChatHeader from '@/src/components/chat/ChatHeader';
import MessagesArea from '@/src/components/chat/MessagesArea';
import MessageInput from '@/src/components/chat/MessageInput';
import SearchBar from '@/src/components/chat/SearchBar';
import UsersList from '@/src/components/chat/UsersList';
import useCurrentUser from '@/src/hooks/useCurrentUser';
import { initializeWebSocket, closeWebSocket, sendMessage } from '@/src/services/api/ websocketService';

const ChatPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const currentUser = useCurrentUser();

    const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=random&name=";
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetchMessagingUsers();
                setUsers(response);
                if (response.length > 0) {
                    handleUserSelect(formatUserForDisplay(response[0]));
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            const ws = initializeWebSocket(selectedUser.id, handleIncomingMessage);
            console.log(ws);
            
            
        }
    }, [selectedUser]); 
    const formatUserForDisplay = (user) => {
        return {
            id: user.user_id,
            name: user.user_name,
            status: user.status.toLowerCase(),
            avatar: user.avatar_image
                ? `${BASE_URL_IMG}${user.avatar_image}`
                : `${DEFAULT_AVATAR}${encodeURIComponent(user.user_name)}`,
            lastMessage: user.last_message || 'No messages',
            lastSeen: user.last_seen_time || 'Unknown',
            time: user.last_seen_time
                ? new Date(user.last_seen_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : ''
        };
    };

    const filteredUsers = users
        .filter((user) => user.user_name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(formatUserForDisplay);

    const handleUserSelect = async (user) => {
        if (selectedUser?.id === user.id) return; 
        setSelectedUser(user);
        try {
            const conversationMessages = await fetchConversationMessages(user.id);
            console.log("Fetched conversation messages:", conversationMessages);
            setMessages(conversationMessages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleIncomingMessage = (data) => {
        if (data.message) {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    content: data.message,
                    sender_id: data.sender_id,
                    timestamp: new Date(data.timestamp),
                    content_type: data.content_type,
                },
            ]);
        }

        if (data.status && data.user_id === currentUser.user_id) {
            console.log(`User status changed: ${data.status}`);
        }
    };

    const handleSendMessage = () => {
        if (!message.trim() || !selectedUser) return; 

        const newMessage = {
            message: message,
            sender_id: currentUser.user_id,
            receiver_id: selectedUser.id,
            content_type: 'text',
            timestamp: new Date().toISOString(),
        };

        sendMessage(newMessage);

        setMessages([...messages, { ...newMessage, content: message }]);
        setMessage(''); 
    };

    return (
        <div className="flex h-[576px] bg-gray-100">
            <div className="flex-1 flex flex-col bg-white">
                {selectedUser ? (
                    <>
                        <ChatHeader selectedUser={selectedUser} />
                        <MessagesArea messages={messages} selectedUser={selectedUser} currentUserId={currentUser.user_id} />
                        <MessageInput
                            message={message}
                            setMessage={setMessage}
                            handleSendMessage={handleSendMessage}
                            isRecording={isRecording}
                            setIsRecording={setIsRecording}
                        />
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-gray-500">Select a conversation to start messaging</p>
                    </div>
                )}
            </div>

            <div className="w-80 max-lg:hidden overflow-y-scroll bg-white scrollbar-hide shadow-xl ml-5">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <UsersList
                    filteredUsers={filteredUsers}
                    selectedUser={selectedUser}
                    handleUserSelect={handleUserSelect}
                />
            </div>
        </div>
    );
};

export default ChatPage;
