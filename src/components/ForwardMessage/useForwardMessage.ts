import React from 'react';
import { useParams } from 'react-router-dom';
import { useChatRoomList } from '../ChatRoomList/useChatRoomList';
import { useSentMessage } from '../SentMessage/useSentMessage';

export const useForwardMessage = () => {
    const { chatRoomId } = useParams();
    const { currentUser, chatListData, usersChatRooms } = useChatRoomList();
    const { lastMessage, sendMessage } = useSentMessage();

    return { list: chatListData.list.filter((c) => c.id !== chatRoomId), currentUser };
};
