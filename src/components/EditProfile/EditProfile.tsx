import React, { useState } from 'react';
import { Avatar } from '../common/Avatar/Avatar';
import { Modal } from '../common/modal/Modal';
import { useEditProfile } from './useEditProfile';

export const EditProfile = () => {
    const { currentUser } = useEditProfile();
    const [isEditOpen, setEditOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    return (
        <div className=" space-y-1 my-10 px-4 w-full">
            <Avatar name={currentUser?.displayName!} img={currentUser?.photoURL!} />
            <div className="flex justify-between items-center w-full ">
                {' '}
                <h2 className="text-md font-medium">{currentUser?.displayName}</h2>
                <p
                    className="cursor-pointer text-md font-semibold text-sky-500"
                    onClick={() => {
                        setEditOpen(true);
                    }}
                ></p>
            </div>

            <Modal
                isOpen={isEditOpen}
                onClose={() => setEditOpen(false)}
                title="Edit Profile"
                yesText="Save Changes"
                onConfirm={() => {}}
            >
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Full Name"
                        className="input input-md w-full max-w-xs border border-blue-300 focus:outline-none"
                    />
                    <label htmlFor="status">Status</label>
                    <input
                        id="status"
                        type="text"
                        placeholder="Status"
                        className="input input-md w-full max-w-xs border border-blue-300 focus:outline-none"
                    />
                    <label htmlFor="profilePic">Profile Pic</label>
                    <input
                        id="profilePic"
                        type="text"
                        placeholder="Profile Pic URL"
                        className="input input-md w-full max-w-xs border border-blue-300 focus:outline-none"
                    />
                </div>
            </Modal>
        </div>
    );
};
