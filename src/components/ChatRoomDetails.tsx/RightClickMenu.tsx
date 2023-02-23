import { useEffect, useState } from 'react';
import useCopyToClipboard from '../../hooks/useCopyToClipBoard';
import { GroupMessage } from '../../models/types';
import { getTime } from '../../utilities/getTime';
import { ImagePreview } from '../FilePreview/ImagePreview';
import VideoPreview from '../FilePreview/VideoPreview';
import { useChatRoomDetails } from './useChatRoomDetails';

export const RightClickMenu = () => {
    const [show, setShow] = useState(false);
    const [points, setPoints] = useState({ x: 0, y: 0 });
    const [selectedMessage, setSelectedMessage] = useState({} as GroupMessage);
    const { messageData, isValidUser, chatRoomInfo, currentUser } = useChatRoomDetails();
    const [value, copy] = useCopyToClipboard();
    useEffect(() => {
        const handleClick = () => setShow(false);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="relative">
            <>
                {messageData?.groupMessages?.map((message) => (
                    <div
                        onContextMenu={(e) => {

                            e.preventDefault();
                            setShow(true);
                            setSelectedMessage(message);
                            setPoints({ x: e.pageX, y: e.pageY });
                        }}
                        className={`chat ${message.chatRoomId.length > 20 && message.sentBy.id === currentUser?.uid
                            ? 'chat-end'
                            : 'chat-start'
                            } relative border`}
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
                        <div className="chat-bubble">
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

            {show && (
                <div
                    style={{
                        position: 'fixed',
                        top: points.y,
                        left: 10,
                        zIndex: 10,
                    }}
                >
                    <ul className="menu bg-base-100 w-56 p-2 rounded-box">
                        <li
                            onClick={() => {
                                if (selectedMessage) {
                                    copy(selectedMessage?.message);
                                }
                            }}
                        >
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                                    />
                                </svg>
                                Copy Message
                            </a>
                        </li>
                        {selectedMessage.type !== 'text' && selectedMessage?.fileLink ? (
                            <li
                                onClick={() => {
                                    if (selectedMessage.fileLink) {
                                        copy(selectedMessage?.fileLink);
                                    }
                                }}
                            >
                                <a>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                                        />
                                    </svg>
                                    Copy File Link
                                </a>
                            </li>
                        ) : null}

                        {selectedMessage.type !== 'text' && selectedMessage.fileLink ? (
                            <li>
                                <a href={selectedMessage.fileLink} download>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                                        />
                                    </svg>
                                    Download File
                                </a>
                            </li>
                        ) : null}
                        <li>
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                                Item 3
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};
