import React from 'react';
import { format } from 'date-fns';
import MessageStatus from './MessageStatus';

const MessageBubble = ({ message, selectedUser, currentUserId }) => {

    const isSentByCurrentUser = message.sender === currentUserId;
    const formattedTime = format(new Date(message.timestamp), 'p');
    
    const currentUserAvatar = "https://images.vexels.com/content/145908/preview/male-avatar-maker-2a7919.png";

    const renderMessageContent = () => {
        switch (message.content_type) {
            case 'text':
                return (
                    <p className="text-[15px] leading-relaxed font-normal">
                        {message.content}
                    </p>
                );
            case 'image':
                return (
                    <div className="relative overflow-hidden">
                        <img
                            src={message.image}
                            alt="Sent image"
                            className="rounded-xl max-w-xs max-h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                );
            case 'voice':
                return (
                    <div className="rounded-xl overflow-hidden bg-black/5">
                        <audio controls className="w-full h-10">
                            <source src={message.voice} type="audio/mpeg" />
                        </audio>
                    </div>
                );
            default:
                return <p className="text-red-500">Unknown content type</p>;
        }
    };

    return (
        <div className={`flex items-start gap-2 mb-6 ${isSentByCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="relative flex-shrink-0">
                <img
                    src={isSentByCurrentUser ?  selectedUser.avatar :currentUserAvatar }
                    alt={`${isSentByCurrentUser ? 'Your' : 'User'} avatar`}
                    className="w-6 h-6 rounded-full mb-1"
                />
            </div>
            <div className="relative max-w-[85%] md:max-w-[70%]">
                <div
                    className={`
                        relative p-3 
                        ${isSentByCurrentUser ? 
                            'bg-gradient-to-br from-indigo-500 via-blue-600 to-blue-700 text-white rounded-t-2xl rounded-bl-2xl rounded-br-sm' : 
                            'bg-gray-100 text-gray-800 rounded-t-2xl rounded-br-2xl rounded-bl-sm'
                        }
                    `}
                >
                    <div className="relative z-10">
                        {renderMessageContent()}
                    </div>
                </div>
                
                {/* Message Tail */}
                <div 
                    className={`
                        absolute bottom-0
                        ${isSentByCurrentUser ? 
                            'right-0 border-r-[10px] border-r-blue-700' : 
                            'left-0 border-l-[10px] border-l-gray-100'
                        }
                        border-b-transparent 
                    `}
                />
                
                <div 
                    className={`
                        mt-1 flex items-center gap-2 text-xs font-medium
                        ${isSentByCurrentUser ? 'justify-end text-gray-500' : 'justify-start text-gray-400'}
                    `}
                >
                    <span>{formattedTime}</span>
                    {isSentByCurrentUser && (
                        <div className="scale-75 opacity-80">
                            <MessageStatus status={message.status} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;