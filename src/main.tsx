import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ChatRoomData, useChatRoomContext } from './context/context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <>
            <ChatRoomData>
                <App />
            </ChatRoomData>
        </>
    </React.StrictMode>
);
