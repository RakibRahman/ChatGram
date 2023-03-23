import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import BG from './assets/login_bg.svg';
import { ChatRoomDetailsContainer } from './components/ChatRoomDetails/ChatRoomDetailsContainer';
import { Error404 } from './components/common/Error404';
import { Loader } from './components/common/Loader/Loader';
import { SelectChatRoom } from './components/common/SelectChatRoom';
import { LeftSideBar } from './components/LeftSideBar/LeftSideBar';
import { Login } from './components/Login/Login';
import { ChatRoomDetails } from './components/TopDetailsCard/ChatRoomDetails';
import { ChatUserProfile } from './components/UserProfile/ChatUserProfile';
import { useChatRoomContext } from './context/context';
import { useMediaQuery } from './hooks/useMediaQuery';

function App() {
    const { currentUser, loading } = useChatRoomContext();
    const isAnyChatActive = localStorage.getItem('activeChat');
    const isTab = useMediaQuery('(max-width: 768px)');
    const navigate = useNavigate();

    useEffect(() => {
        if (!!isAnyChatActive && currentUser && !isTab) {
            navigate(`/chat/${isAnyChatActive}`);
        }
        if (currentUser) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (!currentUser && isTab) {
            navigate('/login');
            localStorage.removeItem('activeChat');
        }
        if (!currentUser) {
            navigate('/');
            localStorage.removeItem('activeChat');
        }
    }, []);

    if (loading) {
        return (
            <div>
                <div className="hero" style={{ backgroundImage: `url(${BG})` }}>
                    <div className="grid place-items-center  py-10 h-screen">
                        <Loader />
                    </div>
                </div>
            </div>
        );
    }
    if (isTab) {
        return (
            <div className="grid place-items-stretch max-w-full mt-1 p-1">
                <Routes>
                    {currentUser ? (
                        <Route path="/" element={<LeftSideBar />} />
                    ) : (
                        <Route path="/login" element={<Login />}></Route>
                    )}
                    <Route path="/chat/:chatRoomId" element={<ChatRoomDetailsContainer />} />
                    <Route path="/chatRoom/:chatRoomId" element={<ChatRoomDetails />} />
                    <Route path="/profile/:chatRoomId" element={<ChatUserProfile />} />

                    <Route path="*" element={<Error404 />} />
                </Routes>
            </div>
        );
    }

    return (
        <div className="App">
            {currentUser ? (
                <>
                    <div className="flex w-full overflow-hidden  mx-auto   h-full items-start">
                        <div className="w-auto h-full  p-1">
                            {currentUser ? <LeftSideBar /> : null}
                        </div>

                        <div className="flex-1  h-full border-l-2">
                            <Routes>
                                {!!isAnyChatActive ? null : (
                                    <Route path="/" element={<SelectChatRoom />} />
                                )}
                                <Route
                                    path="/chat/:chatRoomId"
                                    element={<ChatRoomDetailsContainer />}
                                />
                                <Route path="/chatRoom/:chatRoomId" element={<ChatRoomDetails />} />
                                <Route path="/profile/:chatRoomId" element={<ChatUserProfile />} />
                            </Routes>
                        </div>
                    </div>
                </>
            ) : (
                <Routes>
                    <Route path="/" element={<Login />} />
                </Routes>
            )}
        </div>
    );
}

export default App;
