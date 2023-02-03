import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { updateUserOnlineStatus } from '../apiOperations';
import { Avatar } from '../common/Avatar';
import { Drawer } from '../common/Drawer';
import { Loader } from '../common/Loader/Loader';
import { CreateChatRoom } from '../CreateChatRoom/CreateChatRoom';
import { ChatCard } from './ChatCard';
import { useChatRoomList } from './useChatRoomList';

export const ChatRoomList = () => {
    const { currentUser, chatListData, usersChatRooms, signOut } = useChatRoomList();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const userId = useRef(currentUser?.uid);

    if (!currentUser) {
        return <h1>Log in to see chat rooms</h1>;
    }

    if (chatListData.chatRoomListLoading) {
        return <Loader />;
    }

    if (chatListData.chatRoomListError) {
        console.log(chatListData.chatRoomListError);
        return <h2>Error loading chat room list</h2>;
    }

    return (
        <div>
            <div className="flex">
                <button
                    className="btn btn-sm bg-transparent border-0"
                    onClick={() => setIsOpen(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                        />
                    </svg>
                </button>
                <div className="form-control ">
                    <div className="input-group ">
                        <input
                            type="text"
                            placeholder="Search…"
                            className="input input-bordered input-sm w-full max-w-xs "
                        />
                        <button className="btn btn-sm ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col space-y-4">

                {usersChatRooms?.length === 0 ? <p className='p-4'>No chat yet</p> : null}
                <Avatar name={currentUser.displayName!} img={currentUser.photoURL!} />

                {chatListData.list &&
                    chatListData?.list?.map((chatRoom) => (
                        <>
                            <ChatCard
                                name={chatRoom.name!}
                                recentMessage={chatRoom.recentMessage!}
                                logo={chatRoom.logo!}
                                id={chatRoom.id!}
                                key={chatRoom.id}
                            />
                        </>
                    ))}
            </div>
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className='flex flex-col items-start justify-between  h-full px-4'>
                    <div className="text-black">
                        <img
                            src={currentUser.photoURL ?? ''}
                            alt="profile picture"
                            className="rounded-full object-cover w-20 h-20"
                        />
                        {JSON.stringify(currentUser.displayName)}


                    </div>
                    <div>
                        {currentUser ? <button onClick={() => setIsOpenModal(true)} className='btn outline-dotted'> Create chat room
                        </button> : null}

                    </div>
                    <div>
                        {currentUser ? (
                            <button
                                className="btn"
                                onClick={async () => {
                                    await updateUserOnlineStatus(userId.current!, 'Offline');
                                    signOut();

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
