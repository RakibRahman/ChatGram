import { UserInfo } from '../../models/types';

import { useRef, useState } from 'react';
import { Alert } from '../common/Alert';
import { Avatar } from '../common/Avatar/Avatar';
import { Modal } from '../common/modal/Modal';
import useFireBaseUpload from '../FileUpload/useFirebaseUpload';
import { useEditProfile } from './useEditProfile';

export const EditProfile = () => {
    const { currentUser, loading, error, updateUser } = useEditProfile()!;
    const [isEditOpen, setEditOpen] = useState(false);
    const [userLoading, setUserLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File>();

    const { handleUpload, discardUpload } = useFireBaseUpload();

    const userInfo = useRef({} as UserInfo);
    const [userStoryLength, setUserStoryLength] = useState<number>(currentUser?.story?.length);

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
                size="w-[380px]"
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
                <>
                    <form className="">
                        <div className="flex flex-col justify-center  items-stretch">
                            <div className="relative self-center">
                                <label
                                    className="absolute bottom-0 right-0 text-white w-10 h-10 grid place-items-center rounded-full bg-sky-500 text-center"
                                    htmlFor="photoURL"
                                >
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
                                            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                                        />
                                    </svg>
                                </label>
                                <img
                                    src={
                                        selectedFile
                                            ? URL.createObjectURL(selectedFile)
                                            : currentUser?.photoURL
                                    }
                                    alt="profilePic"
                                    className="w-40 h-40 rounded-full object-cover"
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

                            <div className="space-y-4">
                                <div className="">
                                    <label htmlFor="name" className="font-medium tracking-wide">
                                        Name
                                    </label>
                                    <input
                                        defaultValue={currentUser?.name}
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Full Name"
                                        className="input input-sm w-full max-w-full border border-blue-300 focus:outline-none"
                                        onChange={(r) => {
                                            userInfo.current.name = r.target.value;
                                        }}
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between">
                                        {' '}
                                        <label
                                            htmlFor="status"
                                            className="font-medium tracking-wide"
                                        >
                                            Bio
                                        </label>{' '}
                                        <p>{userStoryLength ?? 70 - currentUser?.story?.length}</p>{' '}
                                    </div>
                                    <textarea
                                        maxLength={70}
                                        onChange={(r) => {
                                            if (r.target.value.length <= 70) {
                                                userInfo.current.story = r.target.value;
                                                setUserStoryLength(
                                                    70 - userInfo.current.story.length
                                                );
                                            }
                                        }}
                                        id="story"
                                        placeholder="Bio"
                                        defaultValue={currentUser?.story ?? ''}
                                        name="story"
                                        className="textarea textarea-bordered textarea-md w-full max-w-full"
                                    />
                                    <p className="text-sm px-4 py-2  bg-gray-300 font-light">
                                        Any details such as age,occupation or city. <br />
                                        Example: Front-end Developer from Dhaka
                                    </p>
                                </div>
                                <div className="">
                                    <label htmlFor="phone" className="font-medium tracking-wide">
                                        Phone Number
                                    </label>
                                    <input
                                        defaultValue={currentUser?.phone ?? ''}
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        pattern="[0-9]+"
                                        placeholder="Phone Number"
                                        className="input input-sm w-full max-w-full border border-blue-300 focus:outline-none"
                                        onChange={(r) => {
                                            userInfo.current.phone = r.target.value;
                                        }}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="fb" className="font-medium tracking-wide">
                                        Facebook Profile
                                    </label>
                                    <input
                                        defaultValue={currentUser?.socialLinks?.fb ?? ''}
                                        id="fb"
                                        name="fb"
                                        type="text"
                                        placeholder="Facebook Profile"
                                        className="input input-sm w-full max-w-full border border-blue-300 focus:outline-none"
                                        onChange={(r) => {
                                            userInfo.current['socialLinks']!.fb = r.target.value;
                                        }}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="linkedin" className="font-medium tracking-wide">
                                        LinkedIn Profile
                                    </label>
                                    <input
                                        defaultValue={currentUser?.socialLinks?.linkedin ?? ''}
                                        id="linkedin"
                                        name="linkedin"
                                        type="text"
                                        placeholder="LinkedIn Profile"
                                        className="input input-sm w-full max-w-full border border-blue-300 focus:outline-none"
                                        onChange={(r) => {
                                            userInfo.current['socialLinks']!.linkedin =
                                                r.target.value;
                                        }}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="name" className="font-medium tracking-wide">
                                        Twitter Profile
                                    </label>
                                    <input
                                        defaultValue={currentUser?.socialLinks?.twitter ?? ''}
                                        id="twitter"
                                        name="twitter"
                                        type="text"
                                        placeholder="Twitter profile"
                                        className="input input-sm w-full max-w-full border border-blue-300 focus:outline-none"
                                        onChange={(r) => {
                                            userInfo.current.socialLinks!.twitter = r.target.value;
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </>
            </Modal>
        </div>
    );
};
