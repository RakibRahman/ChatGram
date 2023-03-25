import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ProfileCard } from '../common/ProfileCard/ProfileCard';
import { useTopCardDetails } from './useTopCardDetails';
import { Link, useNavigate } from 'react-router-dom';
import { TopMenuList } from './TopMenuList';
import { Alert } from '../common/Alert';
import { ArrowLeft } from 'react-feather';

export const DetailsTopCard = () => {
    const { userInfo, getSingleUserInfo, chatRoomInfo, userInfoLoading, userInfoError } =
        useTopCardDetails();

    const isTab = useMediaQuery('(max-width: 768px)');
    const navigate = useNavigate();
    const profileId = getSingleUserInfo('uid') ?? '';
    const menuListData = {
        chatRoomId: chatRoomInfo?.id,
        type: chatRoomInfo?.type,
        profileId: profileId ? profileId : null,
    };

    if (userInfoLoading) {
        return <></>;
    }
    if (userInfoError) {
        return <Alert title="Error loading user info" />;
    }

    if (chatRoomInfo?.type === 'single') {
        return (
            <>
                <div className=" navbar pt-2 bg-base-100 border-b-2">
                    <div className="flex-1">
                        <div className={` w-full ${isTab ? 'flex gap-2 items-center' : 'block'} `}>
                            {isTab ? (
                                <button
                                    className="btn p-0 bg-transparent border-none"
                                    onClick={() => {
                                        navigate('/');
                                    }}
                                >
                                    <ArrowLeft className="text-base-content" />
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
                                    name={getSingleUserInfo('name')!}
                                    pic={getSingleUserInfo('photoURL')!}
                                    isOnline={userInfo?.data()?.['status']}
                                    // lastActive={getUserInfo('lastLogin')}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="flex-none">
                        <TopMenuList menuData={menuListData} />
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="navbar bg-base-100 border-b-2">
                <div className="flex-1">
                    <div className={`w-full ${isTab ? 'flex gap-2 items-center' : 'block'}`}>
                        {isTab ? (
                            <button
                                className="btn p-0 bg-transparent border-none"
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                <ArrowLeft className="text-base-content" />
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
                                <p className="font-bold capitalize">{chatRoomInfo?.name}</p>
                                <p>{chatRoomInfo?.members?.length} members</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="flex-none">
                    <TopMenuList menuData={menuListData} />
                </div>
            </div>
        </>
    );
};
