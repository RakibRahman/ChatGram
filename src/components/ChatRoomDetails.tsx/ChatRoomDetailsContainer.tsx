import { DetailsTopCard } from './DetailsTopCard';
import { GroupMessages } from './GroupMessages';

export const ChatRoomDetailsContainer = () => {
    return (
        <div className="flex-grow ">
            <DetailsTopCard />
            <div className="divider"></div>
            <GroupMessages />
        </div>
    );
};
