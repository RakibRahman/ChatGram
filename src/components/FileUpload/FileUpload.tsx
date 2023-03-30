import { useState } from 'react';
import { Paperclip } from 'react-feather';
import { ModalV2 } from '../common/modal/ModalV2';
import { ProgressBar } from '../common/ProgressBar/ProgressBar';
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

    const getFileType = (): string => {
        if (selectedFile === undefined) {
            return 'Send File';
        }

        const { type } = selectedFile;
        const fileType = type.replace(/[^/]*$/, '').replace(/[/]/, '');

        if (fileType === 'image') {
            return 'Send an image';
        }
        if (fileType === 'video') {
            return 'Send a video file';
        }
        return 'Send File';
    };

    return (
        <>
            <label htmlFor="fileUpload" className="btn btn-square btn-md">
                <Paperclip />
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

            <ModalV2
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    setSelectedFile(undefined);
                    if (state.uploading) {
                        cancelUpload();
                    }
                }}
                title={getFileType()}
                yesText={uploading ? 'Sending...' : 'Send'}
                onConfirm={() => {
                    if (selectedFile) {
                        handleUpload(selectedFile);
                    }
                    setMessage('');
                }}
            >
                <div className="p-2">
                    <p className="break-words text-sm mb-1"> {selectedFile?.name}</p>

                    {selectedFile && allowedImgExtensions.exec(selectedFile?.name) ? (
                        <ImagePreview
                            src={URL.createObjectURL(selectedFile)}
                            height="400px"
                            width="100%"
                        />
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
                        className="input input-bordered focus:outline-none  w-full input-md my-2 "
                    />
                    {uploading ? <ProgressBar value={state.progress} /> : null}
                </div>
            </ModalV2>
        </>
    );
};
