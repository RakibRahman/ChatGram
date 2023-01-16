import { useRef } from 'react';
import { useCreateChatRoom } from './useCreateChatRoom';

export const CreateChatRoom = () => {
    const chatRoomName = useRef<HTMLInputElement>(null)
    const { createNewChatRoom, currentUser } = useCreateChatRoom()

    return (
        <div>
            <h1>Create chat room</h1>
            <input ref={chatRoomName} type="text" placeholder="Type here" className="input w-full max-w-xs" />
            <button onClick={() => {
                if (chatRoomName.current?.value !== '' && currentUser) {
                    createNewChatRoom(chatRoomName.current?.value!);
                }
            }}>Create</button>
        </div>
    )
}
