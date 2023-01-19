import { useRef } from "react";
import { getTime } from "../../utilities/getTime";
import { Loader } from "../Loader/Loader";
import { useChatRoomDetails } from "./useChatRoomDetails";
export const ChatRoomDetails = () => {
    const message = useRef<HTMLInputElement>(null)
    const { lastMessage, currentUser, chatRoomInfo, loading, error, sendMessage, messageData } = useChatRoomDetails();

    const createDate = getTime(chatRoomInfo?.createdAt?.seconds, true);


    if (loading) {
        return <Loader />
    }

    if (error) {
        return <p>Failed to load chat </p>
    }

    console.log('456');
    return (
        <div>
            <div className="hero" style={{ backgroundImage: `url(${chatRoomInfo?.logo!})` }}>
                <div className="hero-overlay bg-opacity-60  py-10"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">{chatRoomInfo?.name}</h1>

                        <p>Created At:  {createDate}</p>
                        <p>Created By: {chatRoomInfo?.createdBy?.name}</p>
                        <p>Created By: {chatRoomInfo?.createdBy?.email}</p>

                        <p>
                            Members: {chatRoomInfo?.members.length}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <h1>Messages</h1>
                <div className="md:container md:mx-auto border">
                    {
                        messageData.message?.map((m) => (
                            <div className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={m?.sentBy.pic ?? "https://placeimg.com/192/192/people"} />
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

                    }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg></button>
                </div>

            </div>
        </div>
    )
}
