import React from 'react';
import { useChatRoomContext } from '../../context/context';
import {
    doc,
    getDoc,
    setDoc,
    query,
    collection,
    where,
    orderBy,
    limit,
    limitToLast,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { db, timeStamp } from '../../firebase';
import { useParams } from 'react-router-dom';
import { useCollection } from 'react-firebase-hooks/firestore';
import { ChatRoom, GroupMessage } from '../../models/types';

export const useChatRoomDetails = () => {
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

    const lastMessage = async (message: string, type = 'text') => {
        if (!message) return;
        if (!chatRoomId) return;

        await setDoc(
            doc(db, 'chatRooms', chatRoomId),
            {
                lastActivity: timeStamp,
                recentMessage: {
                    message,
                    sentBy: currentUser?.displayName,
                    timestamp: timeStamp,
                    type,
                },
            },
            { merge: true }
        );
    };

    const sendMessage = async (message: string, type = 'text') => {
        if (!message) return;
        if (!chatRoomId) return;
        const messageId = `message-${nanoid(8)}`;
        await setDoc(doc(db, 'chatRooms', chatRoomId, 'messages', messageId), {
            sentBy: {
                name: currentUser?.displayName,
                id: currentUser?.uid,
                pic: currentUser?.photoURL,
            },
            chatRoomId,
            message,
            sentTime: timeStamp,
            type: type,
            messageId: messageId,
        });
    };

    return {
        lastMessage,
        currentUser,
        loading,
        error,
        chatRoomInfo,
        sendMessage,
        messageData: {
            loadingMessage,
            errorMessage,
            groupMessages: groupMessages?.docs.map((d) => d.data() as GroupMessage),
        },
        isValidUser,
    } as const;
};
