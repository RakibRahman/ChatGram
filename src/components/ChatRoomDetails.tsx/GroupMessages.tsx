
import React, { useRef } from 'react'
import { getTime } from '../../utilities/getTime';
import { useChatRoomDetails } from './useChatRoomDetails';

export const GroupMessages = () => {
    const message = useRef<HTMLInputElement>(null)
    const { lastMessage, currentUser, sendMessage, messageData } = useChatRoomDetails();


    return (
        <div>
            <h1>Messages</h1>
            <div className="md:container md:mx-auto border">
                {
                    messageData.groupMessages?.map((m) => (
                        <div className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img referrerPolicy="no-referrer" src={m.sentBy.pic ?? "https://placeimg.com/192/192/people"} />
                                </div>
                            </div>
                            <div className="chat-header">
                                {m?.sentBy?.name}
                                <time className="text-xs opacity-50 ml-1">{getTime(m?.sentTime?.seconds)}</time>
                            </div>
                            <div className="chat-bubble">{m?.message}</div>

                        </div>
                    ))
                }
                <input ref={message} type="text" placeholder="Type here" className="input w-full max-w-lg" />
                <button onClick={() => {
                    if (message.current && currentUser) {
                        lastMessage(message.current?.value!);
                        sendMessage(message.current?.value!);
                    };
                    if (message.current) {
                        message.current.value = '';
                    }

                }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg></button>
            </div>

        </div>
    )
}
