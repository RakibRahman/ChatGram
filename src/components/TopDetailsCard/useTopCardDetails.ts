import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { UserInfo } from '../../models/types';
import { useChatRoomDetails } from '../ChatRoomDetails/useChatRoomDetails';
export const useTopCardDetails = () => {
    const { chatRoomInfo, userListHashMap } = useChatRoomDetails();
    const loggedUser: UserInfo = JSON.parse(localStorage.getItem('currentUser')!);

    const getSingleUserInfo = (key: 'name' | 'email' | 'photoURL' | 'uid') => {
        if (!chatRoomInfo) return;
        return chatRoomInfo?.['members'][0] === loggedUser?.uid
            ? userListHashMap?.[chatRoomInfo['members'][1]]?.[key]
            : userListHashMap?.[chatRoomInfo['members'][0]]?.[key];
    };

    const usersRef = doc(db, 'users', getSingleUserInfo('uid') ?? 'aa');

    const [userInfo, userInfoLoading, userInfoError] = useDocument(usersRef, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    // Create a reference under which you want to list

    return {
        userInfo,
        chatRoomInfo,
        getSingleUserInfo,
        currentUser: loggedUser,
        userInfoLoading,
        userListHashMap,
        userInfoError,
    };
};
