import { doc, updateDoc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useChatRoomContext } from '../../context/context';
import { db, timeStamp } from '../../firebase';
import { UserInfo } from '../../models/types';
export const useEditProfile = () => {
    const { currentUser } = useChatRoomContext();
    if (!currentUser) return;

    const docRef = doc(db, 'users', currentUser?.uid);
    const [userInfo, loading, error] = useDocument(docRef, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    const updateUser = async (payload: Partial<UserInfo>) => {
        if (!payload) return;
        await updateDoc(docRef, { ...payload, updatedAt: timeStamp });
    };
    if (userInfo?.exists()) {
        console.log('user logged in');
        localStorage.setItem('currentUser', JSON.stringify(userInfo.data()));
    }
    return { currentUser: userInfo?.data() as UserInfo, loading, error, updateUser };
};
