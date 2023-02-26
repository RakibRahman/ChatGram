import React from 'react'
import { db } from '../../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import { collection, doc } from 'firebase/firestore';
import { UserInfo } from '../../models/types';
export const useUserProfile = () => {


    const { chatRoomId } = useParams();


    const [userInfo, loading, error] = useDocument(
        doc(db, 'users', chatRoomId ?? ''),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    return { userInfo: userInfo?.data() as UserInfo, loading, error }
}
