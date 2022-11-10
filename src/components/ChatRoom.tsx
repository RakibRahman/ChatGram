import React from 'react'
import { SentMessage } from './SentMessage'
import { useChatRoomContext } from '../context/context'
export const ChatRoom = () => {
    const { signInWithGoogle, currentUser, loading, userError } = useChatRoomContext();


    return (
        <div>
            {loading ?
                <p>Initializing User...</p>
                : null}
            {currentUser ? currentUser.user.email : null}
            {userError ? userError.message : null}
            <button onClick={() => signInWithGoogle()}>Log in with google</button>;
            {/* <SentMessage /> */}
        </div>
    )
}
