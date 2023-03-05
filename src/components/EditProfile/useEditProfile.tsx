import React from 'react';
import { useChatRoomContext } from '../../context/context';

export const useEditProfile = () => {
    const { currentUser } = useChatRoomContext();

    return { currentUser };
};
