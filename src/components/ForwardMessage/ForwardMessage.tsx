import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GroupMessage } from '../../models/types';
import { Modal } from '../common/modal/Modal';
import { useSentMessage } from '../SentMessage/useSentMessage';
import { ForwardChatCard } from './ForwardChatCard';
import { useForwardMessage } from './useForwardMessage';

interface FMessageProps {
    isOpen: boolean;
    onClose: () => void;
    selectedMessage: GroupMessage;
}

export const ForwardMessage: React.FC<FMessageProps> = ({ isOpen, onClose, selectedMessage }) => {
    const { list, currentUser } = useForwardMessage();
    const { lastMessage, sendMessage } = useSentMessage();
    const navigate = useNavigate();

    return (
        <div>
            <Modal
                hideYesBtn
                hideTitleClose
                isOpen={isOpen}
                onClose={onClose}
                title="Chose Recipient..."
                yesText="Delete"
                onConfirm={() => {}}
            >
                <div>
                    <div className="py-2 mb-2">
                        <input
                            type="text"
                            className="input input-sm w-full"
                            placeholder="Search..."
                        />
                    </div>

                    <div className="h-96 overflow-y-scroll space-y-3">
                        {list.map((chatRoom) => (
                            <div
                                role="button"
                                onClick={async () => {
                                    Promise.all([
                                        lastMessage(
                                            selectedMessage.message,
                                            selectedMessage.type,
                                            chatRoom.id
                                        ),
                                        sendMessage(
                                            selectedMessage.message,
                                            selectedMessage.type,
                                            '',
                                            selectedMessage.fileLink ?? '',
                                            chatRoom.id
                                        ),
                                    ])
                                        .then(() => {
                                            onClose();
                                            navigate(`/chat/${chatRoom.id}`);
                                        })
                                        .catch((r) => {
                                            console.log(r);
                                        });
                                }}
                                key={chatRoom.id}
                            >
                                {' '}
                                {chatRoom.type === 'room' ? (
                                    <ForwardChatCard
                                        name={chatRoom.name}
                                        logo={chatRoom.logo}
                                        type={chatRoom?.type}
                                    />
                                ) : (
                                    <ForwardChatCard
                                        name={
                                            chatRoom['members'][0] !== currentUser?.uid
                                                ? chatRoom?.userOne?.name
                                                : chatRoom?.userTwo?.name
                                        }
                                        logo={
                                            chatRoom?.userOne.id !== currentUser?.uid
                                                ? chatRoom?.userOne?.photoURL
                                                : chatRoom?.userTwo?.photoURL
                                        }
                                        type={chatRoom?.type}
                                    />
                                )}{' '}
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
};
