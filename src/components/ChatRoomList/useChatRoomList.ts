import { collection, doc, orderBy, query, where } from 'firebase/firestore';
import { useCollection, useCollectionData, useDocument } from 'react-firebase-hooks/firestore';
import { useChatRoomContext } from '../../context/context';
import { db } from '../../firebase';
import { SingleChatRoom, UserInfo } from '../../models/types';

export const useChatRoomList = () => {
    const { signOut } = useChatRoomContext();
    const currentUser: UserInfo = JSON.parse(localStorage.getItem('currentUser')!) ?? {};
    const usersListRef = collection(db, 'users');

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
        list: (chatRoomList?.docs?.map((chat) => chat.data()) as SingleChatRoom[]) ?? [],
        chatRoomListError,
        chatRoomListLoading,
    };
    const getAllChatRoomIds = chatListData?.list.map((a) => a?.members).flat() ?? [''];
    const removeDuplicateChatRoomIds = [...new Set(getAllChatRoomIds)];
    // fetch updated users info
    const userQuery = query(
        usersListRef,
        where('uid', 'in', removeDuplicateChatRoomIds.length ? removeDuplicateChatRoomIds : ['a'])
    );

    const [userList, userListLoading, userListError] = useCollectionData(userQuery);

    const userListHashMap = userList?.reduce((acc, user) => {
        acc[user.uid] = {
            email: user.email,
            name: user?.name,
            uid: user?.uid,
            photoURL: user?.photoURL,
        };
        return acc;
    }, {});

    return {
        currentUser,
        chatListData,
        usersChatRooms,
        signOut,
        userListHashMap,
    } as const;
};
