import React from 'react';
import { Avatar } from '../common/Avatar/Avatar';
import { ChatRoomDetails } from './ChatRoomDetails';
import { DetailsTopCard } from './DetailsTopCard';
import { GroupMessages } from './GroupMessages';
import { SentMessage } from './SentMessage';

export const ChatRoomDetailsContainer = () => {
    return (
        <div className="grow ">
            {/* <ChatRoomDetails /> */}
            <DetailsTopCard />
            <div className="h-[32rem] overflow-hidden overflow-y-scroll">
                {' '}
                <GroupMessages />
            </div>
            <SentMessage />
        </div>
    );
};
