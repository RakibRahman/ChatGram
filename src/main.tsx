import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ChatRoomData } from './context/context';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <>
            <ChatRoomData>
                <Router>
                    <App />
                </Router>
            </ChatRoomData>
        </>
    </React.StrictMode>
);
