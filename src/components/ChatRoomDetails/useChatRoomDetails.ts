import { collection, doc, limitToLast, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { GroupMessage, SingleChatRoom, UserInfo, UserListHashMap } from '../../models/types';

export const useChatRoomDetails = () => {
    const { chatRoomId } = useParams()!;
    const singleRoomUpdated = useRef(true);
    const [toggle, setToggle] = useState(chatRoomId);
    const currentUser: UserInfo = JSON.parse(localStorage.getItem('currentUser')!);

    const chatRoomsRef = collection(db, 'chatRooms');
    const usersRef = collection(db, 'users');
    const docRef = doc(db, 'chatRooms', chatRoomId!);

    const chatMessagesRef = collection(db, 'chatRooms', chatRoomId!, 'messages');

    const chatRoomQuery = query(chatRoomsRef, where('id', '==', chatRoomId));

    const groupMessageQuery = query(chatMessagesRef, orderBy('sentTime', 'asc'), limitToLast(20));

    const [value, loading, error] = useCollection(chatRoomQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    const [groupMessages, loadingMessage, errorMessage] = useCollection(groupMessageQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    const chatRoomInfo = value?.docs.map((d) => d.data())[0] as SingleChatRoom;
    const chatRoomIDs = value?.docs.map((d) => d.data())[0]?.['members'] ?? [''];
    const userQuery = query(usersRef, where('uid', 'in', chatRoomIDs));

    const [userList, userListLoading, userListError] = useCollectionData(userQuery);

    const userListHashMap: UserListHashMap = userList?.reduce((acc, user) => {
        acc[user.uid] = {
            email: user.email,
            name: user?.name,
            uid: user?.uid,
            photoURL: user?.photoURL,
        };
        return acc;
    }, {})!;

    const isValidUser: boolean = chatRoomInfo?.['members'].some(
        (member: string) => member === currentUser?.uid
    );
    const getUserInfo = (info: 'name' | 'email' | 'uid' | 'photoURL') => {
        if (!chatRoomInfo) return;

        return chatRoomInfo?.['members']?.[0] !== currentUser?.uid
            ? chatRoomInfo?.userOne?.[info]
            : chatRoomInfo?.userTwo?.[info];
    };
    const updateChatRoomUsersInfo = useCallback(async () => {
        if (!chatRoomInfo) return;

        if (chatRoomInfo?.type === 'room') return;

        const otherUserId = getUserInfo('uid');

        const otherUser = userListHashMap?.[otherUserId!];

        let userOne = {};
        let userTwo = {};

        if (currentUser?.uid === chatRoomInfo?.userOneId) {
            userOne = {
                email: currentUser?.email,
                name: currentUser?.name,
                uid: currentUser?.uid,
                photoURL: currentUser?.photoURL,
            };
            userTwo = {
                email: otherUser?.email,
                name: otherUser?.name,
                uid: otherUser?.uid,
                photoURL: otherUser?.photoURL,
            };
        }

        if (currentUser?.uid === chatRoomInfo?.userTwoId) {
            userOne = {
                email: otherUser?.email,
                name: otherUser?.name,
                uid: otherUser?.uid,
                photoURL: otherUser?.photoURL,
            };
            userTwo = {
                email: currentUser.email,
                name: currentUser.name,
                uid: currentUser.uid,
                photoURL: currentUser.photoURL,
            };
        }

        await updateDoc(docRef, {
            userOne,
            userTwo,
        })
            .then(() => {
                singleRoomUpdated.current = false;
                console.log('updated single chat room');
            })
            .catch((r) => {
                console.log(r);
            });
    }, [toggle]);

    useEffect(() => {
        if (singleRoomUpdated.current) {
            updateChatRoomUsersInfo();
        }
    }, [updateChatRoomUsersInfo]);

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
        userListHashMap,
    } as const;
};
