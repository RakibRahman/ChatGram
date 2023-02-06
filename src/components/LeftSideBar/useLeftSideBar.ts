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
    const { currentUser } = useChatRoomContext();
    const handleSearch = async (userName: string) => {
        const usersSearchRef = collection(db, 'users');
        const roomsSearchRef = collection(db, 'chatRooms');

        const nameQuery = query(
            usersSearchRef,
            where('name', '>=', userName.toLowerCase())
        );

        const roomQuery = query(
            roomsSearchRef,
            where('name', '>=', userName.toLowerCase())
        );

        const usersSnapShot = await getDocs(nameQuery);
        console.log('isEmpty', usersSnapShot.empty);

        const users = usersSnapShot.docs
            .map((doc) => {
                const { chatRooms, ...rest } = doc.data();
                rest.type = 'user';
                return rest;
            })
            .filter((doc) => doc.uid !== currentUser?.uid);

        const roomsSnapShot = await getDocs(roomQuery);
        const rooms = roomsSnapShot.docs.map((doc) => {
            doc.data().type = 'room';
            return doc.data();
        });

        console.log({ rooms });

        return [...users, ...rooms];
    };

    return { handleSearch };
};
