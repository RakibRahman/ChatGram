import React, { useEffect, useState } from 'react'
import { ChatRoomList } from '../ChatRoomList/ChatRoomList'
import { TopMenuBar } from '../TopMenuBar/TopMenuBar'
import { LeftMainMenu } from './LeftMainMenu'

export const LeftSideBar = () => {
    const [isSearchActive, setSearchActive] = useState(false);
    const [toggleChatList, setChatList] = useState(false);

    useEffect(() => {

        console.log(isSearchActive)
    }, [!!isSearchActive])
    return (
        <div>
            <div className="flex">
                <LeftMainMenu />
                <TopMenuBar isSearchActive={isSearchActive} setSearchActive={setSearchActive} /></div>
            {isSearchActive ? null : <ChatRoomList />}

        </div>
    )
}
