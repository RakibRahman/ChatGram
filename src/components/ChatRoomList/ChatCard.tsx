import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChatCardProps } from '../../models/types';
import { getTime } from '../../utilities/getTime';
import { Avatar } from '../common/Avatar/Avatar';
import { ChatCardMessage } from './ChatCardMessage';

export const ChatCard: React.FC<ChatCardProps> = ({
    name,
    recentMessage,
    logo,
    id,
    currentUserId,
}) => {
    // const { logData } = useChatRoomDetails();

    const [newMessage, setNewMessage] = useState(recentMessage?.message);
    const isSelected = id === localStorage.getItem('activeChat');

    return (
        <Link to={`/chat/${id} `}>
            <div
                className={`indicator overflow-hidden w-full space-y-6 hover:opacity-60 ${
                    isSelected ? 'text-white bg-sky-500' : ''
                }  py-2 rounded - md`}
                onClick={() => {
                    setNewMessage(recentMessage?.message);
                    // updateChatRoomUsersInfo()
                    // logData();
                }}
            >
                <div className=" gap-3  flex w-full px-2 ">
                    <Avatar name={name} img={logo} />
                    <div className="grow">
                        <div className="flex justify-between   items-center ">
                            <p className="font-semibold text-sm capitalize">{name}</p>
                            {recentMessage ? (
                                <p className=" text-xs ml-1">
                                    {getTime(recentMessage?.timestamp?.seconds) ?? '...'}
                                </p>
                            ) : null}
                        </div>
                        <ChatCardMessage
                            recentMessage={recentMessage}
                            id={id}
                            currentUserId={currentUserId}
                            isNewMessage={newMessage}
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
};
