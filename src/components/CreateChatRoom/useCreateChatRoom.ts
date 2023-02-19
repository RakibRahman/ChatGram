import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useChatRoomContext } from '../../context/context';
import { db, timeStamp } from '../../firebase';
import { ChatUserInfo } from '../../models/types';

export const useCreateChatRoom = () => {
    const { currentUser } = useChatRoomContext();
    const navigate = useNavigate();
    const createNewChatRoom = async (chatRoomName: string) => {
        const chatRoomId = `chatRoom-${nanoid(8)}`;

        if (!currentUser) return;
        const currentUserInfo: ChatUserInfo = currentUser;
        const { uid, displayName, email, photoURL } = currentUserInfo;
        const createNewChatRoom = await setDoc(doc(db, 'chatRooms', chatRoomId), {
            name: chatRoomName?.toLowerCase(),
            id: chatRoomId,
            createdAt: timeStamp,
            logo: '',
            createdBy: {
                name: displayName?.toLowerCase(),
                email,
                photoURL,
                id: uid,
            },
            members: [uid],
            lastActivity: timeStamp,
            type: 'room',
        });

        const updateUserInfo = async () => {
            const docRef = doc(db, 'users', uid);
            await updateDoc(docRef, {
                chatRooms: arrayUnion(chatRoomId),
            });
            // if (docSnap.exists()) {
            //     const updateChatRooms = [...docSnap.data().chatRooms, chatRoomId];
            //     setDoc(docRef, { ...docSnap.data(), chatRooms: updateChatRooms }, { merge: true });
            // } else {
            //     setDoc(
            //         docRef,
            //         {
            //             chatRooms: [chatRoomId],
            //             id: uid,
            //             name: displayName?.toLowerCase(),
            //             email,
            //             photoURL,
            //         },
            //         { merge: true }
            //     );
            // }
        };

        try {
            Promise.all([createNewChatRoom, updateUserInfo()]).then((values) => {
                console.log(values);
                navigate(`/${chatRoomId}`);
            });
        } catch {
            alert('Error creating chat room');
        }
    };
    return { createNewChatRoom, currentUser };
};
