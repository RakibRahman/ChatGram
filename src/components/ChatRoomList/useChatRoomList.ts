import { collection, doc, orderBy, query, where } from 'firebase/firestore';
import { useLayoutEffect } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useChatRoomContext } from '../../context/context';
import { db } from '../../firebase';
import { createUser, updateUserOnlineStatus } from '../apiOperations';

export const useChatRoomList = () => {
    const { currentUser, signOut } = useChatRoomContext();

    const usersRef = doc(db, 'users', currentUser?.uid!);

    const [userInfo, userInfoError, userInfoLoading] = useDocument(usersRef, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    const usersChatRooms: string[] = userInfo?.data()?.['chatRooms'] ?? [''];
    console.log(usersChatRooms);
    const userStatus = {
        userInfoError,
        usersChatRooms,
        userInfoLoading,
    };
    const chatRoomsRef = collection(db, 'chatRooms');
    const q = query(chatRoomsRef, where('id', 'in', usersChatRooms?.length === 0 ? [''] : usersChatRooms), orderBy("lastActivity", "desc"));
    const [chatRoomList, chatRoomListLoading, chatRoomListError] =
        useCollection(q, {
            snapshotListenOptions: { includeMetadataChanges: true },
        });

    const chatListData = {
        list: chatRoomList?.docs.map((chat) => chat.data()) ?? [],
        chatRoomListError,
        chatRoomListLoading,
    };

    const handleLogin = async () => {
        console.log('ddd')
        if (!currentUser) return;
        console.log('ddd v3w')
        // userId.current = currentUser.uid;
        await createUser(currentUser);
        await updateUserOnlineStatus(currentUser?.uid);

    };

    useLayoutEffect(() => {

        handleLogin()

    }, [])

    return { currentUser, chatListData, usersChatRooms, signOut } as const;
};
