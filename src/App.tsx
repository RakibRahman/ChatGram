import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { ChatRoom } from './components/ChatRoom';
import { ChatRoomDetailsContainer } from './components/ChatRoomDetails.tsx/ChatRoomDetailsContainer';
import { ChatRoomData } from './context/context';

function App() {
    return (
        <Router>
            <ChatRoomData>
                <Routes>
                    <Route path="/" element={<ChatRoom />} />
                    <Route
                        path=":chatRoomId"
                        element={<ChatRoomDetailsContainer />}
                    />
                </Routes>
            </ChatRoomData>
        </Router>
    );
}

export default App;
