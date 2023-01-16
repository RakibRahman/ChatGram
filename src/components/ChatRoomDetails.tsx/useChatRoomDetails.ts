import React from 'react'
import { useChatRoomContext } from '../../context/context';
import { doc, getDoc, setDoc, query, collection, where } from "firebase/firestore";
import { nanoid } from 'nanoid';
import { db, timeStamp } from '../../firebase';
import { useParams } from 'react-router-dom';
import { useCollection } from 'react-firebase-hooks/firestore';

export const useChatRoomDetails = () => {
    const { chatRoomId } = useParams()!;
    const { currentUser } = useChatRoomContext();


    const chatRoomsRef = collection(db, "chatRooms");
    const chatMessagesRef = collection(db, "groupMessages");

    const q = query(chatRoomsRef, where("id", "==", chatRoomId));


    const messageQuery = query(chatMessagesRef, where("chatRoomId", "==", chatRoomId));
    const [value, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    const [message, loadingMessage, errorMessage] = useCollection(messageQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    })

    if (chatRoomId) {
        console.log(message?.docs.map((d) => d.data()));
    }
    const chatRoomInfo = value?.docs.map((d) => d.data())[0];

    const lastMessage = async (message: string) => {

        if (!message) return;
        if (!chatRoomId) return;

        await setDoc(doc(db, "chatRooms", chatRoomId), {
            recentMessage: {
                message,
                sentBy: currentUser?.displayName,
                timestamp: timeStamp
            }
        }, { merge: true })
    }

    const sendMessage = async (message: string) => {
        if (!message) return;
        if (!chatRoomId) return;
        await setDoc(doc(db, "groupMessages", `message-${nanoid(8)}`), {
            sentBy: {
                name: currentUser?.displayName,
                id: currentUser?.uid
            },
            chatRoomId,
            message,
            sentTime: timeStamp,
            type: 'text'
        })
    }

    const getChatMessage = async () => {

    }

    return { lastMessage, currentUser, loading, error, chatRoomInfo, sendMessage } as const;
}
