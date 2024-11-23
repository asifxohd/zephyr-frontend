import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
      const roomID = getUrlParams().get('roomID') || randomID(5);
      let myMeeting = async (element) => {
      const appID = 608944670;
      const serverSecret = "d5a596daf3cabcc8a74b1575c8311208";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Copy link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, 
        },
      });

    
  };

  return (
   <div
  className="myCallContainer"
  ref={myMeeting}
  style={{
    width: '90vw',            // 90% of the viewport width
    height: '79vh',           // 10% of the viewport height
    maxWidth: '100%',         // Ensure it doesn't exceed 100% width on smaller screens
    maxHeight: '100vh',       // Prevent overflow on height in case of small screens
    margin: '0 auto',         // Center horizontally
    padding: '10px',          // Padding for spacing inside
    borderRadius: '8px',      // Rounded corners for a modern look
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
    backgroundColor: '#ffffff', // White background for clarity
    display: 'flex',           // Flexbox for future content alignment
    justifyContent: 'center',  // Center content horizontally within the container
    alignItems: 'center',      // Center content vertically within the container
    overflow: 'hidden',        // Prevent overflow if content exceeds bounds
  }}
></div>

  );
}
