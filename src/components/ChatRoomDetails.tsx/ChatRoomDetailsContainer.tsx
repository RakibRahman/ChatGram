import React from 'react';
import { ChatRoomDetails } from './ChatRoomDetails';
import { GroupMessages } from './GroupMessages';

export const ChatRoomDetailsContainer = () => {
    return (
        <div className="grow   overflow-y-scroll h-full overflow-hidden">
            {/* <ChatRoomDetails /> */}
            <GroupMessages />
        </div>
    );
};
