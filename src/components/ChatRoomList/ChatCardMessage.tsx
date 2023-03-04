import React, { useRef } from 'react';
import { RecentMessage } from '../../models/types';
import { truncateText } from '../../utilities/truncateText';

interface ChatCardMessageProps {
    recentMessage: RecentMessage;
    isActive: string;
    id: string;
    currentUserId: string;
    isNewMessage: string;
}
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
    link: (
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
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
        </svg>
    ),
};

const Indicator = () => <div className="w-4 h-4 rounded-full bg-sky-400 animate-ping"></div>;

export const ChatCardMessage: React.FC<ChatCardMessageProps> = ({
    recentMessage,
    isActive,
    id,
    currentUserId,
    isNewMessage,
}) => {
    return (
        <>
            {recentMessage ? (
                <p className={`flex items-center justify-between gap-2 text - sm font - normal`}>
                    <span className="flex gap-1 items-center">
                        {currentUserId === recentMessage?.sentId
                            ? 'You: '
                            : recentMessage?.sentBy.split(' ')[0] + ': ' ?? ''}

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

                        {recentMessage?.type === 'link' ? (
                            <>
                                {messageIcon['link']}
                                {truncateText(recentMessage?.message ?? '', 20)}
                            </>
                        ) : null}
                    </span>

                    {isNewMessage !== recentMessage?.message &&
                    currentUserId !== recentMessage?.sentId ? (
                        <Indicator />
                    ) : null}
                </p>
            ) : (
                'No messages here yet...'
            )}
        </>
    );
};
