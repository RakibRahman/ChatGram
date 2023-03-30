import React from 'react';
import { Info, MoreVertical, Trash } from 'react-feather';
import { Link } from 'react-router-dom';
import { useTopMenuList } from './useTopMenuList';

interface TopMenuListProps {
    menuData: {
        chatRoomId: string;
        profileId: string | null;
        type: string;
        members: string[];
    };
}
export const TopMenuList: React.FC<TopMenuListProps> = ({ menuData }) => {
    const { deleteChat } = useTopMenuList();
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-square btn-sm rounded-btn">
                <MoreVertical />
            </label>
            <ul
                tabIndex={0}
                className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
                <li>
                    <Link
                        to={`${menuData.type === 'room'
                                ? `/chatRoom/${menuData.chatRoomId}`
                                : `/profile/${menuData.profileId}`
                            }`}
                    >
                        <Info />

                        {menuData.type === 'room' ? 'View Room Info' : 'View Profile'}
                    </Link>
                </li>
                <li>
                    <a
                        onClick={async () => {
                            // removeUserFiles();
                            console.log(menuData.members);

                            deleteChat(menuData.members);

                        }}
                    >
                        {' '}
                        <Trash />
                        {menuData.type === 'room' ? 'Leave Room' : 'Delete Chat'}
                    </a>
                </li>
            </ul>
        </div>
    );
};
