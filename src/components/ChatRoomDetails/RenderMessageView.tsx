import React, { Dispatch, SetStateAction } from 'react';
import { GroupMessage } from '../../models/types';
import { getTime } from '../../utilities/getTime';
import { ImagePreview } from '../FilePreview/ImagePreview';
import URLPreview from '../FilePreview/URLPreview';
import VideoPreview from '../FilePreview/VideoPreview';
import { TextMessage } from './TextMessage';
import { useChatRoomDetails } from './useChatRoomDetails';

interface RenderMessageViewProps {
    message: GroupMessage;
    setShow: Dispatch<SetStateAction<boolean>>;
    setPoints: Dispatch<SetStateAction<{ x: number; y: number }>>;
    setSelectedMessage: Dispatch<SetStateAction<GroupMessage>>;
}

export const RenderMessageView: React.FC<RenderMessageViewProps> = ({
    message,
    setShow,
    setPoints,
    setSelectedMessage,
}) => {
    const { currentUser, userListHashMap } = useChatRoomDetails();

    return (
        <div
            className={`chat ${message.chatRoomId.length > 20 && message.sentBy === currentUser?.uid
                ? 'chat-end'
                : 'chat-start'
                } `}
        >
            <div className="chat-image avatar relative">
                <div className="w-10 rounded-full">
                    <img
                        referrerPolicy="no-referrer"
                        src={
                            userListHashMap?.[message?.sentBy]?.photoURL ??
                            'https://placeimg.com/192/192/people'
                        }
                    />
                </div>
            </div>
            <div className="chat-header capitalize">
                {userListHashMap?.[message?.sentBy]?.name ?? 'Anonymous'}
                <time className="text-xs opacity-50"> {getTime(message?.sentTime?.seconds)}</time>
            </div>
            <div
                className="chat-bubble break-words"
                onContextMenu={(e) => {
                    e.preventDefault();
                    setShow(true);
                    setSelectedMessage(message);
                    setPoints({ x: e.pageX, y: e.pageY });
                }}
            >
                {message?.type === 'video' ? (
                    <VideoPreview
                        videoLink={message?.fileLink!}
                        showControl
                        autoPlay={false}
                        height="300px"
                    />
                ) : null}

                <div className="max-w-[520px]">
                    {message?.type === 'image' ? (
                        <ImagePreview src={message?.fileLink!} width="full" height="96" />
                    ) : null}
                </div>

                {message?.type === 'link' ? <URLPreview url={message?.message} /> : null}

                {message?.type === 'text-link' ? (
                    <TextMessage message={message?.message ?? ''} />
                ) : (
                    message?.message
                )}
            </div>
        </div>
    );
};
