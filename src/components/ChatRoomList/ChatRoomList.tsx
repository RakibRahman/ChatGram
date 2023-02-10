import { useLocation } from 'react-router-dom';
import { Loader } from '../common/Loader/Loader';
import { ChatCard } from './ChatCard';
import { useChatRoomList } from './useChatRoomList';

export const ChatRoomList = () => {
    const { currentUser, chatListData, usersChatRooms, handleSearch } =
        useChatRoomList();
    let location = useLocation();
    const activeChat = location.pathname.replace(/^\/|\/$/g, '') ?? '';

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
                                    isActive={activeChat}
                                />
                            ) : (
                                <ChatCard
                                    isActive={activeChat}
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
