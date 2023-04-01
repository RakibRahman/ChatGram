import React, { useState } from 'react';
import { Copy, Delete, Info, LogOut, MoreVertical, Trash } from 'react-feather';
import { Link } from 'react-router-dom';
import { DeleteLeaveModals } from './DeleteLeaveModals';
import useCopyToClipboard from '../../hooks/useCopyToClipBoard';

export interface TopMenuListProps {
    menuData: {
        chatRoomId: string;
        profileId: string | null;
        type: string;
        members: string[];
        chatName: string;
    };
}
export const TopMenuList: React.FC<TopMenuListProps> = ({ menuData }) => {
    const [value, copy] = useCopyToClipboard();

    const [deleteChatModal, setDeleteChatModal] = useState(false);
    const [leaveChatModal, setLeaveChatModal] = useState(false);
    const [clearChatModal, setClearChatModal] = useState(false);

    const isAdminLeaving = menuData.type === 'room' && menuData.members.length === 1;
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
                {menuData.type === 'room' ? (
                    <li>
                        <a
                            onClick={() => {
                                copy(menuData.chatRoomId);
                            }}
                        >
                            <Copy />
                            Share Room ID
                        </a>
                    </li>
                ) : null}
                <li>
                    <a
                        onClick={() => {
                            setClearChatModal(true);
                        }}
                    >
                        <Delete />
                        Clear History
                    </a>
                </li>
                {menuData.type === 'single' ? (
                    <li>
                        <a
                            className="text-red-400"
                            onClick={() => {
                                setDeleteChatModal(true);
                            }}
                        >
                            {' '}
                            <Trash />
                            Delete Chat
                        </a>
                    </li>
                ) : null}

                {menuData.type === 'room' ? (
                    <li>
                        <a
                            className="text-red-400"
                            onClick={() => {
                                // removeUserFiles();
                                console.log(menuData.members);
                                setLeaveChatModal(true);
                            }}
                        >
                            {isAdminLeaving ? <Trash /> : <LogOut />}

                            {isAdminLeaving ? 'Delete & Leave Room' : 'Leave Room'}
                        </a>
                    </li>
                ) : null}
            </ul>

            <DeleteLeaveModals
                isAdminLeaving={isAdminLeaving}
                menuData={menuData}
                leaveChatModal={leaveChatModal}
                setLeaveChatModal={setLeaveChatModal}
                deleteChatModal={deleteChatModal}
                clearChatModal={clearChatModal}
                setClearChatModal={setClearChatModal}
                setDeleteChatModal={setDeleteChatModal}
            />
        </div>
    );
};
