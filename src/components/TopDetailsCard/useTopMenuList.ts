import { arrayRemove, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { deleteObject, getStorage, listAll, ref } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';

import 'firebase/firestore';
export const useTopMenuList = () => {
    const storage = getStorage();
    const { chatRoomId } = useParams();
    const listRef = ref(storage, chatRoomId);
    const navigate = useNavigate();

    const deleteAllMessages = async () => {
        const querySnapshot = await getDocs(collection(db, 'chatRooms', chatRoomId!, 'messages'));
        querySnapshot.forEach(async (message) => {
            const messageRef = doc(db, 'chatRooms', chatRoomId!, 'messages', message.id);

            await deleteDoc(messageRef)
                .then(() => {
                    console.log('message deleted successfully');
                })
                .catch((r) => {
                    console.log(r);
                });
        });
    };

    const handleDeleteChatFiles = async () => {
        listAll(listRef)
            .then((res) => {
                res.items.forEach(async (itemRef) => {
                    const desertRef = ref(storage, itemRef.fullPath);
                    await deleteObject(desertRef)
                        .then(() => {
                            console.log('successfully deleted media files');
                        })
                        .catch(() => {
                            console.log('some went wrong');
                        });
                });
            })
            .catch((error) => {
                console.log('Uh-oh, an error occurred!', error);
            })
            .finally(() => {});
    };

    const deleteChat = async (members: string[]) => {
        if (members.length < 2) return;
        console.log({ members });

        const updateUsersChatRooms = async () => {
            for (let i = 0; i < members.length; i++) {
                await updateDoc(doc(db, 'users', members[i]), {
                    chatRooms: arrayRemove(chatRoomId),
                });
            }
        };
        const deleteChatRoom = await deleteDoc(doc(db, 'chatRooms', chatRoomId!));

        await Promise.all([updateUsersChatRooms(), deleteAllMessages(), deleteChatRoom])
            .then(() => {
                console.log('successfully updated user chat room');
                handleDeleteChatFiles();
            })
            .catch(() => {
                console.log('something went wrong while updating user chat room');
            })
            .finally(() => {
                localStorage.removeItem('activeChat');
                navigate('/');
            });
    };

    return { deleteChat, deleteAllMessages };
};
