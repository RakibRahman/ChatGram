import { useNavigate } from 'react-router-dom';
import { getTime } from '../../utilities/getTime';
import { useChatRoomDetails } from '../ChatRoomDetails/useChatRoomDetails';
import { ChatRoomMedia } from '../ChatRoomMedia/ChatRoomMedia';
import { Alert } from '../common/Alert';
import { Loader } from '../common/Loader/Loader';
import { useUserProfile } from '../UserProfile/useUserProfile';
export const ChatRoomDetails = () => {
    const { chatRoomInfo, loading, error } = useChatRoomDetails();
    const { photos, videos } = useUserProfile();
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="mt-20">
                <Loader />
            </div>
        );
    }

    if (!chatRoomInfo && !loading) {
        return <Alert type="error" title="No such chat room exists" />;
    }
    const createDate = getTime(chatRoomInfo?.createdAt?.seconds, true);

    if (error) {
        return <Alert type="error" title="Failed to load chat" />;
    }

    return (
        <div className="h-full overflow-y-scroll pb-2">
            <div
                className="hero relative"
                style={{ backgroundImage: `url(${chatRoomInfo?.logo!})` }}
            >
                <div className="hero-overlay bg-opacity-60  py-10"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <button
                            className="btn p-0 bg-transparent border-none absolute -top-2 left-1"
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
                        <h1 className="mb-5 text-5xl font-bold">{chatRoomInfo?.name}</h1>

                        <p>Created At: {createDate}</p>
                        <p className="capitalize">Creator: {chatRoomInfo?.createdBy?.name}</p>
                        {/* <p>Created By: {chatRoomInfo?.createdBy?.email}</p> */}

                        <p>Members: {chatRoomInfo?.members.length}</p>
                    </div>
                </div>
            </div>
            <ChatRoomMedia photos={photos!} videos={videos!} />
        </div>
    );
};
