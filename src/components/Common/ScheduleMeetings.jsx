import React, { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// Function to generate a random ID
const randomID = (len = 5) => {
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  return Array(len)
    .fill(null)
    .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
    .join('');
};

// Function to get URL parameters
const getUrlParams = (url = window.location.href) => {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
};

const ScheduleMeetings = () => {
  const myMeeting = useRef(null);
  const zegoInstance = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Cleanup function to handle component unmount
    return () => {
      if (zegoInstance.current) {
        zegoInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const initializeZegoCloud = async () => {
      if (isInitialized || !myMeeting.current) return;

      try {
        const roomID = getUrlParams().get('roomID') || randomID(5);
        const appID = 608944670;
        const serverSecret = "d5a596daf3cabcc8a74b1575c8311208";
        
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomID,
          randomID(5),  // userID
          randomID(5)   // userName
        );

        zegoInstance.current = ZegoUIKitPrebuilt.create(kitToken);

        await zegoInstance.current.joinRoom({
          container: myMeeting.current,
          sharedLinks: [
            {
              name: 'Copy link',
              url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall,
          },
          showPreJoinView: true,  // Add this to prevent automatic joining
        });

        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize ZEGO Cloud:', error);
      }
    };

    initializeZegoCloud();
  }, [isInitialized]);

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{
        width: '90vw',
        height: '79vh',
        maxWidth: '100%',
        maxHeight: '100vh',
        margin: '0 auto',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    />
  );
};

export default ScheduleMeetings;