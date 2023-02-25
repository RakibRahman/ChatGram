import React from 'react';
import { ChatCardProps } from '../../models/types';
import { Link } from 'react-router-dom';
import { getTime } from '../../utilities/getTime';
import { Avatar } from '../common/Avatar/Avatar';
import { truncateText } from '../../utilities/truncateText';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const messageIcon = {
    photo: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
        </svg>
    ),
    video: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
        >
            <path
                strokeLinecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
        </svg>
    ),
    file: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
        </svg>
    ),
};

export const ChatCard: React.FC<ChatCardProps> = ({
    name,
    recentMessage,
    logo,
    id,
    isActive,
    currentUserId,
}) => {
    const isTab = useMediaQuery('(max-width: 768px)');
    console.log({ recentMessage });
    return (
        <div
            className={` overflow-hidden ${
                isTab ? 'w-auto' : 'w-full'
            } space-y-6 hover:opacity-60 ${
                id === isActive.slice(5) ? 'text-white bg-blue-400' : ''
            }  py-2 rounded - md`}
            onClick={() => {
                localStorage.setItem('activeChat', isActive);
            }}
        >
            <Link to={`/chat/${id} `}>
                <div className=" gap-3  flex w-full px-2">
                    <Avatar name={name} img={logo} />
                    <div className="grow">
                        <div className="flex justify-between   items-center ">
                            <p className="font-semibold text-sm capitalize">{name}</p>
                            <p className=" text-xs ">
                                {getTime(recentMessage?.timestamp?.seconds) ?? '...'}
                            </p>
                        </div>
                        <p
                            className={`flex items-center gap-2 ${
                                id === isActive ? ' ' : ''
                            } text - sm font - normal`}
                        >
                            {currentUserId === recentMessage.sentId
                                ? 'You: '
                                : recentMessage.sentBy.split(' ')[0] + ': '}
                            {recentMessage?.type === 'text'
                                ? truncateText(recentMessage?.message ?? '', 20)
                                : null}
                            {recentMessage?.type === 'video' ? (
                                <>
                                    {messageIcon['video']}
                                    {truncateText(recentMessage?.message ?? '', 20)}
                                </>
                            ) : null}

                            {recentMessage?.type === 'image' ? (
                                <>
                                    {messageIcon['photo']}
                                    {truncateText(recentMessage?.message ?? '', 20)}
                                </>
                            ) : null}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};
