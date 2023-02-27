import { collection, doc, orderBy, query, where } from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { GroupMessage, UserInfo } from '../../models/types';
export const useUserProfile = () => {
    const chatId = localStorage.getItem('currentChat') ?? '';
    const { chatRoomId } = useParams();
    const chatRoomsRef = collection(db, 'chatRooms');
    const chatMessagesRef = collection(db, 'chatRooms', chatId, 'messages');

    const chatRoomQuery = query(chatRoomsRef, where('id', '==', chatId));
    const groupMessageQuery = query(chatMessagesRef, orderBy('sentTime', 'asc'));

    const [groupMessages, loadingMessage, errorMessage] = useCollection(groupMessageQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    const photos = groupMessages?.docs
        .map((d) => d.data() as GroupMessage)
        .filter((message: GroupMessage) => message.type === 'image');
    const videos = groupMessages?.docs
        .map((d) => d.data() as GroupMessage)
        .filter((message: GroupMessage) => message.type === 'video');

    const [userInfo, loading, error] = useDocument(doc(db, 'users', chatRoomId ?? ''), {
        snapshotListenOptions: { includeMetadataChanges: true },
    });
    return { userInfo: userInfo?.data() as UserInfo, loading, error, videos, photos };
};
