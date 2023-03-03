import { collection, doc, orderBy, query, where } from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useChatRoomContext } from '../../context/context';
import { db } from '../../firebase';

export const useChatRoomList = () => {
    const { currentUser, signOut } = useChatRoomContext();
    const usersRef = doc(db, 'users', currentUser?.uid!);

    const [userInfo, userInfoError, userInfoLoading] = useDocument(usersRef, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    const usersChatRooms: string[] = userInfo?.data()?.['chatRooms'] ?? [''];

    const userStatus = {
        userInfoError,
        usersChatRooms,
        userInfoLoading,
    };
    const chatRoomsRef = collection(db, 'chatRooms');
    const q = query(
        chatRoomsRef,
        where('id', 'in', usersChatRooms?.length === 0 ? [''] : usersChatRooms),
        orderBy('lastActivity', 'desc')
    );

    const [chatRoomList, chatRoomListLoading, chatRoomListError] = useCollection(q, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    const chatListData = {
        list: chatRoomList?.docs.map((chat) => chat.data()) ?? [],
        chatRoomListError,
        chatRoomListLoading,
    };

    return {
        currentUser,
        chatListData,
        usersChatRooms,
        signOut,
    } as const;
};
