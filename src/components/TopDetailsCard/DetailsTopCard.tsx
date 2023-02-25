import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ProfileCard } from '../common/ProfileCard/ProfileCard';
import { useTopCardDetails } from './useTopCardDetails';
import { useNavigate } from 'react-router-dom';

export const DetailsTopCard = () => {
    const { userInfo, getUserInfo, chatRoomInfo } = useTopCardDetails();
    const isTab = useMediaQuery('(max-width: 768px)');
    const navigate = useNavigate();

    if (chatRoomInfo?.type === 'single') {
        return (
            <div className="flex justify-between">
                <div
                    className={`p-1 w-full ${
                        isTab ? 'flex gap-2 items-center' : 'block'
                    } border-b-2`}
                >
                    {isTab ? (
                        <button
                            className="btn p-0 bg-transparent border-none"
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
                    ) : null}
                    <ProfileCard
                        name={getUserInfo('name')}
                        pic={getUserInfo('photoURL')}
                        isOnline={userInfo?.data()?.['status']}
                        // lastActive={getUserInfo('lastLogin')}
                    />
                </div>

                <button>
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
                            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                        />
                    </svg>
                </button>
            </div>
        );
    }

    return (
        <div className="flex justify-between">
            <div
                className={`p-1 w-full ${isTab ? 'flex gap-2 items-center' : 'block'}  border-b-2`}
            >
                {isTab ? (
                    <button
                        className="btn p-0 bg-transparent border-none"
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
                ) : null}

                <div className="flex flex-col gap-2">
                    <p className="font-bold">{chatRoomInfo?.name}</p>
                    <p>{chatRoomInfo?.members?.length} members</p>
                </div>
            </div>
            <button>
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
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />
                </svg>
            </button>
        </div>
    );
};
