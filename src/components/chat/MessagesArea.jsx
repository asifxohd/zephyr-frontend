import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import { format, isToday, isYesterday } from 'date-fns';

const MessagesArea = ({ messages, selectedUser, currentUserId }) => {
    const messagesEndRef = useRef(null);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatDateHeader = (date) => {
        if (isNaN(date)) {
            console.error("Invalid date:", date);
            return "Invalid Date";
        }
        if (isToday(date)) return "Today";
        if (isYesterday(date)) return "Yesterday";
        return format(date, 'MMMM d, yyyy'); 
    };

    const groupedMessages = messages.reduce((acc, message) => {
        const messageDate = new Date(message.timestamp);
    
        // Check for invalid date, but handle it gracefully without logging errors
        if (!message.timestamp || isNaN(messageDate.getTime())) {
            return acc; // Skip the message if the timestamp is invalid or empty
        }
    
        const messageDateStr = messageDate.toDateString();
    
        // Group messages by date string
        if (!acc[messageDateStr]) {
            acc[messageDateStr] = [];
        }
        acc[messageDateStr].push(message);
    
        return acc;
    }, {});
    

    return (
        <div className="flex-1 scrollbar-hide overflow-y-auto p-6 space-y-4 bg-gray-50 border">
            {Object.entries(groupedMessages).map(([date, msgs]) => (
                <div key={date}>
                    <div className="text-center text-gray-500 text-xs my-2">
                        {formatDateHeader(new Date(date))}
                    </div>
                    {msgs.map((msg, index) => (
                        <MessageBubble 
                            key={index} 
                            message={msg} 
                            selectedUser={selectedUser} 
                            currentUserId={currentUserId} 
                        />
                    ))}
                </div>
            ))}
            <div ref={messagesEndRef} /> 
        </div>
    );
};

export default MessagesArea;