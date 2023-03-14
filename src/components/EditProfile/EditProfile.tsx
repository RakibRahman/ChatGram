import { UserInfo } from '../../models/types';
import { Camera } from 'react-feather';
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
    const maxBioLength = 70;
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
                        handleUpload(selectedFile, 'user');
                    }
                }}
            >
                <>
                    <form className="">
                        <div className="flex flex-col justify-center  items-stretch">
                            <div className="relative self-center">
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
                                        <p>
                                            {userStoryLength ??
                                                maxBioLength - currentUser?.story?.length}
                                        </p>{' '}
                                    </div>
                                    <textarea
                                        maxLength={maxBioLength}
                                        onChange={(r) => {
                                            if (r.target.value.length <= maxBioLength) {
                                                userInfo.current.story = r.target.value;
                                                setUserStoryLength(
                                                    maxBioLength - userInfo.current.story.length
                                                );
                                            }
                                        }}
                                        id="story"
                                        placeholder="Bio"
                                        defaultValue={currentUser?.story ?? ''}
                                        name="story"
                                        className="textarea textarea-bordered textarea-md w-full max-w-full"
                                    />
                                    <p className="text-sm px-4 py-2  bg-gray-300 font-light text-black">
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
