import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCopyToClipboard from '../../hooks/useCopyToClipBoard';
import { GroupMessage } from '../../models/types';
import { getTime } from '../../utilities/getTime';
import { DeleteMessage } from '../DeleteMessage/DeleteMessage';
import { ImagePreview } from '../FilePreview/ImagePreview';
import URLPreview from '../FilePreview/URLPreview';
import VideoPreview from '../FilePreview/VideoPreview';
import { ForwardMessage } from '../ForwardMessage/ForwardMessage';
import { ContextMenuItem } from './ContextMenu/ContextMenuItem';
import { ContextMenuList } from './ContextMenu/ContextMenuList';
import { useChatRoomDetails } from './useChatRoomDetails';

export const RightClickMenu = () => {
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [isForwardOpen, setForwardOpen] = useState(false);
    const { chatRoomId } = useParams();
    const [show, setShow] = useState(false);
    const [points, setPoints] = useState({ x: 0, y: 0 });
    const [selectedMessage, setSelectedMessage] = useState({} as GroupMessage);
    const { messageData, currentUser, chatRoomInfo } = useChatRoomDetails();
    const [value, copy] = useCopyToClipboard();
    const isFile = selectedMessage.type !== 'text' && selectedMessage?.fileLink;
    const isLink = selectedMessage.type === 'link';
    const isText = selectedMessage.message && selectedMessage.type === 'text';

    useEffect(() => {
        const handleClick = () => setShow(false);
        window.addEventListener('click', handleClick);
        localStorage.setItem('currentChat', chatRoomId!);
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
                            className="chat-bubble break-words"
                            onContextMenu={(e) => {
                                e.preventDefault();
                                setShow(true);
                                setSelectedMessage(message);
                                setPoints({ x: e.pageX, y: e.pageY });
                                console.log(points);
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

                            {message?.type === 'image' ? (
                                <ImagePreview src={message?.fileLink!} width="full" height="96" />
                            ) : null}

                            {message?.type === 'link' ? (
                                <URLPreview url={message?.message} />
                            ) : (
                                message?.message
                            )}
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
                        {isText ? (
                            <ContextMenuItem
                                icon="copy-text"
                                title="Copy Text"
                                action={() => {
                                    if (selectedMessage) {
                                        copy(selectedMessage?.message);
                                    }
                                }}
                            />
                        ) : null}

                        {isFile ? (
                            <ContextMenuItem
                                icon="copy-link"
                                title={`Copy ${selectedMessage.type ?? File} Link`}
                                action={() => {
                                    if (selectedMessage) {
                                        copy(selectedMessage?.fileLink!);
                                    }
                                }}
                            />
                        ) : null}

                        {isLink ? (
                            <ContextMenuItem
                                icon="url-link"
                                title={`Copy  Link`}
                                action={() => {
                                    if (selectedMessage) {
                                        copy(selectedMessage?.message!);
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

                        <ContextMenuItem
                            icon="forward"
                            title="Forward Message"
                            action={() => {
                                if (selectedMessage) {
                                    // copy(selectedMessage?.message);
                                    setForwardOpen(true);
                                }
                            }}
                        />

                        <ContextMenuItem
                            icon="delete"
                            title="Delete Message"
                            action={() => {
                                if (selectedMessage) {
                                    // copy(selectedMessage?.message);
                                    setDeleteOpen(true);
                                }
                            }}
                        />
                    </ContextMenuList>
                </div>
            ) : null}
            <DeleteMessage
                selectedMessage={selectedMessage}
                isOpen={isDeleteOpen}
                onClose={() => setDeleteOpen(false)}
            />
            <ForwardMessage
                selectedMessage={selectedMessage}
                isOpen={isForwardOpen}
                onClose={() => setForwardOpen(false)}
            />
        </div>
    );
};
