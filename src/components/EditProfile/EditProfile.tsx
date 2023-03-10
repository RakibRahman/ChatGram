import { UserInfo } from '../../models/types';

import React, { useState, useRef } from 'react';
import { Alert } from '../common/Alert';
import { Avatar } from '../common/Avatar/Avatar';
import { Modal } from '../common/modal/Modal';
import { useEditProfile } from './useEditProfile';
import useFireBaseUpload from '../FileUpload/useFirebaseUpload';

export const EditProfile = () => {
    const { currentUser, loading, error, updateUser } = useEditProfile()!;
    const [isEditOpen, setEditOpen] = useState(false);
    const [userLoading, setUserLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File>();

    const { handleUpload, state, dispatch, cancelUpload, discardUpload } = useFireBaseUpload();

    const { progress, uploading, downloadURL, file } = state;

    const userInfo = useRef({} as UserInfo);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <Alert title="Profile fetch error" />;
    }

    console.log(currentUser);
    return (
        <div className=" space-y-1 my-10 px-4 w-full">
            <Avatar name={currentUser?.name!} img={currentUser?.photoURL!} />
            <div className="flex justify-between items-center w-full ">
                {' '}
                <h2 className="text-md font-medium">{currentUser?.name}</h2>
                <p
                    className="cursor-pointer text-md font-semibold text-sky-500"
                    onClick={() => {
                        setEditOpen(true);
                    }}
                >
                    Edit
                </p>
            </div>

            <Modal
                size="w-[420px]"
                disableYesBtn={userLoading}
                isOpen={isEditOpen}
                onClose={() => {
                    setEditOpen(false);
                    setSelectedFile(undefined);
                }}
                title="Edit Profile"
                yesText={userLoading ? 'Saving...' : 'Save Changes'}
                onConfirm={() => {
                    setUserLoading(true);
                    updateUser(userInfo.current)
                        .then(() => {
                            console.log('user updated successfully');
                            if (currentUser?.photoURLPath && selectedFile) {
                                discardUpload(currentUser?.photoURLPath);
                            }
                            localStorage.setItem('currentUser', JSON.stringify(currentUser));
                        })
                        .catch(() => {
                            console.log('something went wrong');
                        })
                        .finally(() => {
                            setUserLoading(false);
                            setEditOpen(false);
                            setSelectedFile(undefined);
                        });
                    if (selectedFile) {
                        handleUpload(selectedFile, true);
                    }
                }}
            >
                <div className="">
                    <form className="form-control">
                        <div className="flex justify-between items-center">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        defaultValue={currentUser?.name}
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Full Name"
                                        className="input input-md w-full max-w-xs border border-blue-300 focus:outline-none"
                                        onChange={(r) => {
                                            userInfo.current.name = r.target.value;
                                        }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="status">Status</label>
                                    <textarea
                                        onChange={(r) => {
                                            userInfo.current.story = r.target.value;
                                        }}
                                        id="story"
                                        placeholder="Status"
                                        defaultValue={currentUser?.story ?? ''}
                                        name="story"
                                        className="textarea textarea-bordered textarea-md w-full max-w-xs"
                                    />
                                </div>
                            </div>
                            <div className="relative border">
                                <label
                                    className="absolute bottom-0 text-white bg-black w-full text-center"
                                    htmlFor="photoURL"
                                >
                                    Change Photo
                                </label>
                                <img
                                    src={
                                        selectedFile
                                            ? URL.createObjectURL(selectedFile)
                                            : currentUser?.photoURL
                                    }
                                    alt="profilePic"
                                    className="max-w-full h-32 object-cover rounded-lg"
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
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};
