import { useNavigate } from 'react-router-dom';
import { useChatRoomList } from '../ChatRoomList/useChatRoomList';
import { useTopMenuBar } from '../TopMenuBar/useTopMenuBar';

interface ContactProp {
    name: string;
    lastActive: string | Date;
    email: string;
    uid: string;
    photoURL: string;
}
export const useContactList = () => {
    const navigate = useNavigate();

    const { currentUser, userListHashMap } = useChatRoomList();
    const { createOneToOneChatRoom } = useTopMenuBar();

    const contactList = currentUser.contacts ?? [];
    const loggedUserChats = currentUser.chatRooms ?? [];

    const getUserChatRoom = (contactID: string) => {
        let chatRoomID =
            currentUser?.uid > contactID
                ? currentUser.uid + contactID
                : contactID + currentUser?.uid;

        return chatRoomID;
    };

    const getContactList = () => {
        const tempUserList: ContactProp[] = [];
        contactList.forEach((contact) => {
            tempUserList.push({
                lastActive: userListHashMap?.[contact]?.lastLogin,
                name: userListHashMap?.[contact]?.name,
                photoURL: userListHashMap?.[contact]?.photoURL,
                uid: userListHashMap?.[contact]?.uid,
                email: userListHashMap?.[contact]?.email,
            });
        });
        return tempUserList;
    };

    const navigateToChat = (user: ContactProp) => {
        let chatRoomId = getUserChatRoom(user.uid ?? '');
        if (loggedUserChats.includes(chatRoomId)) {
            navigate(`/chat/${chatRoomId}`);
            return;
        }
        createOneToOneChatRoom(user);
    };

    return { currentUser, contactList: getContactList(), navigateToChat };
};
