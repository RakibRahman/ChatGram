import { useParams } from 'react-router-dom';
import { useChatRoomList } from '../ChatRoomList/useChatRoomList';

export const useForwardMessage = (query: string) => {
    const { chatRoomId } = useParams();
    const { currentUser, chatListData } = useChatRoomList();

    const chatList = chatListData.list.filter((chatRoom) => {

        const userName = chatRoom['members'][0] !== currentUser?.uid
            ? chatRoom?.userOne?.name
            : chatRoom?.userTwo?.name
        if (userName) {
            chatRoom.name = userName;
        }

        return chatRoom?.name?.includes(query ?? '')
    })

    return { chatList: chatList.filter((c) => c.id !== chatRoomId), currentUser };
};
