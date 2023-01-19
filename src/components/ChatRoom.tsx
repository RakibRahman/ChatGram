import { useChatRoomContext } from '../context/context';
import { ChatRoomList } from './ChatRoomList/ChatRoomList';
import { CreateChatRoom } from './CreateChatRoom/CreateChatRoom';
import { useState, useRef } from 'react';
import { Modal } from './modal/Modal';
import { joinChatRoom } from './apiOperations';

export const ChatRoom = () => {
    const { signInWithGoogle, currentUser, loading, userError, signOut } = useChatRoomContext();
    const [toggleModal, setToggleModal] = useState(false);
    // console.log(currentUser);
    const chatRoomId = useRef<HTMLInputElement>(null);

    if (!currentUser) {
        return <button className="btn" onClick={() => signInWithGoogle()}>Log in with google</button>;
    }
    return (
        <div>
            {loading ?
                <p>Initializing User...</p>
                : null}
            {currentUser ? currentUser.email : null}
            {userError ? userError.message : null}
            {currentUser ? <button className="btn" onClick={() => signOut()}>Sign Out</button> : null}

            {currentUser ? <CreateChatRoom /> : null}
            <button className="btn gap-2" onClick={() => setToggleModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>

                Button
            </button>
            <ChatRoomList />
            <Modal isOpen={toggleModal} onClose={() => setToggleModal(false)} title="Join chat room" onConfirm={() => {
                if (chatRoomId.current && currentUser) {
                    joinChatRoom(chatRoomId.current.value, currentUser.uid);
                }
            }}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Enter Chat Room Code</span>
                    </label>
                    <label className="input-group">
                        <span>Code</span>
                        <input ref={chatRoomId} type="text" placeholder="info@site.com" className="input input-bordered" />
                    </label>
                </div>
            </Modal>
        </div>
    )
}
