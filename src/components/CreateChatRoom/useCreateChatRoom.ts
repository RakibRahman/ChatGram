
import { doc, getDoc, setDoc } from "firebase/firestore";
import { nanoid } from 'nanoid';
import { useChatRoomContext } from '../../context/context';
import { db, timeStamp } from '../../firebase';
import { ChatUserInfo, CreateChatRoom } from '../../models/types';


export const useCreateChatRoom = () => {
    const { currentUser } = useChatRoomContext();

    const createNewChatRoom = async (chatRoomName: string) => {
        const chatRoomId = `chatRoom-${nanoid(8)}`;

        if (!currentUser) return;
        const currentUserInfo: ChatUserInfo = currentUser;
        const { uid, displayName, email, photoURL } = currentUserInfo;
        console.log(chatRoomName);
        const createNewChatRoom = await setDoc(doc(db, "chatRooms", chatRoomId), {
            name: chatRoomName,
            id: chatRoomId,
            createdAt: timeStamp,
            logo: 'https://images.pexels.com/photos/1111370/pexels-photo-1111370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            createdBy: {
                name: displayName,
                email,
                photoURL,
                id: uid
            },
            members: [uid]
        })

        const createUserInfo = async () => {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const updateChatRooms = [...docSnap.data().chatRooms, chatRoomId];
                setDoc(docRef, { ...docSnap.data(), chatRooms: updateChatRooms }, { merge: true });
            } else {
                setDoc(docRef, {
                    chatRooms: [chatRoomId],
                    id: uid,
                    name: displayName,
                    email,
                    photoURL
                })
            }
        }

        try {
            Promise.all([createNewChatRoom, createUserInfo()]).then((values) => {

            });
        } catch {
            alert('Error creating chat room')
        }

    }
    return { createNewChatRoom, currentUser };
}