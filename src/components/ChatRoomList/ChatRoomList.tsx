import { Link } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
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
        <div className="container mx-auto px-4 border">
            <h1>ChatRoomList</h1>

            <ul>
                {chatListData?.list?.map((chatRoom) => (
                    <li key={chatRoom.id}>
                        <Link to={chatRoom.id}>{chatRoom.name}</Link>
                        <p>{chatRoom?.recentMessage?.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
