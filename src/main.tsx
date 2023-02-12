import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ChatRoomData, useChatRoomContext } from './context/context';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <div>
            <ChatRoomData>
                <Router>
                    {' '}
                    <App />
                </Router>
            </ChatRoomData>
        </div>
    </React.StrictMode>
);
