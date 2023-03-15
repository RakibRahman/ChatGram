import React, { useRef, useState } from 'react';
import { Camera } from 'react-feather';
import { ChatRoom } from '../../models/types';
import { Modal } from '../common/modal/Modal';
import { ProgressBar } from '../common/ProgressBar/ProgressBar';
import useFireBaseUpload from '../FileUpload/useFirebaseUpload';
import { useCreateChatRoom, RoomUpdatePayload } from './useCreateChatRoom';
import { randomRoomBg } from './useCreateChatRoom';
import { nanoid } from 'nanoid';

interface CreateChatRoomProps {
    isOpen: boolean;
    onClose: () => void;
    chatRoomInfo?: ChatRoom;
    isEditMode?: boolean;
}

const chatRoomId = `chatRoom-${nanoid(8)}`;
export const CreateChatRoom: React.FC<CreateChatRoomProps> = ({
    isOpen,
    onClose,
    chatRoomInfo,
    isEditMode = false,
}) => {
    const { createNewChatRoom, updateChatRoom } = useCreateChatRoom();
    const [selectedFile, setSelectedFile] = useState<File>();
    const maxBioLength = 200;
    const { handleUpload, state, cancelUpload, discardUpload } = useFireBaseUpload();
    const { progress, uploading, downloadURL, fullPath } = state;

    const roomInfo = useRef({} as RoomUpdatePayload);

    const [roomBioLength, setRoomBioLength] = useState<number>(
        chatRoomInfo?.story ? maxBioLength - chatRoomInfo.story.length : maxBioLength
    );

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                    setSelectedFile(undefined);
                    if (uploading) {
                        cancelUpload();
                    }

                    if (selectedFile && !uploading) {
                        discardUpload(state.fullPath);
                    }
                }}
                title={isEditMode ? 'Update Chat Room' : 'Create Chat Room'}
                yesText={isEditMode ? 'Update' : 'Create'}
                onConfirm={() => {
                    if (!uploading && chatRoomInfo && isEditMode) {
                        const payload = { ...roomInfo.current };
                        if (downloadURL) {
                            payload.logo = downloadURL;
                            payload.logoURLPath = fullPath;
                        }
                        updateChatRoom(payload, chatRoomInfo.id).then(() => {
                            chatRoomInfo.logoURLPath && discardUpload(chatRoomInfo.logoURLPath);
                        });
                    }
                    if (roomInfo.current?.name !== '' && !uploading && !isEditMode) {
                        createNewChatRoom(roomInfo.current, chatRoomId, state);
                    }

                    onClose();
                }}
            >
                <div className="form-control">
                    <div className="relative max-h-56">
                        <label
                            className="cursor-pointer absolute bottom-0 right-0 text-white w-10 h-10 grid place-items-center rounded-full bg-sky-500 text-center"
                            htmlFor="photoURL"
                        >
                            <Camera />
                        </label>
                        <img
                            src={
                                selectedFile
                                    ? URL.createObjectURL(selectedFile)
                                    : chatRoomInfo?.logo ?? randomRoomBg
                            }
                            alt="profilePic"
                            className="w-full max-h-56  rounded-lg object-cover"
                        />
                        <input
                            // defaultValue={currentUser?.photoURL ?? ''}
                            onChange={(r) => {
                                const file = r.target.files ? r.target.files[0] : undefined;
                                setSelectedFile(file);
                                if (file) {
                                    handleUpload(file, 'room', chatRoomId);
                                }
                            }}
                            name="photoURL"
                            id="photoURL"
                            type="file"
                            accept="image/*"
                            placeholder="Profile Pic URL"
                            className="input hidden input-md w-full max-w-xs border border-blue-300 focus:outline-none"
                        />
                        <div className="mt-4">
                            {' '}
                            {uploading ? <ProgressBar value={progress} /> : null}
                        </div>
                    </div>
                    <div className="mt-8 mb-4">
                        <label htmlFor="chatRoomName">Room Name</label>
                        <input
                            defaultValue={chatRoomInfo?.name ?? ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                roomInfo.current.name = value;
                            }}
                            type="text"
                            placeholder="Chat Room Name"
                            className="input input-md w-full max-w-full border border-blue-300 focus:outline-none"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between">
                            {' '}
                            <label htmlFor="status" className="font-medium tracking-wide">
                                Description
                            </label>{' '}
                            <p>{roomBioLength}</p>{' '}
                        </div>
                        <textarea
                            maxLength={maxBioLength}
                            onChange={(r) => {
                                if (r.target.value.length <= maxBioLength) {
                                    roomInfo.current.story = r.target.value;

                                    setRoomBioLength(maxBioLength - r.target.value.length);
                                }
                            }}
                            id="story"
                            placeholder="Any description of the room"
                            defaultValue={chatRoomInfo?.story ?? ''}
                            name="story"
                            className="textarea textarea-bordered textarea-md w-full max-w-full"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};
