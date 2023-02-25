import { useRef } from 'react';
import { useScrollIntoView } from '../../hooks/useScrollIntoView';
import { Alert } from '../common/Alert';
import { Loader } from '../common/Loader/Loader';
import { NoMessage } from './NoMessage';
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
        return <Alert title="  You are not a member of this group." />;
    }

    return (
        <>
            <div className=" h-full  overflow-y-scroll pr-2" id="messageContainer">
                <div ref={messageContainerRef}>
                    {messageData?.loadingMessage ? (
                        <div className="grid place-items-center mt-20">
                            <Loader />
                        </div>
                    ) : null}
                    {messageData?.groupMessages?.length === 0 ? <NoMessage /> : null}
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
        </>
    );
};
