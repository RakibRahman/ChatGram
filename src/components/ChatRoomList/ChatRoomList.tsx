import { useEffect, useRef, useState } from 'react';
import { Loader } from '../common/Loader/Loader';
import { ProfileCard } from '../common/ProfileCard/ProfileCard';
import { ChatCard } from './ChatCard';
import { useChatRoomList } from './useChatRoomList';

export const ChatRoomList = () => {
    const { currentUser, chatListData, usersChatRooms, handleSearch } =
        useChatRoomList();

    const searchQuery = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log('mounting chat room list');

        return () => {
            console.log('remounting chat room list');
        };
    }, []);

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
    console.log(chatListData.list);
    return (
        <div>
            <div className="flex">
                {/* 
                <div className="form-control  ">
                    <div className="input-group ">
                        <form onSubmit={searchUsers}>
                            <div className="flex gap-1">
                                <input
                                    name="searchQuery"
                                    type="text"
                                    ref={searchQuery}
                                    placeholder="Search…"
                                    className="input input-bordered input-sm w-full max-w-xs "
                                />
                                <button className="btn btn-sm" type="submit">
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
                        </form>
                    </div>
                </div> */}
            </div>

            <div className=" flex flex-col space-y-4">
                {usersChatRooms?.length === 0 ? (
                    <p className="p-4">No chat yet</p>
                ) : null}

                {chatListData.list &&
                    chatListData?.list?.map((chatRoom) => (
                        <>
                            {chatRoom?.type === 'room' ? (
                                <ChatCard
                                    name={chatRoom.name!}
                                    recentMessage={chatRoom.recentMessage!}
                                    logo={chatRoom.logo!}
                                    id={chatRoom.id!}
                                    key={chatRoom.id}
                                />
                            ) : (
                                <ChatCard
                                    name={
                                        chatRoom['members'][0] !==
                                        currentUser?.uid
                                            ? chatRoom?.userOne?.name
                                            : chatRoom?.userTwo?.name
                                    }
                                    recentMessage={chatRoom.recentMessage!}
                                    logo={
                                        chatRoom?.userOne.id !==
                                        currentUser?.uid
                                            ? chatRoom?.userOne?.photoURL
                                            : chatRoom?.userTwo?.photoURL
                                    }
                                    id={chatRoom.id!}
                                    key={chatRoom.id}
                                />
                            )}
                        </>
                    ))}
            </div>
        </div>
    );
};
