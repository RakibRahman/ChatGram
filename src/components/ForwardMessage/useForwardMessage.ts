import { useParams } from 'react-router-dom';
import { useChatRoomList } from '../ChatRoomList/useChatRoomList';

export const useForwardMessage = (query: string) => {
    const { chatRoomId } = useParams();
    const { currentUser, chatListData, userListHashMap } = useChatRoomList();

    const chatList = chatListData.list.filter((chatRoom) => {
        const userName =
            chatRoom?.['members'][0] === currentUser?.uid
                ? userListHashMap?.[chatRoom['members'][1]]?.['name']
                : userListHashMap?.[chatRoom['members'][0]]?.['name'];
        if (userName) {
            chatRoom.name = userName;
        }

        return chatRoom?.name?.includes(query ?? '');
    });

    return { chatList: chatList.filter((c) => c.id !== chatRoomId), currentUser, userListHashMap };
};
