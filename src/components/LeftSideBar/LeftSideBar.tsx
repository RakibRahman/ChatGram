import { useState } from 'react';
import { ChatRoomList } from '../ChatRoomList/ChatRoomList';
import { TopMenuBar } from '../TopMenuBar/TopMenuBar';
import { LeftMainMenu } from './LeftMainMenu';

export const LeftSideBar = () => {
    const [isSearchActive, setSearchActive] = useState(false);

    return (
        <div className=" h-full flex-shrink-0">
            <div className="flex gap-4  mb-4">
                <LeftMainMenu />
                <TopMenuBar isSearchActive={isSearchActive} setSearchActive={setSearchActive} />
            </div>
            <div className={`${isSearchActive ? 'hidden' : 'block'}`}>
                {' '}
                <ChatRoomList />
            </div>
        </div>
    );
};
