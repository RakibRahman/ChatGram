import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ChatRoom } from '../../models/types';
import { Alert } from '../common/Alert';
import { Loader } from '../common/Loader/Loader';
import { ChatCard } from './ChatCard';
import { useChatRoomList } from './useChatRoomList';

export const ChatRoomList = () => {
    const { currentUser, chatListData, usersChatRooms, userListHashMap } = useChatRoomList()!;
    const isTab = useMediaQuery('(max-width: 768px)');
    const navigate = useNavigate();

    useEffect(() => {
        const isAnyChatActive = localStorage.getItem('activeChat');

        if (!!isAnyChatActive && currentUser && !isTab) {
            navigate(`/chat/${isAnyChatActive}`);
        }
    }, []);

    if (chatListData.chatRoomListLoading) {
        return (
            <div className="flex  justify-center items-center my-0 h-[40vh]">
                <Loader />
            </div>
        );
    }

    if (chatListData.chatRoomListError) {
        return <Alert title={chatListData.chatRoomListError.message} type="error" />;
    }

    const getSingleUserInfo = (key: 'name' | 'email' | 'photoURL' | 'uid', chatRoom: ChatRoom) => {
        return chatRoom['members'][0] === currentUser?.uid
            ? userListHashMap?.[chatRoom['members'][1]]?.[key]
            : userListHashMap?.[chatRoom['members'][0]]?.[key];
    };

    return (
        <div className=" flex flex-col overflow-hidden">
            {usersChatRooms?.length === 0 ||
            (usersChatRooms?.length === 1 && usersChatRooms[0] === '') ? (
                <Alert
                    title="No chat yet"
                    type="info"
                    description=" Search for users  or chat rooms. i.e: 'rakib talukder' , 'random group'"
                    size={46}
                />
            ) : null}

            {chatListData.list &&
                chatListData?.list?.map((chatRoom) => (
                    <div
                        key={chatRoom?.id}
                        onClick={() => {
                            localStorage.setItem('activeChat', chatRoom.id);
                        }}
                    >
                        {chatRoom?.type === 'room' ? (
                            <ChatCard
                                name={chatRoom?.name!}
                                recentMessage={chatRoom?.recentMessage!}
                                logo={chatRoom?.logo!}
                                id={chatRoom?.id!}
                                currentUserId={currentUser?.uid!}
                            />
                        ) : (
                            <ChatCard
                                name={getSingleUserInfo('name', chatRoom)}
                                logo={getSingleUserInfo('photoURL', chatRoom)}
                                recentMessage={chatRoom?.recentMessage!}
                                id={chatRoom?.id!}
                                currentUserId={currentUser?.uid!}
                            />
                        )}
                    </div>
                ))}
        </div>
    );
};
