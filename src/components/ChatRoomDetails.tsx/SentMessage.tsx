import React, { useRef } from 'react'
import { useChatRoomDetails } from './useChatRoomDetails';

export const SentMessage = () => {
    const messageRef = useRef<HTMLInputElement>(null);
    const {
        lastMessage,
        currentUser,
        sendMessage,
        messageData,
        isValidUser,
        chatRoomInfo,
    } = useChatRoomDetails();
    return (
        <div>
            <input
                ref={messageRef}
                type="text"
                placeholder="Type here"
                className="input w-full max-w-lg"
            />
            <button
                onClick={() => {
                    if (messageRef.current && currentUser) {
                        lastMessage(messageRef.current?.value!);
                        sendMessage(messageRef.current?.value!);
                    }
                    if (messageRef.current) {
                        messageRef.current.value = '';
                    }
                }}
            >
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
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                </svg>
            </button>
        </div>
    )
}
