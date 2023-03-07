import React from 'react';
import { useChatRoomContext } from '../../context/context';
import { useDocument, useDocumentOnce } from 'react-firebase-hooks/firestore';
import { db, timeStamp } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { UserInfo } from '../../models/types';
export const useEditProfile = () => {
    const { currentUser } = useChatRoomContext();
    if (!currentUser) return;

    const docRef = doc(db, 'users', currentUser?.uid);
    const [userInfo, loading, error] = useDocument(
        docRef, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    const updateUser = async (payload: Partial<UserInfo>) => {
        if (!payload) return;
        await updateDoc(docRef, { ...payload, updatedAt: timeStamp });
    }

    return { currentUser: userInfo?.data() as UserInfo, loading, error, updateUser };
};
