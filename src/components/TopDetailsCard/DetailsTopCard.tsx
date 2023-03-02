import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ProfileCard } from '../common/ProfileCard/ProfileCard';
import { useTopCardDetails } from './useTopCardDetails';
import { Link, useNavigate } from 'react-router-dom';
import { TopMenuList } from './TopMenuList';

export const DetailsTopCard = () => {
    const { userInfo, getUserInfo, chatRoomInfo, currentUser, userInfoLoading } =
        useTopCardDetails();

    const isTab = useMediaQuery('(max-width: 768px)');
    const navigate = useNavigate();
    const profileId =
        chatRoomInfo?.['members'][0] !== currentUser?.uid
            ? chatRoomInfo?.userOne?.id
            : chatRoomInfo?.userTwo?.id;
    const menuListData = {
        chatRoomId: chatRoomInfo?.id,
        type: chatRoomInfo?.type,
        profileId: profileId ? profileId : null,
    };

    if (userInfoLoading) {
        return <></>;
    }

    if (chatRoomInfo?.type === 'single') {
        return (
            <div className="flex justify-between bg-base-300 p-1 border-b-2">
                <div className={` w-full ${isTab ? 'flex gap-2 items-center' : 'block'} `}>
                    {isTab ? (
                        <button
                            className="btn p-0 bg-transparent border-none"
                            onClick={() => {
                                navigate('/');
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
                    <Link
                        to={`${
                            menuListData.type === 'room'
                                ? `/chatRoom/${menuListData.chatRoomId}`
                                : `/profile/${menuListData.profileId}`
                        }`}
                    >
                        <ProfileCard
                            name={getUserInfo('name')}
                            pic={getUserInfo('photoURL')}
                            isOnline={userInfo?.data()?.['status']}
                            // lastActive={getUserInfo('lastLogin')}
                        />
                    </Link>
                </div>

                <TopMenuList menuData={menuListData} />
            </div>
        );
    }

    return (
        <div className="flex justify-between bg-base-300 p-1 border-b-2">
            <div className={`w-full ${isTab ? 'flex gap-2 items-center' : 'block'}`}>
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

                <Link
                    to={`${
                        menuListData.type === 'room'
                            ? `/chatRoom/${menuListData.chatRoomId}`
                            : `/profile/${menuListData.profileId}`
                    }`}
                >
                    <div className="flex flex-col gap-2">
                        <p className="font-bold">{chatRoomInfo?.name}</p>
                        <p>{chatRoomInfo?.members?.length} members</p>
                    </div>
                </Link>
            </div>
            <TopMenuList menuData={menuListData} />
        </div>
    );
};
