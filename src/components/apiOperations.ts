import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, timeStamp } from '../firebase';
import { handleResults } from '../utilities/handleResults';
import { CurrentUser, ChatUserInfo } from '../models/types';
import { async } from '@firebase/util';

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
    status: 'online' | 'offline' | 'away' = 'online'
): Promise<void> => {
    if (!userId) return;
    const userRef = doc(db, 'users', userId);

    await setDoc(
        userRef,
        {
            status,
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

export const createUser = async (currentUser: CurrentUser) => {
    if (!currentUser) return;
    const { uid, displayName, email, photoURL } = currentUser;
    const docRef = doc(db, 'users', uid);

    setDoc(
        docRef,
        {
            uid: uid,
            name: displayName?.toLowerCase(),
            email,
            photoURL,
            lastLogin: currentUser?.metadata?.lastSignInTime,
        },
        { merge: true }
    );
};

export const checkUserStatus = async (id: string): Promise<string> => {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    return docSnap?.data()?.status ?? '';
};
