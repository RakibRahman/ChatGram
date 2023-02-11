import React from 'react';
import { ChatCardProps } from '../../models/types';
import { Link } from 'react-router-dom';
import { getTime } from '../../utilities/getTime';
import { Avatar } from '../common/Avatar/Avatar';
import { truncateText } from '../../utilities/truncateText';

export const ChatCard: React.FC<ChatCardProps> = ({ name, recentMessage, logo, id, isActive }) => {
    return (
        <div
            className={`overflow-hidden max-w-sm space-y-6 hover:opacity-60 ${
                id === isActive ? 'text-white bg-blue-400' : ''
            }  py-2 rounded-md `}
            onClick={() => {
                localStorage.setItem('activeChat', isActive);
            }}
        >
            <Link to={`/${id}`}>
                <div className=" gap-3  flex w-full px-2">
                    <Avatar name={name} img={logo} />
                    <div className="grow">
                        <div className="flex justify-between   items-center ">
                            <p className="text-base  font-semibold">{name}</p>
                            <p className=" text-xs ">
                                {getTime(recentMessage?.timestamp?.seconds) ?? '...'}
                            </p>
                        </div>
                        <p className={` ${id === isActive ? ' ' : ''} text-sm font-normal`}>
                            {truncateText(recentMessage?.message ?? '...', 20)}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};
