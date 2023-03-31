import React, { useState } from 'react';
import { Delete, Info, LogOut, MoreVertical, Trash } from 'react-feather';
import { Link } from 'react-router-dom';
import { useTopMenuList } from './useTopMenuList';
import { ModalV2 } from '../common/modal/ModalV2';
import { DeleteLeaveModals } from './DeleteLeaveModals';

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
    const { deleteChat, leaveFromRoomChat, loggedUser, clearHistory } = useTopMenuList();
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

                            {isAdminLeaving ? 'Delete & Leave' : 'Leave Room'}
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
