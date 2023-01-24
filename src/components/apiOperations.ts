import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, timeStamp } from '../firebase';
import { handleResults } from '../utilities/handleResults';

export const joinChatRoom = async (chatRoomId: string, userId: string) => {
    const chatRoomRef = doc(db, 'chatRooms', chatRoomId);
    const userRef = doc(db, 'users', userId);

    const updateChatRoomMembers = await updateDoc(chatRoomRef, {
        members: arrayUnion(userId),
    });

    const updateUserChatRooms = await updateDoc(userRef, {
        chatRooms: arrayUnion(chatRoomId),
    });

    const [chatRoomResult, userResult] = await Promise.allSettled([
        updateChatRoomMembers,
        updateUserChatRooms,
    ]);

    handleResults([chatRoomResult, userResult]);
};

export const updateUserOnlineStatus = async (
    userId: string,
    status: 'Online' | 'Offline' = 'Online'
): Promise<void> => {
    if (!userId) return;
    const userRef = doc(db, 'users', userId);

    const isOnline = status === 'Online' ? true : false;

    await setDoc(
        userRef,
        {
            isOnline: isOnline,
        },
        { merge: true }
    )
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
};