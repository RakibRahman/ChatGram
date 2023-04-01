import React, { useRef } from 'react';
import { ModalV2 } from '../common/modal/ModalV2';
import { joinChatRoom } from '../apiOperations';
import { UserInfo } from '../../models/types';
import { useNavigate } from 'react-router-dom';

interface JoinChatRoomProps {
    isOpen: boolean;
    onClose: () => void;
}

export const JoinChatRoom: React.FC<JoinChatRoomProps> = ({ isOpen, onClose }) => {
    const chatRoomId = useRef<HTMLInputElement>(null);
    const currentUser: UserInfo = JSON.parse(localStorage.getItem('currentUser')!) ?? {};
    const navigate = useNavigate();
    return (
        <>
            <ModalV2
                isOpen={isOpen}
                onClose={onClose}
                yesText="Join"
                title="Join chat room"
                onConfirm={() => {
                    if (chatRoomId.current) {
                        joinChatRoom(chatRoomId.current.value, currentUser.uid).then(() => {
                            onClose();
                            navigate(`/chat/${chatRoomId?.current?.value.trim()}`);
                            localStorage.setItem(
                                'activeChat',
                                chatRoomId?.current?.value.trim() ?? ''
                            );
                        });
                    }
                }}
            >
                <div className="form-control w-96">
                    <input
                        ref={chatRoomId}
                        type="text"
                        placeholder="Enter Chat Room Id"
                        className="input input-md w-full max-w-full border border-blue-300 focus:outline-none"
                    />
                    <span className="label-text mt-2">
                        For a chat room ID, ask your connection or group admin.
                    </span>
                </div>
            </ModalV2>
        </>
    );
};
