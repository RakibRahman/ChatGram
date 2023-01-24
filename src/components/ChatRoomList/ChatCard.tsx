import React from 'react';
import { ChatCardProps } from '../../models/types';
import { Link } from 'react-router-dom';
import { getTime } from '../../utilities/getTime';

export const ChatCard: React.FC<ChatCardProps> = ({
    name,
    recentMessage,
    logo,
    id,
}) => {
    return (
        <div className="overflow-hidden max-w-sm space-y-6 hover:opacity-50">
            <Link to={`/${id}`}>
                <div className=" gap-3  flex w-full px-2">
                    <img
                        className="w-12 h-12 rounded-full object-cover"
                        alt={name}
                        src={logo}
                    ></img>
                    <div className="grow">
                        <div className="flex justify-between   items-center ">
                            <p className="text-base  font-bold">{name}</p>
                            <p className=" text-xs text-gray-300">
                                {getTime(recentMessage?.timestamp?.seconds) ??
                                    '...'}
                            </p>
                        </div>
                        <p className="text-gray-300 text-sm font-normal">
                            {recentMessage?.message ?? '...'}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};