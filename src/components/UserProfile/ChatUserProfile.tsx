import { Mail, ArrowLeft, Phone, Activity, LogIn } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { getTime, getLastActivity } from '../../utilities/getTime';
import { ChatRoomMedia } from '../ChatRoomMedia/ChatRoomMedia';
import { Alert } from '../common/Alert';
import { Loader } from '../common/Loader/Loader';
import { SocialLinks } from './SocialLinks';
import { useUserProfile } from './useUserProfile';

export const ChatUserProfile = () => {
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
        <div className="bg-base-300 relative">
            <button
                className="btn btn-square hover:bg-transparent hover:-translate-x-1 p-0 bg-transparent border-none absolute top-2 left-0"
                onClick={() => {
                    navigate(-1);
                }}
            >
                <ArrowLeft />
            </button>

            <div className="bg-base-100 text-base text-center p-5 w-full  flex flex-col items-center">
                <img
                    src={
                        userInfo?.photoURL! ??
                        'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
                    }
                    className="w-40 h-40 rounded-full object-cover border-4 border-violet-400 shadow-sm shadow-sky-500"
                />

                <div>
                    <h1 className="text-5xl font-bold capitalize">{userInfo?.name}</h1>
                    {userInfo?.story ? (
                        <h3 className="font-medium mb-4 mt-2"> {userInfo.story}</h3>
                    ) : null}
                </div>

                <div className="grid sm:grid-cols-4 grid-cols-2 my-6">
                    <div>
                        <div className="flex font-semibold items-center gap-1 justify-center">
                            {' '}
                            <Mail size="18px" />
                            Email
                        </div>
                        <p>{userInfo?.email}</p>
                    </div>

                    <div>
                        <div className="flex font-semibold items-center gap-1 justify-center">
                            {' '}
                            <Phone size="18px" /> Phone
                        </div>
                        <p>{userInfo?.phone ? userInfo.phone : '...'}</p>
                    </div>

                    <div>
                        <div className="flex font-semibold items-center gap-1 justify-center">
                            <Activity size="18px" />
                            Joined At
                        </div>

                        <p className="">{createDate ? <p> {createDate}</p> : '...'}</p>
                    </div>

                    <div>
                        <div className="flex font-semibold items-center gap-1 justify-center">
                            <LogIn size="18px" />
                            Last Activity
                        </div>
                        <p className="">{getLastActivity(userInfo?.lastLogin)}</p>
                    </div>
                </div>

                <SocialLinks socialLinks={userInfo?.socialLinks} />

                <button
                    className="btn btn-accent bg-sky-500 shadow-md shadow-sky-500 mt-6 mb-4"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Send Message
                </button>
            </div>

            <div className="bg-base-100 mt-3">
                {errorMessage ? (
                    <Alert title="An error has occurred while fetching media files" type="error" />
                ) : null}
                <ChatRoomMedia photos={photos!} videos={videos!} />
            </div>
        </div>
    );
};
