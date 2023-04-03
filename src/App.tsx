import { Route, Routes } from 'react-router-dom';
import './App.css';
import BG from './assets/wave.svg';
// import ChatRoomDetailsContainer from './components/ChatRoomDetails/ChatRoomDetailsContainer';
import { Error404 } from './components/common/Error404';
import { Loader } from './components/common/Loader/Loader';
import { SelectChatRoom } from './components/common/SelectChatRoom';
import { LeftSideBar } from './components/LeftSideBar/LeftSideBar';
import { Login } from './components/Login/Login';
// import ChatRoomDetails from './components/TopDetailsCard/ChatRoomDetails';
// import { ChatUserProfile } from './components/UserProfile/ChatUserProfile';
import { lazy, Suspense } from 'react';
import { useChatRoomContext } from './context/context';
import { useMediaQuery } from './hooks/useMediaQuery';

const ChatRoomDetailsContainer = lazy(
    () => import('./components/ChatRoomDetails/ChatRoomDetailsContainer')
);
const ChatRoomDetails = lazy(() => import('./components/TopDetailsCard/ChatRoomDetails'));
const ChatUserProfile = lazy(() => import('./components/UserProfile/ChatUserProfile'));

function App() {
    const { currentUser, loading } = useChatRoomContext();
    const isAnyChatActive = localStorage.getItem('activeChat');
    const isTab = useMediaQuery('(max-width: 768px)');

    if (loading) {
        return (
            <div className="hero" style={{ backgroundImage: `url(${BG})` }}>
                <div className="grid place-items-center  py-10 h-screen">
                    <Loader />
                </div>
            </div>
        );
    }

    if (isTab) {
        return (
            <div className="grid place-items-stretch max-w-full">
                <Suspense
                    fallback={
                        <div className="mt-20">
                            <Loader />
                        </div>
                    }
                >
                    <Routes>
                        {currentUser ? (
                            <Route path="/" element={<LeftSideBar />} />
                        ) : (
                            <Route path="/" element={<Login />}></Route>
                        )}
                        <Route path="/chat/:chatRoomId" element={<ChatRoomDetailsContainer />} />
                        <Route path="/chatRoom/:chatRoomId" element={<ChatRoomDetails />} />
                        <Route path="/profile/:chatRoomId" element={<ChatUserProfile />} />

                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </Suspense>
            </div>
        );
    }
    console.log({ isAnyChatActive });
    return (
        <div className="App">
            {currentUser ? (
                <>
                    <div className="flex w-full overflow-hidden  mx-auto   h-full items-start">
                        <div className="w-96 h-full  p-1">
                            {currentUser ? <LeftSideBar /> : null}
                        </div>

                        <div className="flex-1  h-[100dvh] border-l-2">
                            <Suspense
                                fallback={
                                    <div className="mt-20">
                                        <Loader />
                                    </div>
                                }
                            >
                                <Routes>
                                    {!!isAnyChatActive ? (
                                        <Route path="/" element={<p>hello</p>} />
                                    ) : (
                                        <Route path="/" element={<SelectChatRoom />} />
                                    )}
                                    <Route
                                        path="/chat/:chatRoomId"
                                        element={<ChatRoomDetailsContainer />}
                                    />
                                    <Route
                                        path="/chatRoom/:chatRoomId"
                                        element={<ChatRoomDetails />}
                                    />
                                    <Route
                                        path="/profile/:chatRoomId"
                                        element={<ChatUserProfile />}
                                    />
                                    <Route path="*" element={<Error404 />} />
                                </Routes>
                            </Suspense>
                        </div>
                    </div>
                </>
            ) : (
                <Routes>
                    <Route path="*" element={<Error404 />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            )}
        </div>
    );
}

export default App;
