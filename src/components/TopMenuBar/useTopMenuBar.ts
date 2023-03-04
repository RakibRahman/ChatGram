import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatRoomContext } from '../../context/context';
import { db, timeStamp } from '../../firebase';
import { ChatUserInfo, UserInfo } from '../../models/types';
import { joinChatRoom as joinRoom } from '../apiOperations';

export const useTopMenuBar = (setSearchActive: Dispatch<SetStateAction<boolean>>) => {
    const { currentUser } = useChatRoomContext();
    const navigate = useNavigate();

    const createOneToOneChatRoom = async (receiver: UserInfo) => {
        if (!currentUser) return;
        const currentUserInfo: ChatUserInfo = currentUser;
        const { uid, displayName, email, photoURL } = currentUserInfo;
        // const chatRoomId = receiver.uid + currentUser?.uid;
        let chatRoomId =
            currentUser?.uid > receiver?.uid
                ? currentUser.uid + receiver?.uid
                : receiver?.uid + currentUser?.uid;

        const docRef = doc(db, 'chatRooms', chatRoomId);

        const docSnap = await getDoc(docRef);

        const isAlreadyJoined = docSnap
            .data()
            ?.['members'].some((member: string) => member === currentUser?.uid);

        if (isAlreadyJoined) {
            navigate(`/chat/${docSnap.data()?.['id']}`);
            setSearchActive(false);
            localStorage.setItem('activeChat', chatRoomId);

            return;
        }
        if (!isAlreadyJoined) {
            const createNewChatRoom = await setDoc(docRef, {
                id: chatRoomId,
                createdAt: timeStamp,
                userOne: {
                    name: displayName?.toLowerCase(),
                    email,
                    photoURL,
                    id: uid,
                },
                userTwo: {
                    name: receiver?.name?.toLowerCase(),
                    email: receiver?.email,
                    photoURL: receiver?.photoURL,
                    id: receiver?.uid,
                },
                members: [uid, receiver?.uid],
                lastActivity: timeStamp,
                type: 'single',
            });

            const updateUserInfo = async () => {
                const currentUserRef = doc(db, 'users', uid);
                const receiverUserRef = doc(db, 'users', receiver?.uid);

                await updateDoc(currentUserRef, {
                    chatRooms: arrayUnion(chatRoomId),
                });

                await updateDoc(receiverUserRef, {
                    chatRooms: arrayUnion(chatRoomId),
                });
            };

            try {
                Promise.allSettled([createNewChatRoom, updateUserInfo()]).then((values) => {
                    navigate(`/chat/${chatRoomId}`);
                    localStorage.setItem('activeChat', chatRoomId);

                    setSearchActive(false);
                });
            } catch {
                alert('Error creating chat room');
            }
        }
    };

    const joinChatRoom = async (chatRoomId: string) => {
        const docRef = doc(db, 'chatRooms', chatRoomId);

        const docSnap = await getDoc(docRef);

        const isAlreadyJoined = docSnap
            .data()
            ?.['members'].some((member: string) => member === currentUser?.uid);

        if (isAlreadyJoined) {
            navigate(`/chat/${chatRoomId}`);
            localStorage.setItem('activeChat', chatRoomId);
            setSearchActive(false);
            return;
        }

        if (!isAlreadyJoined) {
            joinRoom(chatRoomId, currentUser?.uid!)
                .then(() => {
                    setSearchActive(false);
                    navigate(`chat/${chatRoomId}`);
                    localStorage.setItem('activeChat', chatRoomId);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    return { createOneToOneChatRoom, joinChatRoom };
};
