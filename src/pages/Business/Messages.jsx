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
    const [isMobileUsersView, setIsMobileUsersView] = useState(true);
    const currentUser = useCurrentUser();
    const webSocketRef = useRef(null);

    const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=random&name=";

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

    const changeWebsockerStatus = (data) => {
        const updatedUsers = users.map((user) => {
            if (user.user_id === data.user_id) {
                return {
                    ...user,
                    status: data.status,
                };
            }
            return user;
        });
    
        setUsers(updatedUsers);
    };

    useEffect(() => {
        if (selectedUser) {
            webSocketRef.current = initializeWebSocket(
                currentUser.user_id,
                handleIncomingMessage,
                changeWebsockerStatus
            );
        }

        return () => {
            if (webSocketRef.current) {
                webSocketRef.current.close(); 
                webSocketRef.current = null; 
            }
        };
    }, [selectedUser]);

    const formatUserForDisplay = (user) => {
        return {
            conversation_id: user.conversation_id,
            id: user.user_id,
            name: user.user_name,
            status: user.status.toLowerCase(), 
            avatar: user.avatar_image ? `${BASE_URL_IMG}${user.avatar_image}` : `${DEFAULT_AVATAR}${encodeURIComponent(user.user_name)}`,
            lastMessage: user.last_message || 'No messages',
            lastSeen: user.last_seen_time ? new Date(user.last_seen_time).toLocaleString([], {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}) : 'Unknown',
            time: user.status === 'online' ? 'Online' : (user.last_seen_time ? new Date(user.last_seen_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }): '')
        };
    };

    const filteredUsers = users
        .filter((user) => user.user_name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(formatUserForDisplay);

    const handleUserSelect = async (user) => {
        if (selectedUser?.id === user.id) return; 
        setSelectedUser(user);
        setIsMobileUsersView(false);
        try {
            const conversationMessages = await fetchConversationMessages(user.id);
            console.log(conversationMessages);
            
            setMessages(conversationMessages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleIncomingMessage = (data) => {
        
        if (data && data.sender) {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: data.id, 
                    sender: data.sender,  
                    content_type: data.content_type,
                    content: data.content,
                    image: data.image || null,
                    voice: data.voice || null,
                    status: data.status || null,
                    timestamp: new Date(data.timestamp),
                }
            ]);
        }
    
        if (data.type === 'status_update') {
            setUsers(prevUsers => 
                prevUsers.map(user => 
                    user.user_id === data.user_id 
                        ? {...user, status: data.status, last_seen_time: new Date().toISOString()} 
                        : user
                )
            );
        }
    };
// #################################################################
const handleSendAudioMessage = async (data) => {
    console.log(data);

    const blobToBase64 = (blob) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]); 
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });

    try {
        const audioBase64 = await blobToBase64(data);

        const newMessage = {
            message: message, 
            sender_id: currentUser.user_id,
            receiver_id: selectedUser.id,
            content_type: 'audio',
            timestamp: new Date().toISOString(),
            conversation_id: selectedUser.conversation_id || null,
            audio_data: audioBase64, 
        };

        sendMessage(newMessage);
        console.log('Audio message sent:', newMessage);
    } catch (error) {
        console.error('Error preparing audio message:', error);
    }
};

// #################################################################

    const handleSendMessage = () => {
        if (!message.trim() || !selectedUser) return;     
        const newMessage = {
            message: message,
            sender_id: currentUser.user_id,
            receiver_id: selectedUser.id,
            content_type: 'message',
            timestamp: new Date().toISOString(),
            conversation_id: selectedUser.conversation_id || null,
        };

        sendMessage(newMessage);
        setMessage(''); 
        console.log(filteredUsers);
    };

    const renderMobileUsersList = () => (
        <div className="w-full h-full">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <UsersList
                filteredUsers={filteredUsers}
                selectedUser={selectedUser}
                handleUserSelect={handleUserSelect}
            />
        </div>
    );

    // Mobile View - Chat Area with Back Button
    const renderMobileChatArea = () => (
        <div className="flex-1 flex flex-col bg-white w-full">
            {/* Back to Users Button */}
            <div className="p-2 border-b">
                <button 
                    onClick={() => setIsMobileUsersView(true)}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 mr-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                        />
                    </svg>
                    Back to Chats
                </button>
            </div>

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
                        handleSendAudioMessage={handleSendAudioMessage}
                    />
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500">Select a conversation to start messaging</p>
                </div>
            )}
        </div>
    );

    return (
        <>
            {/* Mobile/Tablet Responsive View */}
            <div className="lg:hidden h-[576px] bg-gray-100">
                {isMobileUsersView 
                    ? renderMobileUsersList() 
                    : renderMobileChatArea()}
            </div>

            {/* Desktop View */}
            <div className="max-lg:hidden  flex h-[576px] bg-gray-100">
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

                <div className="w-80 overflow-y-scroll bg-white scrollbar-hide shadow-xl ml-5">
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <UsersList
                        filteredUsers={filteredUsers}
                        selectedUser={selectedUser}
                        handleUserSelect={handleUserSelect}
                    />
                </div>
            </div>
        </>
    );
};

export default ChatPage;