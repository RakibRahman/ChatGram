import React, { useDeferredValue, useState } from 'react';
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
    const [searchKey, setSearchKey] = useState('');
    const query = useDeferredValue(searchKey);
    const { chatList, currentUser, userListHashMap } = useForwardMessage(query);
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
                            onChange={(e) => {
                                setSearchKey(e.target.value);
                            }}
                        />
                    </div>

                    <div className="h-96 overflow-y-scroll space-y-3" id="messageContainer">
                        {chatList.length === 0 ? <p> No match found in your chat list!</p> : null}
                        {chatList.map((chatRoom) => (
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
                                            chatRoom?.['members'][0] === currentUser?.uid
                                                ? userListHashMap?.[chatRoom['members'][1]]?.[
                                                      'name'
                                                  ]
                                                : userListHashMap?.[chatRoom['members'][0]]?.[
                                                      'name'
                                                  ]
                                        }
                                        logo={
                                            chatRoom?.['members'][0] === currentUser?.uid
                                                ? userListHashMap?.[chatRoom['members'][1]]?.[
                                                      'photoURL'
                                                  ]
                                                : userListHashMap?.[chatRoom['members'][0]]?.[
                                                      'photoURL'
                                                  ]
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
