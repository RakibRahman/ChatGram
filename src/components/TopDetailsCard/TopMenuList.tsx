import React from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical, Info } from 'react-feather';

interface TopMenuListProps {
    menuData: {
        chatRoomId: string;
        profileId: string | null;
        type: string;
    };
}
export const TopMenuList: React.FC<TopMenuListProps> = ({ menuData }) => {
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
                        to={`${
                            menuData.type === 'room'
                                ? `/chatRoom/${menuData.chatRoomId}`
                                : `/profile/${menuData.profileId}`
                        }`}
                    >
                        <Info />

                        {menuData.type === 'room' ? 'View Room Info' : 'View Profile'}
                    </Link>
                </li>
                {/* <li>
                    <a>Item 2</a>
                </li> */}
            </ul>
        </div>
    );
};
