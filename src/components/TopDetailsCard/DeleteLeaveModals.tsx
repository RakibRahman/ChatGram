import React, { Dispatch, SetStateAction } from 'react';
import { ModalV2 } from '../common/modal/ModalV2';
import { TopMenuListProps } from './TopMenuList';
import { useTopMenuList } from './useTopMenuList';

interface DeleteModalComponent {
    menuData: TopMenuListProps['menuData'];
    isAdminLeaving: boolean;
    leaveChatModal: boolean;
    setLeaveChatModal: Dispatch<SetStateAction<boolean>>;
    deleteChatModal: boolean;
    setDeleteChatModal: Dispatch<SetStateAction<boolean>>;
    clearChatModal: boolean;
    setClearChatModal: Dispatch<SetStateAction<boolean>>;
}

export const DeleteLeaveModals: React.FC<DeleteModalComponent> = ({
    menuData,
    isAdminLeaving,
    leaveChatModal,
    clearChatModal,
    setClearChatModal,
    setLeaveChatModal,
    deleteChatModal,
    setDeleteChatModal,
}) => {
    const { deleteChat, leaveFromRoomChat, loggedUser, clearHistory } = useTopMenuList();

    return (
        <>
            {' '}
            {/* modal for leave chat */}
            <ModalV2
                isOpen={leaveChatModal}
                onClose={() => {
                    setLeaveChatModal(false);
                }}
                title={
                    isAdminLeaving
                        ? `Leave & Delete Chat Room ${menuData?.chatName?.toUpperCase() ?? ''}?`
                        : `Leave Chat Room ${menuData?.chatName?.toUpperCase() ?? ''}?`
                }
                yesText="Confirm"
                onConfirm={() => {
                    leaveFromRoomChat(menuData.members);
                    setLeaveChatModal(false);
                }}
            >
                <p>
                    {isAdminLeaving
                        ? `Are you sure you want to delete all message history and leave this room?`
                        : 'Are you sure you want to leave this room?'}
                </p>

                <p className="mt-1">This action can't be undone.</p>
            </ModalV2>
            {/* modal for delete chat */}
            <ModalV2
                isOpen={deleteChatModal}
                onClose={() => {
                    setDeleteChatModal(false);
                }}
                title={`Delete Chat with ${menuData?.chatName?.toUpperCase() ?? ''}?`}
                yesText="Confirm"
                onConfirm={() => {
                    deleteChat(menuData.members);
                    setDeleteChatModal(false);
                }}
            >
                <p>{'Are you sure you want to leave this chat?'}</p>

                <p className="mt-1">
                    This action can't be undone & will also delete {menuData?.chatName}'s chat with
                    you.
                </p>
            </ModalV2>
            {/* modal for clear history  */}
            <ModalV2
                isOpen={clearChatModal}
                onClose={() => {
                    setClearChatModal(false);
                }}
                title={
                    menuData.type === 'single'
                        ? `Clear chat history with ${menuData?.chatName?.toUpperCase() ?? ''}?`
                        : `Clear chat history of ${menuData?.chatName?.toUpperCase() ?? ''}`
                }
                yesText="Confirm"
                onConfirm={() => {
                    if (menuData.type === 'single' || menuData.members.includes(loggedUser.uid)) {
                        clearHistory();
                    }
                    setClearChatModal(false);
                }}
            >
                <p>{'Are you sure you want to clear the chat history?'}</p>

                <p className="mt-1">
                    This action can't be undone & will also clear{' '}
                    {menuData.type === 'single' ? menuData?.chatName : 'other member'}'s chat
                    history.
                </p>
            </ModalV2>
        </>
    );
};
