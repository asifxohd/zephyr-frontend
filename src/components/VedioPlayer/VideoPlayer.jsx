import React from 'react';

const VideoPlayer = ({ url }) => {
    return (
        <video
            controls
            className="w-full h-60 rounded-md"
            poster={url} 
            autoPlay
        >
            <source src={url} type="video/mp4" />
        </video>
    );
};

export default VideoPlayer;
