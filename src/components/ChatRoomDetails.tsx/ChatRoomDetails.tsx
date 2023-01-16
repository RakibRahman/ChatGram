import { useRef } from "react";
import { Loader } from "../Loader";
import { useChatRoomDetails } from "./useChatRoomDetails";
export const ChatRoomDetails = () => {
    const message = useRef<HTMLInputElement>(null)
    const { lastMessage, currentUser, chatRoomInfo, loading, error, sendMessage } = useChatRoomDetails();

    const createDate = new Date(chatRoomInfo?.createdAt?.seconds * 1000)

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <p>Failed to load chat </p>
    }


    return (
        <div>
            <div className="hero" style={{ backgroundImage: `url(${chatRoomInfo?.logo!})` }}>
                <div className="hero-overlay bg-opacity-60  py-10"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">{chatRoomInfo?.name}</h1>

                        <p>Created At:  {createDate.toDateString()}</p>
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
                <input ref={message} type="text" placeholder="Type here" className="input w-full max-w-xs" />
                <button onClick={() => {
                    if (message.current?.value !== '' && currentUser) {
                        lastMessage(message.current?.value!);
                        sendMessage(message.current?.value!)
                    }
                }}>Send</button>
            </div>
        </div>
    )
}
