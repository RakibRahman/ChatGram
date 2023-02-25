import { doc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useParams } from 'react-router-dom';
import { useChatRoomContext } from '../../context/context';
import { db, timeStamp } from '../../firebase';
export const useSentMessage = () => {
    const { chatRoomId } = useParams()!;
    const { currentUser } = useChatRoomContext();

    const lastMessage = async (message: string = '', type = 'text', forwardChatRoomId?: string) => {
        const chatId = forwardChatRoomId ? forwardChatRoomId : chatRoomId;
        console.log('chatId', chatId);
        if (!chatId) return;
        await setDoc(
            doc(db, 'chatRooms', chatId),
            {
                lastActivity: timeStamp,
                recentMessage: {
                    message,
                    sentBy: currentUser?.displayName,
                    sentId: currentUser?.uid,
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
        fileLink?: string,
        forwardChatRoomId?: string
    ) => {

        const chatId = forwardChatRoomId ? forwardChatRoomId : chatRoomId;

        const messageId = `message-${nanoid(8)}`;
        if (!chatId) return;

        await setDoc(doc(db, 'chatRooms', chatId, 'messages', messageId), {
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
