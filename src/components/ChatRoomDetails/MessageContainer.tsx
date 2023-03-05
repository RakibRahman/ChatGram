import { useEffect, useState } from 'react';
import { GroupMessage } from '../../models/types';
import { DeleteMessage } from '../DeleteMessage/DeleteMessage';
import { ForwardMessage } from '../ForwardMessage/ForwardMessage';
import { RenderMessageContext } from './RenderMessageContext';
import { RenderMessageView } from './RenderMessageView';
import { useChatRoomDetails } from './useChatRoomDetails';

export const MessageContainer = () => {
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [isForwardOpen, setForwardOpen] = useState(false);

    const [show, setShow] = useState(false);
    const [points, setPoints] = useState({ x: 0, y: 0 });
    const [selectedMessage, setSelectedMessage] = useState({} as GroupMessage);
    const { messageData } = useChatRoomDetails();

    useEffect(() => {
        const handleClick = () => setShow(false);
        window.addEventListener('click', handleClick);
        // localStorage.setItem('currentChat', chatRoomId!);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="overflow-hidden">
            <>
                {messageData?.groupMessages?.map((message) => (
                    <RenderMessageView
                        message={message}
                        setShow={setShow}
                        setPoints={setPoints}
                        setSelectedMessage={setSelectedMessage}
                        key={message?.messageId}
                    />
                ))}
            </>

            {show ? (
                <RenderMessageContext
                    points={points}
                    selectedMessage={selectedMessage}
                    setDeleteOpen={setDeleteOpen}
                    setForwardOpen={setForwardOpen}
                />
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
