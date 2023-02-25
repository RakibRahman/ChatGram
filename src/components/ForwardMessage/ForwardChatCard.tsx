import React from 'react';
import { Avatar } from '../common/Avatar/Avatar';
import { ChatRoom } from '../../models/types';

export const ForwardChatCard: React.FC<Partial<ChatRoom>> = ({ name, logo, type }) => {
    return (
        <div className=" gap-3  flex w-full px-2 cursor-pointer">
            <Avatar name={name!} img={logo} />
            <div className="grow">
                <div className="flex justify-between   items-center ">
                    <p className="font-semibold text-sm capitalize">{name}</p>
                </div>
                <p>{type === 'room' ? type : ''}</p>
            </div>
        </div>
    );
};
