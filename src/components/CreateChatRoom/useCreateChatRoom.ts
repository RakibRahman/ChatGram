import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { db, timeStamp } from '../../firebase';
import { UserInfo } from '../../models/types';

export const useCreateChatRoom = () => {
    const currentUser: UserInfo = JSON.parse(localStorage.getItem('currentUser')!) ?? {};
    const navigate = useNavigate();
    const createNewChatRoom = async (chatRoomName: string) => {
        const chatRoomId = `chatRoom-${nanoid(8)}`;

        if (!currentUser) return;

        const { uid, name, email, photoURL } = currentUser;
        const createNewChatRoom = await setDoc(doc(db, 'chatRooms', chatRoomId), {
            name: chatRoomName?.toLowerCase(),
            id: chatRoomId,
            createdAt: timeStamp,
            logo: '',
            createdBy: uid,
            members: [uid],
            lastActivity: timeStamp,
            type: 'room',
            story: 'A room where we talk',
            admins: [currentUser.uid],
        });

        const updateUserInfo = async () => {
            const docRef = doc(db, 'users', uid);
            await updateDoc(docRef, {
                chatRooms: arrayUnion(chatRoomId),
            });
        };

        try {
            Promise.all([createNewChatRoom, updateUserInfo()]).then((values) => {
                navigate(`/chat/${chatRoomId}`);
                localStorage.setItem('activeChat', chatRoomId);
            });
        } catch {
            alert('Error creating chat room');
        }
    };
    return { createNewChatRoom, currentUser };
};
