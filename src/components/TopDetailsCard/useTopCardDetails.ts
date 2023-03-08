import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { UserInfo } from '../../models/types';
import { useChatRoomDetails } from '../ChatRoomDetails/useChatRoomDetails';

export const useTopCardDetails = () => {
    const { chatRoomInfo } = useChatRoomDetails();
    const loggedUser: UserInfo = JSON.parse(localStorage.getItem('currentUser')!);

    const getUserInfo = (info: 'name' | 'email' | 'uid' | 'photoURL') => {
        if (!chatRoomInfo) return;

        return chatRoomInfo['members'][0] !== loggedUser?.uid
            ? chatRoomInfo?.userOne?.[info]
            : chatRoomInfo?.userTwo?.[info];
    };
    const usersRef = doc(db, 'users', getUserInfo('uid') ?? 'aa');

    const [userInfo, userInfoLoading, userInfoError] = useDocument(usersRef, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });
    return { userInfo, chatRoomInfo, getUserInfo, currentUser: loggedUser, userInfoLoading };
};
