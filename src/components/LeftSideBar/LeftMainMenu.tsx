import React, { useRef, useState } from 'react'
import { useChatRoomContext } from '../../context/context';
import { updateUserOnlineStatus } from '../apiOperations';
import { Avatar } from '../common/Avatar/Avatar';
import { Drawer } from '../common/Drawer';
import { CreateChatRoom } from '../CreateChatRoom/CreateChatRoom';

export const LeftMainMenu = () => {
    const { currentUser, signOut } = useChatRoomContext();
    const userId = useRef(currentUser?.uid);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    return (
        <div>
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
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="flex flex-col items-start justify-between  h-full px-4">
                    <div className="text-black space-y-1">
                        <Avatar
                            name={currentUser?.displayName!}
                            img={currentUser?.photoURL!}
                        />
                        <h2>{currentUser?.displayName}</h2>
                    </div>
                    <div>
                        {currentUser ? (
                            <button
                                onClick={() => setIsOpenModal(true)}
                                className="btn outline-dotted"
                            >
                                {' '}
                                Create chat room
                            </button>
                        ) : null}
                    </div>
                    <div>
                        {currentUser ? (
                            <button
                                className="btn"
                                onClick={async () => {
                                    await updateUserOnlineStatus(
                                        userId.current!,
                                        'offline'
                                    );
                                    signOut();
                                }}
                            >
                                Sign Out
                            </button>
                        ) : null}
                    </div>
                </div>
                <CreateChatRoom
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                />
            </Drawer>
        </div>
    )
}
