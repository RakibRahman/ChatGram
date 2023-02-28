import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { ChatRoomDetailsContainer } from './components/ChatRoomDetails.tsx/ChatRoomDetailsContainer';
import { Error404 } from './components/common/Error404';
import { Loader } from './components/common/Loader/Loader';
import { SelectChatRoom } from './components/common/SelectChatRoom';
import { LeftSideBar } from './components/LeftSideBar/LeftSideBar';
import { Login } from './components/Login/Login';
import { ChatRoomDetails } from './components/TopDetailsCard/ChatRoomDetails';
import { UserProfile } from './components/UserProfile/UserProfile';
import { useChatRoomContext } from './context/context';
import { useMediaQuery } from './hooks/useMediaQuery';
import BG from './assets/login_bg.svg';

function App() {
    const { currentUser, loading } = useChatRoomContext();
    const isAnyChatActive = localStorage.getItem('activeChat');
    const isTab = useMediaQuery('(max-width: 768px)');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isTab && !currentUser) {
            navigate('/');
        }

        if (!!isAnyChatActive && currentUser) {
            console.log({ isAnyChatActive });
            navigate(`/${isAnyChatActive}`);
        }
    }, [currentUser, isAnyChatActive]);

    if (loading) {
        return <div>
            <div className="hero" style={{ backgroundImage: `url(${BG})` }}>
                <div className="grid place-items-center  py-10 h-screen">
                    <Loader />
                </div>
            </div>
        </div>;
    }
    if (isTab) {
        return (
            <div className="grid place-items-stretch max-w-full mt-10 px-4">
                <Routes>
                    {currentUser ? (
                        <Route path="/" element={<LeftSideBar />} />
                    ) : (
                        <Route path="/login" element={<Login />}></Route>
                    )}
                    <Route path="/chat/:chatRoomId" element={<ChatRoomDetailsContainer />} />
                    <Route path="/chatRoom/:chatRoomId" element={<ChatRoomDetails />} />
                    <Route path="/profile/:chatRoomId" element={<UserProfile />} />

                    <Route path="*" element={<Error404 />} />
                </Routes>
            </div>
        );
    }

    return (
        // <div>
        //     {currentUser ? (
        //         <div className=" flex w-screen overflow-hidden  mx-auto p-10  h-screen items-start">
        //             {currentUser ? <div className='flex w-full '> <LeftSideBar />
        //                 <SelectChatRoom />
        //             </div> : null}
        //             <div className="divider divider-horizontal"></div>
        //             <Routes>
        //                 {/* <Route path="/login" element={<Login />}></Route> */}
        //                 {/* <Route path="/" element={<p>hello</p>} /> */}
        //                 {/* {!!isAnyChatActive ? null : <Route path="/" element={<SelectChatRoom />} />} */}
        //                 <Route path="/chat/:chatRoomId" element={<ChatRoomDetailsContainer />} />

        //                 <Route path="*" element={<Error404 />} />
        //             </Routes>
        //         </div>
        //     ) : (
        //         <Routes>
        //             <Route path="/" element={<Login />}></Route>
        //         </Routes>
        //     )}
        // </div>
        <div className="App">
            {currentUser ? (
                <>
                    <div className="flex w-screen overflow-hidden  mx-auto px-10 pt-4  h-screen items-start gap-4">
                        {/* {currentUser ? <LeftSideBar /> : null} */}

                        {/* <Routes>
                            {!!isAnyChatActive ? null : (
                                <Route path="/" element={<SelectChatRoom />} />
                            )}
                            <Route
                                path="/chat/:chatRoomId"
                                element={<ChatRoomDetailsContainer />}
                            />
                        </Routes> */}
                        <div className="w-1/4 h-full">{currentUser ? <LeftSideBar /> : null}</div>

                        <div className="flex-1  h-full">
                            <Routes>
                                {!!isAnyChatActive ? null : (
                                    <Route path="/" element={<SelectChatRoom />} />
                                )}
                                <Route
                                    path="/chat/:chatRoomId"
                                    element={<ChatRoomDetailsContainer />}
                                />
                                <Route path="/chatRoom/:chatRoomId" element={<ChatRoomDetails />} />
                                <Route path="/profile/:chatRoomId" element={<UserProfile />} />
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
