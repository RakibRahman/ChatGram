import React from 'react'
import { ChatRoomDetails } from './ChatRoomDetails'
import { GroupMessages } from './GroupMessages'

export const ChatRoomDetailsContainer = () => {
    return (
        <div>
            <ChatRoomDetails />
            <GroupMessages />
        </div>
    )
}
