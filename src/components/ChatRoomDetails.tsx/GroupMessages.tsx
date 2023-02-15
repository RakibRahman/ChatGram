import { useRef } from 'react';
import { useScrollIntoView } from '../../hooks/useScrollIntoView';
import { getTime } from '../../utilities/getTime';
import { Loader } from '../common/Loader/Loader';
import { useChatRoomDetails } from './useChatRoomDetails';
export const GroupMessages = () => {
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const { messageData, isValidUser, chatRoomInfo, currentUser } = useChatRoomDetails();

    useScrollIntoView(messageContainerRef, messageData?.groupMessages);

    if (!chatRoomInfo) {
        return null;
    }

    if (!isValidUser) {
        return (
            <h1 className=" bg-red-800 font-black text-center text-2xl leading-tight p-20">
                You are not a member of this group.
            </h1>
        );
    }

    return (
        <div ref={messageContainerRef} className="">
            {messageData?.loadingMessage ? (
                <div className="grid place-items-center mt-20">
                    <Loader />
                </div>
            ) : null}
            {messageData?.groupMessages?.map((message) => (
                <div
                    className={`chat ${
                        message.chatRoomId.length > 20 && message.sentBy.id === currentUser?.uid
                            ? 'chat-end'
                            : 'chat-start'
                    }`}
                >
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                referrerPolicy="no-referrer"
                                src={message.sentBy.pic ?? 'https://placeimg.com/192/192/people'}
                            />
                        </div>
                    </div>
                    <div className="chat-header">
                        {message?.sentBy?.name}
                        <time className="text-xs opacity-50">
                            {' '}
                            {getTime(message?.sentTime?.seconds)}
                        </time>
                    </div>
                    <div className="chat-bubble">{message?.message}</div>
                    <div className="chat-footer opacity-50">{/* Delivered */}</div>
                </div>
            ))}
        </div>
    );
};
