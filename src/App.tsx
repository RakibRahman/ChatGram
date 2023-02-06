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
import { ChatRoomList } from './components/ChatRoomList/ChatRoomList';
import { LeftSideBar } from './components/LeftSideBar/LeftSideBar';
import { Login } from './components/Login/Login';
import { useChatRoomContext } from './context/context';

function App() {
    const { currentUser, loading, userError, signOut } = useChatRoomContext();

    return (
        <div data-theme="aqua">
            <Router>
                {currentUser ? (
                    <div className=" flex max-w-7xl  mx-auto px-4 border border-green-500 h-screen py-16 items-start gap-6">
                        {currentUser ? <LeftSideBar /> : null}

                        <Routes>
                            {/* <Route path="/login" element={<Login />}></Route> */}
                            {/* <Route path="/" element={<ChatRoom />} /> */}
                            <Route
                                path=":chatRoomId"
                                element={<ChatRoomDetailsContainer />}
                            />
                        </Routes>
                    </div>
                ) : (
                    <Routes>
                        <Route path="/" element={<Login />}></Route>
                    </Routes>
                )}
            </Router>
        </div>
    );
}

export default App;
