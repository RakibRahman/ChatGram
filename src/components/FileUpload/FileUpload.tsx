import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSentMessage } from '../SentMessage/useSentMessage';
import { Modal } from '../common/modal/Modal';
import { ImagePreview } from '../FilePreview/ImagePreview';
import VideoPreview from '../FilePreview/VideoPreview';
import useFireBaseUpload from './useFirebaseUpload';

export const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [message, setMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const { handleUpload, state, dispatch, cancelUpload, discardUpload } = useFireBaseUpload(
        setIsOpen,
        message
    );

    const allowedImgExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    const allowedVidExtensions = /(\.mp4|\.webm)$/i;

    const { progress, uploading, downloadURL, file } = state;

    console.log(selectedFile);
    return (
        <>
            <label htmlFor="fileUpload" className="btn btn-square btn-md">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                    />
                </svg>
            </label>
            <input
                type="file"
                className="invisible w-0"
                id="fileUpload"
                accept="image/*,video/mp4,video/webm"
                onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : undefined;
                    setSelectedFile(file);
                    if (file) {
                        setIsOpen(true);
                    }
                }}
            />

            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    setSelectedFile(undefined);
                }}
                title="Send File"
                yesText={uploading ? 'Sending...' : 'Send'}
                onConfirm={() => {
                    if (selectedFile) {
                        handleUpload(selectedFile);
                    }
                }}
            >
                <div className="p-2 overflow-hidden">
                    <p className="break-words text-sm mb-1"> {selectedFile?.name}</p>

                    {selectedFile && allowedImgExtensions.exec(selectedFile?.name) ? (
                        <ImagePreview src={URL.createObjectURL(selectedFile)} height="50" />
                    ) : null}

                    {selectedFile && allowedVidExtensions.exec(selectedFile?.name) ? (
                        <VideoPreview videoLink={URL.createObjectURL(selectedFile)} />
                    ) : null}

                    <input
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        type="text"
                        placeholder="Caption here"
                        className="input input-bordered focus:outline-none  w-full input-md my-2"
                    />
                    {uploading ? (
                        <progress
                            className="progress w-full"
                            value={state.progress}
                            max="100"
                        ></progress>
                    ) : null}
                </div>
            </Modal>
        </>
    );
};
