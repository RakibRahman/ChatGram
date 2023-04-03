import React from 'react';
import { File, Image, Link, Video } from 'react-feather';
import { RecentMessage } from '../../models/types';
import { truncateText } from '../../utilities/truncateText';
import { useChatRoomList } from './useChatRoomList';

interface ChatCardMessageProps {
    recentMessage: RecentMessage;

    id: string;
    currentUserId: string;
    isNewMessage: string;
}
const messageIcon = {
    photo: <Image size="16px" />,
    video: <Video size="16px" />,
    file: <File size="16px" />,
    link: <Link size="16px" />,
};

const Indicator = () => <span className="w-3 h-3 rounded-full bg-violet-600 animate-ping"></span>;

export const ChatCardMessage: React.FC<ChatCardMessageProps> = ({
    recentMessage,
    currentUserId,
    isNewMessage,
}) => {
    const { userListHashMap } = useChatRoomList()!;
    const otherUser = userListHashMap?.[recentMessage?.uid]?.name?.split(' ')[0]
        ? userListHashMap?.[recentMessage.uid]?.name?.split(' ')[0] + ':'
        : '';

    return (
        <>
            {recentMessage ? (
                <p className={`flex items-center justify-between gap-2 text - sm font - normal`}>
                    <span className="flex gap-1 items-center">
                        {currentUserId === recentMessage?.uid ? 'You: ' : otherUser}

                        {recentMessage?.type === 'text'
                            ? truncateText(recentMessage?.message ?? '', 20)
                            : null}

                        {recentMessage?.type === 'text-link'
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
                    currentUserId !== recentMessage?.uid ? (
                        <Indicator />
                    ) : null}
                </p>
            ) : (
                'No messages here yet...'
            )}
        </>
    );
};
