import { useRef } from 'react';
import { useScrollIntoView } from '../../hooks/useScrollIntoView';
import { getTime } from '../../utilities/getTime';
import { Loader } from '../common/Loader/Loader';
import { ImagePreview } from '../FilePreview/ImagePreview';
import VideoPreview from '../FilePreview/VideoPreview';
import { SentMessage } from '../SentMessage/SentMessage';
import { RightClickMenu } from './RightClickMenu';

import { useChatRoomDetails } from './useChatRoomDetails';

export const Messages = () => {
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
        <div className="flex flex-col justify-between w-full h-full ">
            <div className=" h-[30rem]  overflow-y-scroll pr-2" id="messageContainer">
                <div ref={messageContainerRef}>
                    {messageData?.loadingMessage ? (
                        <div className="grid place-items-center mt-20">
                            <Loader />
                        </div>
                    ) : null}

                    {/* {messageData?.groupMessages?.map((message) => (
                        <div
                            className={`chat ${message.chatRoomId.length > 20 &&
                                message.sentBy.id === currentUser?.uid
                                ? 'chat-end'
                                : 'chat-start'
                                }`}
                        >
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        referrerPolicy="no-referrer"
                                        src={
                                            message.sentBy.pic ??
                                            'https://placeimg.com/192/192/people'
                                        }
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
                            <div className="chat-bubble">

                                {message?.type.includes('video') ? <VideoPreview videoLink={message?.fileLink!} showControl autoPlay={false} height='300px' /> : null}

                                {message?.type.includes('image') ? <ImagePreview src={message?.fileLink!} width='full' height='96' /> : null}

                                {message?.message}
                            </div>

                        </div>
                    ))} */}
                    <RightClickMenu />
                </div>
            </div>
            <div className=" w-full h-20 ">
                <SentMessage />
            </div>
        </div>
    );
};
