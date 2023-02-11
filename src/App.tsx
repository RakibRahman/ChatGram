import { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { ChatRoomDetailsContainer } from './components/ChatRoomDetails.tsx/ChatRoomDetailsContainer';
import { LeftSideBar } from './components/LeftSideBar/LeftSideBar';
import { Login } from './components/Login/Login';
import { SelectChatRoom } from './components/common/SelectChatRoom';
import { useChatRoomContext } from './context/context';

function App() {
    const { currentUser, themeName } = useChatRoomContext();
    const isAnyChatActive = localStorage.getItem('activeChat');

    const location = useLocation();

    useEffect(() => {
        console.log('loc', location);
        if (location.pathname === '/') {
            localStorage.removeItem('activeChat');
        }
    }, [location]);
    return (
        <div data-theme={themeName}>
            {currentUser ? (
                <div className=" flex max-w-7xl  mx-auto px-4 border border-green-500 h-screen py-16 items-start gap-6">
                    {currentUser ? <LeftSideBar /> : null}

                    <Routes>
                        {/* <Route path="/login" element={<Login />}></Route> */}
                        {/* <Route path="/" element={<ChatRoom />} /> */}
                        {!!isAnyChatActive ? null : <Route path="/" element={<SelectChatRoom />} />}
                        <Route path=":chatRoomId" element={<ChatRoomDetailsContainer />} />
                    </Routes>
                </div>
            ) : (
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                </Routes>
            )}
        </div>
    );
}

export default App;
