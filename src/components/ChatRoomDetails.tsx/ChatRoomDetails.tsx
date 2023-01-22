import { getTime } from '../../utilities/getTime';
import { Loader } from '../Loader/Loader';
import { useChatRoomDetails } from './useChatRoomDetails';
export const ChatRoomDetails = () => {
    const { chatRoomInfo, loading, error } = useChatRoomDetails();

    if (loading) {
        return <Loader />;
    }

    if (!chatRoomInfo && !loading) {
        return <h1>No such chat room exists</h1>;
    }
    const createDate = getTime(chatRoomInfo?.createdAt?.seconds, true);

    if (error) {
        return <p>Failed to load chat </p>;
    }

    return (
        <div className="h-60 bg-red-500">
            <div
                className="hero"
                style={{ backgroundImage: `url(${chatRoomInfo?.logo!})` }}
            >
                <div className="hero-overlay bg-opacity-60  py-10"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">
                            {chatRoomInfo?.name}
                        </h1>

                        <p>Created At: {createDate}</p>
                        <p>
                            Created By: {chatRoomInfo?.createdBy?.displayName}
                        </p>
                        <p>Created By: {chatRoomInfo?.createdBy?.email}</p>

                        <p>Members: {chatRoomInfo?.members.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
