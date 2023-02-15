import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert } from '../common/Alert';
import { Loader } from '../common/Loader/Loader';
import { ChatCard } from './ChatCard';
import { useChatRoomList } from './useChatRoomList';

export const ChatRoomList = () => {
    const { currentUser, chatListData, usersChatRooms } = useChatRoomList();
    let location = useLocation();
    const activeChat = location.pathname.replace(/^\/|\/$/g, '') ?? '';

    if (!currentUser) {
        return <h1>Log in to see chat rooms</h1>;
    }

    if (chatListData.chatRoomListLoading) {
        return (
            <div className="w-96 h-96  grid place-items-center">
                <Loader />
            </div>
        );
    }

    if (chatListData.chatRoomListError) {
        return <Alert title={chatListData.chatRoomListError.message} type="error" />;
    }
    // console.log(chatListData.list);
    return (
        <div className=" flex flex-col overflow-hidden">
            {usersChatRooms?.length === 1 && usersChatRooms[0] === '' ? (
                <Alert
                    title="No chat yet"
                    type="info"
                    description=" Search for users or chat rooms"
                />
            ) : null}

            {chatListData.list &&
                chatListData?.list?.map((chatRoom) => (
                    <Fragment key={chatRoom.id}>
                        {chatRoom?.type === 'room' ? (
                            <ChatCard
                                name={chatRoom.name!}
                                recentMessage={chatRoom.recentMessage!}
                                logo={chatRoom.logo!}
                                id={chatRoom.id!}
                                isActive={activeChat}
                            />
                        ) : (
                            <ChatCard
                                isActive={activeChat}
                                name={
                                    chatRoom['members'][0] !== currentUser?.uid
                                        ? chatRoom?.userOne?.name
                                        : chatRoom?.userTwo?.name
                                }
                                recentMessage={chatRoom.recentMessage!}
                                logo={
                                    chatRoom?.userOne.id !== currentUser?.uid
                                        ? chatRoom?.userOne?.photoURL
                                        : chatRoom?.userTwo?.photoURL
                                }
                                id={chatRoom.id!}
                            />
                        )}
                    </Fragment>
                ))}
        </div>
    );
};
