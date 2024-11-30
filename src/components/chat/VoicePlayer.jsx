import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const VoicePlayer = ({ audioSrc, isSentByCurrentUser }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState('0:00');
    
    const audioRef = useRef(null);

    // Format time in mm:ss
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    // Play/Pause handler
    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Metadata loaded handler to get duration
    const onLoadedMetadata = () => {
        if (audioRef.current) {
            console.log(audioRef.current?.duration);
            
            setDuration(formatTime(audioRef.current.duration));
        }
    };

    // Reset on end
    const onEnded = () => {
        setIsPlaying(false);
    };

    return (
        <div 
            className={`
                w-full max-w-md h-16 rounded-xl shadow-md flex items-center px-4 space-x-3
                ${isSentByCurrentUser 
                    ? 'bg-gradient-to-r from-blue-100 to-blue-200' 
                    : 'bg-gray-100'
                }
                transition-all duration-300 ease-in-out
            `}
        >
            {/* Play/Pause Button */}
            <button 
                onClick={togglePlayPause} 
                className={`
                    p-2 rounded-full transition-all duration-300 ease-in-out
                    ${isSentByCurrentUser
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }
                `}
            >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            {/* Audio Duration */}
            <span className="text-sm text-gray-600">
                {duration}
            </span>

            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src={audioSrc}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={onEnded}
            />
        </div>
    );
};

export default VoicePlayer;