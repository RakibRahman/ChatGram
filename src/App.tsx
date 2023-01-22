import { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate,
} from 'react-router-dom';
import './App.css';
import { ChatRoom } from './components/ChatRoom';
import { ChatRoomDetailsContainer } from './components/ChatRoomDetails.tsx/ChatRoomDetailsContainer';
import { Login } from './components/Login/Login';
import { ChatRoomData, useChatRoomContext } from './context/context';

function App() {
    const { currentUser, loading, userError, signOut } = useChatRoomContext();
    // useEffect(() => {
    //     if (!currentUser) {
    //         navigate('/login');

    //     }
    //     if (currentUser) {

    //         navigate('/')
    //     }

    // }, [currentUser]);

    return (
        <div data-theme="aqua">
            <Router>
                <ChatRoomData>
                    <Routes>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/" element={<ChatRoom />} />
                        <Route
                            path=":chatRoomId"
                            element={<ChatRoomDetailsContainer />}
                        />
                    </Routes>
                </ChatRoomData>
            </Router>
        </div>
    );
}

export default App;
