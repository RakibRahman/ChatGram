import React, { useRef } from 'react'
import { doc, setDoc } from "firebase/firestore";
import { db, timeStamp } from '../../firebase';
import { nanoid } from 'nanoid';
import { useChatRoomContext } from '../../context/context'

export const CreateChatRoom = () => {
    const chatRoomName = useRef<HTMLInputElement>(null)
    const { currentUser } = useChatRoomContext();
    const createNewChatRoom = async () => {
        await setDoc(doc(db, "chatRooms", chatRoomName.current?.value ?? ''), {
            name: chatRoomName.current?.value,
            id: `chatRoom-${nanoid(8)}`,
            createdAt: timeStamp,
            createdBy: {
                name: currentUser?.user.displayName,
                email: currentUser?.user.email,
                pic: currentUser?.user.photoURL
            }
        });
    }

    return (
        <div>
            <h1>Create chat room</h1>
            <input ref={chatRoomName} type="text" placeholder="Type here" className="input w-full max-w-xs" />
            <button onClick={() => {
                if (chatRoomName.current?.value !== '' && currentUser) {
                    createNewChatRoom()
                }
            }}>Create</button>
        </div>
    )
}
