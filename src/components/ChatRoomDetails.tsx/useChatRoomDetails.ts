import { collection, doc, limitToLast, orderBy, query, setDoc, where } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import { useChatRoomContext } from '../../context/context';
import { db, timeStamp } from '../../firebase';
import { GroupMessage } from '../../models/types';

export const useChatRoomDetails = (userId?: string) => {
    const { chatRoomId } = useParams()!;
    const { currentUser } = useChatRoomContext();

    const chatRoomsRef = collection(db, 'chatRooms');
    const chatMessagesRef = collection(db, 'chatRooms', chatRoomId!, 'messages');

    const chatRoomQuery = query(chatRoomsRef, where('id', '==', chatRoomId));
    const groupMessageQuery = query(chatMessagesRef, orderBy('sentTime', 'asc'), limitToLast(20));

    const [value, loading, error] = useCollection(chatRoomQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    const [groupMessages, loadingMessage, errorMessage] = useCollection(groupMessageQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    const chatRoomInfo = value?.docs.map((d) => d.data())[0];
    const isValidUser: boolean = chatRoomInfo?.['members'].some(
        (member: string) => member === currentUser?.uid
    );

    return {
        currentUser,
        loading,
        error,
        chatRoomInfo,
        messageData: {
            loadingMessage,
            errorMessage,
            groupMessages: groupMessages?.docs.map((d) => d.data() as GroupMessage),
        },
        isValidUser,
    } as const;
};
