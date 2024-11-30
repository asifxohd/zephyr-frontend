import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, StopCircle } from 'lucide-react';

const MessageInput = ({ 
    message, 
    setMessage, 
    handleSendMessage, 
    isRecording, 
    setIsRecording,
    handleSendAudioMessage 
}) => {
    const [recordingTime, setRecordingTime] = useState(0);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const timerRef = useRef(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                handleSendAudioMessage(audioBlob);
                audioChunksRef.current = [];
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);

            // Start timer
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

            console.log('Audio recording started');
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            
            // Stop timer
            clearInterval(timerRef.current);
            setRecordingTime(0);

            console.log('Audio recording stopped');
        }
    };

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
                    {isRecording ? (
                        <div className="flex items-center">
                            <span className="text-red-500 mr-2">{recordingTime}s</span>
                            <button
                                onClick={stopRecording}
                                className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                            >
                                <StopCircle className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={startRecording}
                            className="p-2 text-gray-500 hover:bg-gray-200 rounded-xl transition-colors"
                        >
                            <Mic className="w-5 h-5" />
                        </button>
                    )}
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