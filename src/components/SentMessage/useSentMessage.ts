import { doc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useParams } from 'react-router-dom';
import { useChatRoomContext } from '../../context/context';
import { db, timeStamp } from '../../firebase';
export const useSentMessage = () => {
    const { chatRoomId } = useParams()!;
    const { currentUser } = useChatRoomContext();

    const lastMessage = async (message: string = '', type = 'text') => {
        if (!chatRoomId) return;

        await setDoc(
            doc(db, 'chatRooms', chatRoomId),
            {
                lastActivity: timeStamp,
                recentMessage: {
                    message,
                    sentBy: currentUser?.displayName,
                    timestamp: timeStamp,
                    type,
                },
            },
            { merge: true }
        );
    };

    const sendMessage = async (
        message: string = '',
        type = 'text',
        fileId?: string,
        fileLink?: string
    ) => {
        if (!chatRoomId) return;
        const messageId = `message-${nanoid(8)}`;
        console.log(messageId);
        await setDoc(doc(db, 'chatRooms', chatRoomId, 'messages', messageId), {
            sentBy: {
                name: currentUser?.displayName,
                id: currentUser?.uid,
                pic: currentUser?.photoURL,
            },
            chatRoomId,
            message,
            sentTime: timeStamp,
            type: type,
            messageId: messageId,
            ...(fileLink && { fileLink: fileLink }),
            ...(fileId && { fileId: fileId }),
        });
    };

    return { lastMessage, sendMessage, currentUser };
};
