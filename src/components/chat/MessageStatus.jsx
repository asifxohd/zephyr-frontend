// MessageStatus.js
import React from 'react';
import { Check } from 'lucide-react';

const MessageStatus = ({ status }) => {
    switch (status) {
        case 'sent':
            return (
                <div className="inline-flex ml-1">
                    <Check className="w-4 h-4 text-gray-400" />
                </div>
            );
        case 'delivered':
            return (
                <div className="inline-flex ml-1">
                    <Check className="w-4 h-4 text-gray-400" />
                    <Check className="w-4 h-4 text-gray-400 -ml-1" />
                </div>
            );
        case 'read':
            return (
                <div className="inline-flex ml-1">
                    <Check className="w-4 h-4 text-green-500" />
                    <Check className="w-4 h-4 text-green-500 -ml-1" />
                </div>
            );
        default:
            return null;
    }
};

export default MessageStatus;