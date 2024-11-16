import { BASE_URL } from "@/src/constents";

let socket = null;

export const initializeWebSocket = (userId, onMessageCallback) => {
    // Check if socket already exists and is open
    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log('WebSocket is already open, skipping re-connection');
        return socket; // If WebSocket is already open, just return it
    }

    // If socket exists, close it before initializing a new connection
    if (socket) {
        console.log('Closing existing WebSocket connection');
        socket.close();
    }

    // Initialize a new WebSocket connection
    console.log(`Initializing WebSocket connection for user: ${userId}`);
    socket = new WebSocket(BASE_URL + `ws/chat/${userId}/`);

    // WebSocket open event handler
    socket.onopen = () => {
        console.log('WebSocket connection established');
    };

    // WebSocket message event handler
    socket.onmessage = (event) => {
        console.log(event);
        
        try {
            const data = JSON.parse(event.data);
            if (data) {
                if (data) {
                    console.log('Received message:', data);
                    onMessageCallback(data); 
                }
                if (data.status) {
                    
                    console.log(`User status changed: ${data.status}`);
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
        if (event.code !== 1000) { // Code 1000 indicates normal closure
            console.error(`WebSocket closed unexpectedly: ${event.reason}`);
        }
    };

    // WebSocket error event handler
    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    return socket;
};

export const sendMessage = (message) => {
    if (socket) {
        if (socket.readyState === WebSocket.OPEN) {
            console.log('Sending message:', message);
            socket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not open, cannot send message');
            console.log('Current WebSocket readyState:', socket.readyState);
        }
    } else {
        console.error('WebSocket is not initialized');
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
