
import {
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { useLayoutEffect, useState } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useChatRoomContext } from '../../context/context';
import { db } from '../../firebase';
import { createUser, updateUserOnlineStatus } from '../apiOperations';


export const useLeftSideBar = () => {
    const handleSearch = async (userName: string) => {
        console.log('first');
        const usersSearchRef = collection(db, 'users');
        const nameQuery = query(usersSearchRef, where('name', '>=', userName.toLowerCase()));
        const querySnapshot = await getDocs(nameQuery);
        console.log('isEmpty', querySnapshot.empty);
        return querySnapshot.docs.map((doc) => doc.data());
    };

    return { handleSearch }
}
