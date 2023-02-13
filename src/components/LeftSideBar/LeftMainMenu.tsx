import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatRoomContext } from '../../context/context';
import { updateUserOnlineStatus } from '../apiOperations';
import { Avatar } from '../common/Avatar/Avatar';
import { Drawer } from '../common/Drawer';
import { ThemeSelector } from '../common/ThemeSelector';
import { CreateChatRoom } from '../CreateChatRoom/CreateChatRoom';
import GroupIcon from '../../assets/group.png';
import ThemeIcon from '../../assets/theme.png';

export const LeftMainMenu = () => {
    const { currentUser, signOut } = useChatRoomContext();
    const userId = useRef(currentUser?.uid);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    return (
        <div>
            <button className="btn btn-sm rounded-md " onClick={() => setIsOpen(true)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="square"
                        strokeLinejoin="round"
                        d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                    />
                </svg>
            </button>
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="flex flex-col items-start gap-2  h-full">
                    <div className=" space-y-1 my-10 px-4">
                        <Avatar name={currentUser?.displayName!} img={currentUser?.photoURL!} />
                        <h2 className="text-md font-medium">{currentUser?.displayName}</h2>
                    </div>
                    <div className="hover:bg-slate-100  w-full p-4">
                        {currentUser ? (
                            <button
                                onClick={() => setIsOpenModal(true)}
                                className=" bg-transparent border-0 flex  items-center gap-3 hover:bg-transparent"
                            >
                                <img src={GroupIcon} alt="group" className="w-8 h-8 object-cover" />{' '}
                                <p className="text-sm font-medium"> New chat room</p>
                            </button>
                        ) : null}
                    </div>
                    <div className="flex gap-3 items-center p-4 hover:bg-slate-100 w-full">
                        <img src={ThemeIcon} alt="group" className="w-8 h-8 object-cover" />
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">Theme</p>

                            <ThemeSelector />
                        </div>
                    </div>
                    <div className="mt-auto pl-4">
                        {currentUser ? (
                            <button
                                className="btn"
                                onClick={async () => {
                                    signOut()
                                        .then(() => {
                                            updateUserOnlineStatus(userId.current!, 'offline');
                                            localStorage.removeItem('activeChat');
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        })
                                        .finally(() => {
                                            navigate('/');
                                        });
                                }}
                            >
                                Sign Out
                            </button>
                        ) : null}
                    </div>
                </div>
                <CreateChatRoom isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
            </Drawer>
        </div>
    );
};
