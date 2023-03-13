import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { db, timeStamp } from '../../firebase';
import { UserInfo } from '../../models/types';
import useFireBaseUpload from '../FileUpload/useFirebaseUpload';
import { ChatRoom } from '../../models/types';
import { FileUploadStateProps } from '../../models/UploadType';


export type RoomUpdatePayload = Partial<Pick<ChatRoom, 'name' | 'story' | 'logo' | 'logoURLPath'>>

export const useCreateChatRoom = () => {
    const { handleUpload, discardUpload, state } = useFireBaseUpload();
    const currentUser: UserInfo = JSON.parse(localStorage.getItem('currentUser')!) ?? {};
    const navigate = useNavigate();

    const createNewChatRoom = async (chatRoomPayload: RoomUpdatePayload, chatRoomId: string, fileState?: FileUploadStateProps) => {
        // handleUpload(selectedFile, 'room');
        if (!currentUser) return;
        console.log(fileState);
        const { uid } = currentUser;
        const createNewChatRoom = await setDoc(doc(db, 'chatRooms', chatRoomId), {
            name: chatRoomPayload.name!.toLowerCase(),
            id: chatRoomId,
            createdAt: timeStamp,
            logo: fileState?.downloadURL ? fileState.downloadURL : randomRoomBg,
            createdBy: uid,
            members: [uid],
            lastActivity: timeStamp,
            type: 'room',
            story: chatRoomPayload.story ? chatRoomPayload.story : 'A room where we talk.',
            admins: [uid],
            logoURLPath: fileState?.fullPath ? fileState?.fullPath : '',


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

const roomBG = ['https://firebasestorage.googleapis.com/v0/b/my-chat-87035.appspot.com/o/general%2Froom-bg%2Friver-gabaf820bd_1920.jpg?alt=media&token=3d9fb0ed-6657-406d-904a-00ad68e565ea', 'https://firebasestorage.googleapis.com/v0/b/my-chat-87035.appspot.com/o/general%2Froom-bg%2Fcastle-g2bad5d39e_1280.jpg?alt=media&token=38eaa3d9-6bbe-4976-840b-10c52fa6fe5a', 'https://firebasestorage.googleapis.com/v0/b/my-chat-87035.appspot.com/o/general%2Froom-bg%2Friver-gabaf820bd_1920.jpg?alt=media&token=3d9fb0ed-6657-406d-904a-00ad68e565ea', 'https://firebasestorage.googleapis.com/v0/b/my-chat-87035.appspot.com/o/general%2Froom-bg%2Froad-g1f54a6830_1280.jpg?alt=media&token=a82aa616-d197-4e0d-bdc6-970a26eafa80', 'https://firebasestorage.googleapis.com/v0/b/my-chat-87035.appspot.com/o/general%2Froom-bg%2Ftree-g8dcf31f7b_1280.jpg?alt=media&token=69c689d7-df1c-4982-99cd-f3e040a07a33'];

export const randomRoomBg = roomBG[Math.floor(Math.random() * roomBG.length)];