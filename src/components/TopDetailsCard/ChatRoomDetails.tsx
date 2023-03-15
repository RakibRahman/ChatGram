import { useState } from 'react';
import { ArrowLeft, Edit, Users } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { getTime } from '../../utilities/getTime';
import { useChatRoomDetails } from '../ChatRoomDetails/useChatRoomDetails';
import { ChatRoomMedia } from '../ChatRoomMedia/ChatRoomMedia';
import { Alert } from '../common/Alert';
import { Loader } from '../common/Loader/Loader';
import { CreateChatRoom } from '../CreateChatRoom/CreateChatRoom';
import { useUserProfile } from '../UserProfile/useUserProfile';

export const ChatRoomDetails = () => {
    const { chatRoomInfo, loading, error, userListHashMap, currentUser } = useChatRoomDetails();
    const [isOpenModal, setIsOpenModal] = useState(false);
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
    const chatRoomBg = chatRoomInfo.logo
        ? `url(${chatRoomInfo.logo})`
        : `url("https://firebasestorage.googleapis.com/v0/b/my-chat-87035.appspot.com/o/general%2Froom-bg%2Favenue-g62d8c4fce_1920.jpg?alt=media&token=e7993410-c9d9-494d-952b-a716b6bca238")`;

    return (
        <div className="bg-base-300 relative">
            <div className="hero relative" style={{ backgroundImage: chatRoomBg }}>
                <button
                    className="btn btn-square hover:bg-transparent hover:-translate-x-1 p-0 bg-transparent border-none absolute top-2 left-0"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <ArrowLeft className="text-base" />
                </button>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-5xl font-bold capitalize tracking-wide">
                            {chatRoomInfo?.name}
                        </h1>
                        <div className="flex  justify-center items-center gap-2 mb-1 font-semibold">
                            {' '}
                            <Users /> {chatRoomInfo?.members.length}{' '}
                            {chatRoomInfo?.members.length === 1 ? 'Member' : 'Members'}
                        </div>
                        <p className="mb-2">Created At: {createDate}</p>
                        <p className="mb-5">
                            Room Creator: {userListHashMap?.[chatRoomInfo?.createdBy]?.name ?? ''}
                        </p>
                        <p className="mb-5 text-lg">{chatRoomInfo?.story}</p>

                        <button
                            className="btn btn-accent text-white bg-sky-500 shadow-md shadow-sky-500"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            Share your thoughts
                        </button>
                        {chatRoomInfo?.admins.includes(currentUser.uid) ? (
                            <button
                                className="btn btn-square btn-sm absolute right-1 top-1 hover:opacity-60"
                                onClick={() => {
                                    setIsOpenModal(true);
                                }}
                            >
                                <Edit />
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
            <ChatRoomMedia photos={photos!} videos={videos!} />
            <CreateChatRoom
                isOpen={isOpenModal}
                isEditMode
                onClose={() => {
                    setIsOpenModal(false);
                }}
                chatRoomInfo={chatRoomInfo}
            />
        </div>
    );
};
