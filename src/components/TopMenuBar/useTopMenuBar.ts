import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useChatRoomContext } from '../../context/context';
import { db, timeStamp } from '../../firebase';
import { ChatUserInfo, CreateChatRoom, UserInfo } from '../../models/types';

export const useTopMenuBar = () => {
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
        console.log(isAlreadyJoined);
        if (isAlreadyJoined) {
            navigate(`/${docSnap.data()?.['id']}`);
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
                Promise.all([createNewChatRoom, updateUserInfo()]).then(
                    (values) => {}
                );
            } catch {
                alert('Error creating chat room');
            }
        }
    };

    const joinChatRoom = async (chatRoomId: string) => {
        const docRef = doc(db, 'chatRooms', chatRoomId);
        console.log(chatRoomId);
        const docSnap = await getDoc(docRef);

        const isAlreadyJoined = docSnap
            .data()
            ?.['members'].some((member: string) => member === currentUser?.uid);
        console.log(isAlreadyJoined);

        if (isAlreadyJoined) {
            navigate(`/${chatRoomId}`);
        }
    };
    return { createOneToOneChatRoom, joinChatRoom };
};