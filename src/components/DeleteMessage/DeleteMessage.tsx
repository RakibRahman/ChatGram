import React from 'react';
import { GroupMessage } from '../../models/types';
import { Modal } from '../common/modal/Modal';
import { useDeleteMessage } from './useDeleteMessage';

interface DeleteMessageProps {
    isOpen: boolean;
    onClose: () => void;
    selectedMessage: GroupMessage;
}

export const DeleteMessage: React.FC<DeleteMessageProps> = ({
    isOpen,
    onClose,
    selectedMessage,
}) => {
    if (!selectedMessage) return null;

    const { handleDeleteMessage } = useDeleteMessage(selectedMessage);

    return (
        <div>
            <Modal
                hideTitleClose
                isOpen={isOpen}
                onClose={onClose}
                title="Do you want to delete this message?"
                yesText="Delete"
                onConfirm={() => {
                    handleDeleteMessage();
                    onClose();
                }}
            ></Modal>
        </div>
    );
};
