import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { ChatRoomDetailsContainer } from './components/ChatRoomDetails.tsx/ChatRoomDetailsContainer';
import { Error404 } from './components/common/Error404';
import { SelectChatRoom } from './components/common/SelectChatRoom';
import { LeftSideBar } from './components/LeftSideBar/LeftSideBar';
import { Login } from './components/Login/Login';
import { useChatRoomContext } from './context/context';
import { useMediaQuery } from './hooks/useMediaQuery';
function App() {
    const { currentUser } = useChatRoomContext();
    const isAnyChatActive = localStorage.getItem('activeChat');
    const isTab = useMediaQuery('(max-width: 768px)');
    const location = useLocation();
    const navigate = useNavigate();

    console.log(currentUser, isTab);

    useEffect(() => {
        if (!isTab && !currentUser) {
            navigate('/');
        }
        if (!!isAnyChatActive) {
            navigate(`/${isAnyChatActive}`);
        }
    }, []);
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
                    <div className="flex w-screen overflow-hidden  mx-auto p-10  h-screen items-start">
                        {currentUser ? <LeftSideBar /> : null}

                        <div className="divider divider-horizontal"></div>
                        <Routes>
                            {!!isAnyChatActive ? null : (
                                <Route path="/" element={<SelectChatRoom />} />
                            )}
                            <Route
                                path="/chat/:chatRoomId"
                                element={<ChatRoomDetailsContainer />}
                            />
                        </Routes>
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
