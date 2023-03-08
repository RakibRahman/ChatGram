import { UserInfo } from '../../models/types';

import React, { useState, useRef } from 'react';
import { Alert } from '../common/Alert';
import { Avatar } from '../common/Avatar/Avatar';
import { Modal } from '../common/modal/Modal';
import { useEditProfile } from './useEditProfile';

export const EditProfile = () => {
    const { currentUser, loading, error, updateUser } = useEditProfile()!;
    const [isEditOpen, setEditOpen] = useState(false);
    const [userLoading, setUserLoading] = useState(false);

    const userInfo = useRef({} as UserInfo);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <Alert title="Profile fetch error" />;
    }

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
                disableYesBtn={userLoading}
                isOpen={isEditOpen}
                onClose={() => setEditOpen(false)}
                title="Edit Profile"
                yesText={userLoading ? 'Saving...' : 'Save Changes'}
                onConfirm={() => {
                    setUserLoading(true);
                    updateUser(userInfo.current)
                        .then(() => {
                            console.log('user updated successfully');
                            // localStorage.setItem('currentUser', JSON.stringify(userInfo.current))
                        })
                        .catch(() => {
                            console.log('something went wrong');
                        })
                        .finally(() => {
                            setUserLoading(false);
                            setEditOpen(false);
                        });
                }}
            >
                <div className="form-control">
                    <form className="form-control">
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
                        <label htmlFor="status">Status</label>
                        <input
                            onChange={(r) => {
                                userInfo.current.story = r.target.value;
                            }}
                            id="story"
                            type="text"
                            placeholder="Status"
                            defaultValue={currentUser?.story ?? ''}
                            name="story"
                            className="input input-md w-full max-w-xs border border-blue-300 focus:outline-none"
                        />
                        <label htmlFor="photoURL">Profile Pic</label>
                        <input
                            defaultValue={currentUser?.photoURL ?? ''}
                            onChange={(r) => {
                                userInfo.current.photoURL = r.target.value;
                            }}
                            name="photoURL"
                            id="photoURL"
                            type="text"
                            placeholder="Profile Pic URL"
                            className="input input-md w-full max-w-xs border border-blue-300 focus:outline-none"
                        />
                    </form>
                </div>
            </Modal>
        </div>
    );
};
