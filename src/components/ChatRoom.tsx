import { useEffect, useRef, useState } from 'react';
import { useChatRoomContext } from '../context/context';

import { useNavigate } from 'react-router-dom';
import { updateUserOnlineStatus } from './apiOperations';
export const ChatRoom = () => {
    const navigate = useNavigate();
    const { currentUser, loading, userError, signOut } = useChatRoomContext();
    const [toggleModal, setToggleModal] = useState(false);
    const chatRoomId = useRef<HTMLInputElement>(null);
    const userId = useRef('');

    useEffect(() => {
        if (!loading && currentUser) {
            userId.current = currentUser.uid;
            updateUserOnlineStatus(currentUser?.uid);
        }
    }, [currentUser, loading]);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, []);

    return (
        <div className="max-w-7xl  mx-auto px-4 border h-screen py-16">
            {loading ? <p>Initializing User...</p> : null}
            {currentUser ? currentUser.email : null}
            {userError ? userError.message : null}
            {currentUser ? (
                <button
                    className="btn"
                    onClick={() => {
                        signOut();
                        // updateUserOnlineStatus(userId.current, 'Offline');
                    }}
                >
                    Sign Out
                </button>
            ) : null}

            {/* {currentUser ? <CreateChatRoom /> : null} */}
            <button className="btn gap-2" onClick={() => setToggleModal(true)}>
                Button
            </button>
            {/* {currentUser ? <ChatRoomList /> : null} */}
            {/* <Modal
                isOpen={toggleModal}
                onClose={() => setToggleModal(false)}
                title="Join chat room"
                onConfirm={() => {
                    if (chatRoomId.current && currentUser) {
                        joinChatRoom(chatRoomId.current.value, currentUser.uid);
                    }
                }}
            >
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Enter Chat Room Code</span>
                    </label>
                    <label className="input-group">
                        <span>Code</span>
                        <input
                            ref={chatRoomId}
                            type="text"
                            placeholder="info@site.com"
                            className="input input-bordered"
                        />
                    </label>
                </div>
            </Modal> */}
        </div>
    );
};
