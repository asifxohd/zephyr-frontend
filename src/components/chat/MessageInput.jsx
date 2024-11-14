// MessageInput.js
import React from 'react';
import { Send, Mic } from 'lucide-react';

const MessageInput = ({ message, setMessage, handleSendMessage, isRecording, setIsRecording }) => {
    return (
        <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center space-x-2 bg-gray-200 rounded-full p-1">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    placeholder="Type your message..."
                    className="flex-1 p-3 bg-transparent rounded-xl resize-none focus:outline-none text-sm"
                    rows="1"
                />
                <div className="flex items-center space-x-2 px-2">
                    <button
                        onClick={() => setIsRecording(!isRecording)}
                        className={`p-2 rounded-xl ${
                            isRecording ? 'bg-red-500 text-white' : 'text-gray-500 hover:bg-gray-200'
                        } transition-colors`}
                    >
                        <Mic className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageInput;