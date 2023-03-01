import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { useChatRoomDetails } from '../ChatRoomDetails.tsx/useChatRoomDetails';

export const useTopCardDetails = () => {
    const { currentUser, chatRoomInfo } = useChatRoomDetails();

    const getUserInfo = (info: string) => {
        if (!chatRoomInfo) return;

        return chatRoomInfo['members'][0] !== currentUser?.uid
            ? chatRoomInfo?.userOne?.[info]
            : chatRoomInfo?.userTwo?.[info];
    };
    const usersRef = doc(db, 'users', getUserInfo('id') ?? 'aa');

    const [userInfo, userInfoLoading, userInfoError] = useDocument(usersRef, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });
    return { userInfo, chatRoomInfo, getUserInfo, currentUser, userInfoLoading };
};
