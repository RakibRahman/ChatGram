import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, timeStamp } from '../firebase';


export const joinChatRoom = async (chatRoomId: string, userId: string) => {


    const chatRoomRef = doc(db, "chatRooms", chatRoomId);
    const userRef = doc(db, "users", userId);

    const updateChatRoomMembers = await updateDoc(chatRoomRef, {
        members: arrayUnion(userId)
    });

    const updateUserChatRooms = await updateDoc(userRef, {
        chatRooms: arrayUnion(chatRoomId)
    })

    Promise.all([updateChatRoomMembers, updateUserChatRooms]);

}