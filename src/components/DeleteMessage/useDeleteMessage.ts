import { deleteDoc, doc, collection, getDocs } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { GroupMessage } from '../../models/types';

export const useDeleteMessage = (selectedMessage: GroupMessage) => {
    const deleteFromStorage = async () => {
        if (!selectedMessage.fileId) return;

        const desertRef = ref(storage, selectedMessage.fileId);

        // Delete the file
        await deleteObject(desertRef)
            .then(() => {
                console.log('Successfully deleted from storage');
            })
            .catch((error) => {
                console.log(' Uh-oh, an error occurred!', error);
            });
    };
    const handleDeleteMessage = async () => {
        const messageRef = doc(
            db,
            'chatRooms',
            selectedMessage.chatRoomId,
            'messages',
            selectedMessage.messageId
        );

        await deleteDoc(messageRef)
            .then(() => {
                console.log('message deleted successfully');

                deleteFromStorage();
            })
            .catch((r) => {
                console.log(r);
            });
    };

    return { handleDeleteMessage };
};
