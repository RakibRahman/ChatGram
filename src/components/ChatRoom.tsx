import { useChatRoomContext } from '../context/context';
import { CreateChatRoom } from './CreateChatRoom/CreateChatRoom';
import { useState, useRef, useEffect } from 'react';
import { Modal } from './common/modal/Modal';
import { joinChatRoom, updateUserOnlineStatus } from './apiOperations';
import { useNavigate } from 'react-router-dom';
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                    />
                </svg>
                Button
            </button>
            {/* {currentUser ? <ChatRoomList /> : null} */}
            <Modal
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
            </Modal>
        </div>
    );
};
