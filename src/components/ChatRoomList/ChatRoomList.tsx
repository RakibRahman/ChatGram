import { Link } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { ChatCard } from './ChatCard';
import { useChatRoomList } from './useChatRoomList';

export const ChatRoomList = () => {
    const { currentUser, chatListData, usersChatRooms } = useChatRoomList();

    if (usersChatRooms?.length === 0) {
        return <p>'You have no chat rooms'</p>;
    }
    if (!currentUser) {
        return <h1>Log in to see chat rooms</h1>;
    }

    if (chatListData.chatRoomListLoading) {
        return <Loader />;
    }

    if (chatListData.chatRoomListError) {
        return <h2>Error loading chat room list</h2>;
    }

    return (
        <div className=" flex flex-col space-y-4">
            {chatListData.list &&
                chatListData?.list?.map((chatRoom) => (
                    <>
                        {' '}
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
    );
};
