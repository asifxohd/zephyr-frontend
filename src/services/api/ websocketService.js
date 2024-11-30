import { BASE_URL, BASE_URL_WEB_SOCKET } from "@/src/constents";

let socket = null;

export const initializeWebSocket = (userId, onMessageCallback,onStatusUpdateCallback) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log('WebSocket is already open, skipping re-connection');
        return socket; 
    }

    if (socket) {
        console.log('Closing existing WebSocket connection');
        socket.close();
    }

    console.log(`Initializing WebSocket connection for user: ${userId}`);
    socket = new WebSocket(`${BASE_URL_WEB_SOCKET}/ws/chat/${userId}/`);
    
    // WebSocket open event handler
    socket.onopen = () => {
        console.log('WebSocket connection established');
    };

    // WebSocket message event handler
    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            console.log(data);
            
            if (data) {
                if (data.type === 'status_update') {
                    console.log(`User status changed: ${data.status}`);
                    if (onStatusUpdateCallback) {
                        console.log(data,'this is the data');
                        
                        onStatusUpdateCallback(data);
                    }
                } else if (data.content_type == 'text') {
                    console.log('Received message:', data);
                    onMessageCallback(data);
                } else if (data.content_type == 'voice'){
                    console.log("kittyy ")
                }
            } else {
                console.warn('Received empty or invalid data:', event.data);
            }
        } catch (e) {
            console.error('Error parsing WebSocket message:', e);
        }
    };

    // WebSocket close event handler
    socket.onclose = (event) => {
        console.log('WebSocket connection closed', event.code, event.reason);
        if (event.code !== 1000) { 
            console.error(`WebSocket closed unexpectedly: ${event.reason}`);
            // Optional: Implement reconnection logic here
        }
    };

    // WebSocket error event handler
    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    return socket;
};

export const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log('Sending message:', message);
        socket.send(JSON.stringify(message));
    } else {
        console.error('WebSocket is not open, cannot send message');
        console.log('Current WebSocket readyState:', socket?.readyState);
    }
};


export const closeWebSocket = () => {
    if (socket) {
        if (socket.readyState === WebSocket.OPEN) {
            console.log('Closing WebSocket connection');
            socket.close();
        } else {
            console.log('WebSocket is already closed or closing');
        }
    } else {
        console.log('No WebSocket connection to close');
    }
};

export const getWebSocketInstance = () => socket;