import { useNavigate } from 'react-router-dom';
import { getTime, getLastActivity } from '../../utilities/getTime';
import { ChatRoomMedia } from '../ChatRoomMedia/ChatRoomMedia';
import { Alert } from '../common/Alert';
import { Loader } from '../common/Loader/Loader';
import { SocialLinks } from './SocialLinks';
import { useUserProfile } from './useUserProfile';

export const UserProfile = () => {
    const { userInfo, loading, error, photos, videos, errorMessage } = useUserProfile();
    const navigate = useNavigate();
    if (loading) {
        return (
            <div className="mt-10">
                <Loader />
            </div>
        );
    }

    if (error) {
        return <Alert title="Failed to load User Profile" />;
    }
    const createDate = getTime(userInfo?.createdAt?.seconds, true);

    return (
        <>
            <div className="bg-base-200 text-base relative">
                <button
                    className="btn btn-square hover:bg-transparent hover:-translate-x-1 p-0 bg-transparent border-none absolute -top-2 right-1"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-base-content"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                        />
                    </svg>
                </button>
                <div className="flex max-h-52">
                    <div className="w-1/4">
                        <img
                            src={
                                userInfo?.photoURL! ??
                                'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
                            }
                            className="w-52 h-full object-cover"
                        />
                    </div>

                    <div className="max-w-full">
                        <div>
                            {' '}
                            <h1 className="text-5xl font-bold capitalize">{userInfo?.name}</h1>
                            {userInfo?.story ? (
                                <h3 className="font-medium mb-2"> {userInfo.story}</h3>
                            ) : null}
                        </div>
                        <p>Email: {userInfo?.email}</p>
                        {createDate ? <p>Joined At: {createDate}</p> : null}

                        <p className="mb-2">
                            Last Activity: {getLastActivity(userInfo?.lastLogin)}
                        </p>
                        <SocialLinks socialLinks={userInfo?.socialLinks} />
                    </div>
                    <div></div>
                </div>
            </div>
            {errorMessage ? (
                <Alert title="An error has occurred while fetching media files" type="error" />
            ) : null}
            <div className="bg-base-200 mt-10">
                {' '}
                <ChatRoomMedia photos={photos!} videos={videos!} />
            </div>
        </>
    );
};
