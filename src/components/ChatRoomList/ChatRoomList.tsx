import { useEffect, useRef, useState } from 'react';
import { Loader } from '../common/Loader/Loader';
import { ProfileCard } from '../common/ProfileCard/ProfileCard';
import { ChatCard } from './ChatCard';
import { useChatRoomList } from './useChatRoomList';
import { useLocation, useParams } from 'react-router-dom';

export const ChatRoomList = () => {
    const { currentUser, chatListData, usersChatRooms, handleSearch } =
        useChatRoomList();
    let location = useLocation();
    const [currentActiveChat, setActiveChat] = useState('');
    console.log(currentActiveChat);
    useEffect(() => {
        if (location.pathname) {
            setActiveChat(location.pathname.replace(/^\/|\/$/g, ''));
        }

        return () => {
            setActiveChat('');
        };
    }, [location]);

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
    // console.log(chatListData.list);
    return (
        <div>
            <div className=" flex flex-col">
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
                                    isActive={currentActiveChat}
                                />
                            ) : (
                                <ChatCard
                                    isActive={currentActiveChat}
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
