import React from 'react';
import { ChatCardProps } from '../../models/types';
import { Link } from 'react-router-dom';
import { getTime } from '../../utilities/getTime';
import { Avatar } from '../common/Avatar/Avatar';

export const ChatCard: React.FC<ChatCardProps> = ({
    name,
    recentMessage,
    logo,
    id,
    isActive,
}) => {
    return (
        <div
            className={`overflow-hidden max-w-sm space-y-6 hover:opacity-90 ${
                id === isActive
                    ? 'text-white bg-blue-400 hover:bg-blue-300'
                    : 'text-black'
            } hover:bg-gray-100 py-2`}
        >
            <Link to={`/${id}`}>
                <div className=" gap-3  flex w-full px-2">
                    <Avatar name={name} img={logo} />
                    <div className="grow">
                        <div className="flex justify-between   items-center ">
                            <p className="text-base  font-semibold">{name}</p>
                            <p className=" text-xs text-gray-300">
                                {getTime(recentMessage?.timestamp?.seconds) ??
                                    '...'}
                            </p>
                        </div>
                        <p
                            className={` ${
                                id === isActive
                                    ? 'text-white  '
                                    : 'text-gray-500'
                            } text-sm font-normal`}
                        >
                            {recentMessage?.message ?? '...'}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};
