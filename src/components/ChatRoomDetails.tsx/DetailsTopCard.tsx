import React from 'react';
import { useChatRoomContext } from '../../context/context';
import { checkUserStatus } from '../apiOperations';
import { ProfileCard } from '../common/ProfileCard/ProfileCard';
import { useChatRoomDetails } from './useChatRoomDetails';

export const DetailsTopCard = () => {
    const { lastMessage, currentUser, sendMessage, messageData, isValidUser, chatRoomInfo } =
        useChatRoomDetails();

    console.log(
        'online status',
        checkUserStatus(currentUser?.uid!).then((r) => r)
    );

    if (chatRoomInfo?.type === 'single') {
        return (
            <div>
                <ProfileCard
                    name={
                        chatRoomInfo['members'][0] !== currentUser?.uid
                            ? chatRoomInfo?.userOne?.name
                            : chatRoomInfo?.userTwo?.name
                    }
                    pic={
                        chatRoomInfo?.userOne.id !== currentUser?.uid
                            ? chatRoomInfo?.userOne?.photoURL
                            : chatRoomInfo?.userTwo?.photoURL
                    }
                    // isOnline
                />
            </div>
        );
    }

    return (
        <div className="h-8 w-full">
            <div className="flex flex-col gap-2">
                <p className="font-bold">{chatRoomInfo?.name}</p>
                <p>{chatRoomInfo?.members?.length} members</p>
            </div>
        </div>
    );
};
