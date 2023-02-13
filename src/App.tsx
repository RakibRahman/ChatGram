import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { ChatRoomDetailsContainer } from './components/ChatRoomDetails.tsx/ChatRoomDetailsContainer';
import { SelectChatRoom } from './components/common/SelectChatRoom';
import { LeftSideBar } from './components/LeftSideBar/LeftSideBar';
import { Login } from './components/Login/Login';
import { useChatRoomContext } from './context/context';

function App() {
    const { currentUser, themeName } = useChatRoomContext();
    const isAnyChatActive = localStorage.getItem('activeChat');

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            localStorage.removeItem('activeChat');
        }
    }, [location]);

    return (
        <div>
            {currentUser ? (
                <div className=" flex w-screen overflow-hidden  mx-auto p-10  h-screen items-start">
                    {currentUser ? <LeftSideBar /> : null}
                    <div className="divider divider-horizontal"></div>
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
