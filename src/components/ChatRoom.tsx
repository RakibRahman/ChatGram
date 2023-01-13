import React from 'react'
import { SentMessage } from './SentMessage'
import { useChatRoomContext } from '../context/context'
import { CreateChatRoom } from './CreateChatRoom/CreateChatRoom';
import { ChatRoomList } from './ChatRoomList';

export const ChatRoom = () => {
    const { signInWithGoogle, currentUser, loading, userError, signOut } = useChatRoomContext();

    console.log(currentUser);
    if (!currentUser) {

    }
    return (
        <div>
            {loading ?
                <p>Initializing User...</p>
                : null}
            {currentUser ? currentUser.user.email : null}
            {userError ? userError.message : null}
            {currentUser ? <button className="btn" onClick={() => signOut()}>Sign Out</button> : null}
            {!currentUser ? <button className="btn" onClick={() => signInWithGoogle()}>Log in with google</button> : null}
            {currentUser ? <CreateChatRoom /> : null}
            <ChatRoomList />
        </div>
    )
}
