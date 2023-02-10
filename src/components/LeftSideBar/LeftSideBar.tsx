import { useState } from 'react';
import { ChatRoomList } from '../ChatRoomList/ChatRoomList';
import { TopMenuBar } from '../TopMenuBar/TopMenuBar';
import { LeftMainMenu } from './LeftMainMenu';

export const LeftSideBar = () => {
    const [isSearchActive, setSearchActive] = useState(false);

    return (
        <div className=" h-96">
            <div className="flex">
                <LeftMainMenu />
                <TopMenuBar
                    isSearchActive={isSearchActive}
                    setSearchActive={setSearchActive}
                />
            </div>
            {isSearchActive ? null : <ChatRoomList />}
        </div>
    );
};
