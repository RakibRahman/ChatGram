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
    chatRoomInfo?: ChatRoom
}

export const CreateChatRoom: React.FC<CreateChatRoomProps> = ({ isOpen, onClose, chatRoomInfo }) => {
    const chatRoomId = `chatRoom-${nanoid(8)}`;

    const { createNewChatRoom, currentUser } = useCreateChatRoom();
    const [selectedFile, setSelectedFile] = useState<File>();

    const { handleUpload, state, dispatch, cancelUpload, discardUpload } = useFireBaseUpload();
    const { progress, uploading, downloadURL, file, fullPath } = state;


    const roomInfo = useRef({} as RoomUpdatePayload);

    const [roomBioLength, setRoomBioLength] = useState<number>(currentUser?.story?.length);
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
                }}
                title="Create Chat Room"
                yesText="Create"
                onConfirm={() => {
                    console.log(roomInfo.current);

                    if (selectedFile) {
                        handleUpload(selectedFile, 'room', chatRoomId);
                    }


                    if (roomInfo.current?.name !== '' && currentUser && !uploading) {
                        createNewChatRoom(roomInfo.current, chatRoomId, state);

                    }
                    // onClose();
                }}
            >
                <div className="form-control">

                    <div className="relative max-h-50">
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
                            className="w-full max-h-50  rounded-lg object-cover"
                        />
                        <input
                            // defaultValue={currentUser?.photoURL ?? ''}
                            onChange={(r) => {
                                const file = r.target.files ? r.target.files[0] : undefined;
                                setSelectedFile(file);
                            }}
                            name="photoURL"
                            id="photoURL"
                            type="file"
                            accept="image/*"
                            placeholder="Profile Pic URL"

                            className="input hidden input-md w-full max-w-xs border border-blue-300 focus:outline-none"
                        />
                        {uploading ? <ProgressBar value={progress} /> : null}

                    </div>
                    <div className='my-4'>
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
                            <label
                                htmlFor="status"
                                className="font-medium tracking-wide"
                            >
                                Description
                            </label>{' '}
                            <p>{roomBioLength ?? 70 - currentUser?.story?.length}</p>{' '}
                        </div>
                        <textarea
                            maxLength={70}
                            onChange={(r) => {
                                if (r.target.value.length <= 70) {
                                    roomInfo.current.story = r.target.value;
                                    setRoomBioLength(
                                        70 - roomInfo.current.story.length
                                    );
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
