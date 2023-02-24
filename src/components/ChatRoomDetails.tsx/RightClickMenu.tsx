import { useEffect, useState } from 'react';
import useCopyToClipboard from '../../hooks/useCopyToClipBoard';
import { GroupMessage } from '../../models/types';
import { getTime } from '../../utilities/getTime';
import { ImagePreview } from '../FilePreview/ImagePreview';
import VideoPreview from '../FilePreview/VideoPreview';
import { ContextMenuItem } from './ContextMenu/ContextMenuItem';
import { ContextMenuList } from './ContextMenu/ContextMenuList';
import { useChatRoomDetails } from './useChatRoomDetails';

export const RightClickMenu = () => {
    const [show, setShow] = useState(false);
    const [points, setPoints] = useState({ x: 0, y: 0 });
    const [selectedMessage, setSelectedMessage] = useState({} as GroupMessage);
    const { messageData, currentUser } = useChatRoomDetails();
    const [value, copy] = useCopyToClipboard();
    const isFile = selectedMessage.type !== 'text' && selectedMessage?.fileLink;

    useEffect(() => {
        const handleClick = () => setShow(false);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="overflow-hidden">
            <>
                {messageData?.groupMessages?.map((message) => (
                    <div
                        className={`chat ${
                            message.chatRoomId.length > 20 && message.sentBy.id === currentUser?.uid
                                ? 'chat-end'
                                : 'chat-start'
                        } `}
                    >
                        <div className="chat-image avatar relative">
                            <div className="w-10 rounded-full">
                                <img
                                    referrerPolicy="no-referrer"
                                    src={
                                        message.sentBy.pic ?? 'https://placeimg.com/192/192/people'
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
                        <div
                            className="chat-bubble "
                            onContextMenu={(e) => {
                                e.preventDefault();
                                setShow(true);
                                setSelectedMessage(message);
                                setPoints({ x: e.pageX, y: e.pageY });
                                console.log(points);
                            }}
                        >
                            {message?.type.includes('video') ? (
                                <VideoPreview
                                    videoLink={message?.fileLink!}
                                    showControl
                                    autoPlay={false}
                                    height="300px"
                                />
                            ) : null}

                            {message?.type.includes('image') ? (
                                <ImagePreview src={message?.fileLink!} width="full" height="96" />
                            ) : null}

                            {message?.message}
                        </div>
                    </div>
                ))}
            </>

            {show ? (
                <div
                    style={{
                        position: 'absolute',
                        top: `${points.y}px`,
                        left: `${points.x}px`,
                        zIndex: 10,
                    }}
                >
                    <ContextMenuList>
                        <ContextMenuItem
                            icon="copy-text"
                            title="Copy Text"
                            action={() => {
                                if (selectedMessage) {
                                    copy(selectedMessage?.message);
                                }
                            }}
                        />

                        {isFile ? (
                            <ContextMenuItem
                                icon="copy-link"
                                title="Copy File Link"
                                action={() => {
                                    if (selectedMessage) {
                                        copy(selectedMessage?.fileLink!);
                                    }
                                }}
                            />
                        ) : null}

                        {isFile ? (
                            <ContextMenuItem
                                icon="download"
                                downloadUrl={selectedMessage?.fileLink!}
                                title="Download File"
                                action={() => {}}
                            />
                        ) : null}
                    </ContextMenuList>
                </div>
            ) : null}
        </div>
    );
};
