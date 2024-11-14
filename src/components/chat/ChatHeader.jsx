// ChatHeader.js
import React from 'react';
import { Phone, Video, MoreHorizontal } from 'lucide-react';

const ChatHeader = ({ selectedUser }) => {
    return (
        <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <img
                            src={selectedUser.avatar}
                            alt={selectedUser.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                        />
                        <span
                            className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                                selectedUser.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                            }`}
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">{selectedUser.name}</h2>
                        <p className="text-sm text-gray-500">
                            {selectedUser.status === 'online' ? 'Active now' : `Last seen ${selectedUser.time}`}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                        <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                        <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;