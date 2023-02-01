import React, { useRef } from 'react';
import { Modal } from '../common/modal/Modal';
import { useCreateChatRoom } from './useCreateChatRoom';

interface CreateChatRoomProps {
    isOpen: boolean;
    onClose: () => void
}

export const CreateChatRoom: React.FC<CreateChatRoomProps> = ({ isOpen, onClose }) => {
    const chatRoomName = useRef<HTMLInputElement>(null);
    const { createNewChatRoom, currentUser } = useCreateChatRoom();

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Create Chat Room"
                yesText='Create'
                onConfirm={() => {
                    if (chatRoomName.current?.value !== '' && currentUser) {
                        createNewChatRoom(chatRoomName.current?.value!);
                    }
                }}
            >
                <div className="form-control">
                    <input
                        ref={chatRoomName}
                        type="text"
                        placeholder="Chat room name"
                        className="input w-full max-w-xs border border-blue-300 focus:outline-none"
                    />

                </div>
            </Modal>

        </div>
    );
};
