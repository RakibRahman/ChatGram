import { ProfileCard } from '../common/ProfileCard/ProfileCard';
import { useTopCardDetails } from './useTopCardDetails';

export const DetailsTopCard = () => {
    const { userInfo, getUserInfo, chatRoomInfo } = useTopCardDetails();

    if (chatRoomInfo?.type === 'single') {
        return (
            <div>
                <ProfileCard
                    name={getUserInfo('name')}
                    pic={getUserInfo('photoURL')}
                    isOnline={userInfo?.data()?.['status']}
                    // lastActive={getUserInfo('lastLogin')}
                />
            </div>
        );
    }

    return (
        <div className="h-8 w-full">
            <div className="flex flex-col gap-2">
                <p className="font-bold">{chatRoomInfo?.name}</p>
                <p>{chatRoomInfo?.members?.length} members</p>
            </div>
        </div>
    );
};
