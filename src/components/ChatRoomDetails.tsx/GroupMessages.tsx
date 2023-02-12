import { useRef } from 'react';
import { useScrollIntoView } from '../../hooks/useScrollIntoView';
import { getTime } from '../../utilities/getTime';
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
        <>
            <div ref={messageContainerRef}>
                <div className="md:container md:mx-auto px-2">
                    {messageData.groupMessages?.map((m) => (
                        <div
                            className={`chat chat-${
                                (m.chatRoomId.length > 20 && m.sentBy.id) === currentUser?.uid
                                    ? 'end'
                                    : 'start'
                            }`}
                        >
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        referrerPolicy="no-referrer"
                                        src={m.sentBy.pic ?? 'https://placeimg.com/192/192/people'}
                                    />
                                </div>
                            </div>
                            <div className="chat-header">
                                {m?.sentBy?.name}
                                <time className="text-xs opacity-50 ml-1">
                                    {getTime(m?.sentTime?.seconds)}
                                </time>
                            </div>
                            <div className="chat-bubble chat-bubble-primary">{m?.message}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
