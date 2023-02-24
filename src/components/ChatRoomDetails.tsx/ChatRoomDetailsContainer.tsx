import { DetailsTopCard } from '../TopDetailsCard/DetailsTopCard';
import { Messages } from './Messages';

export const ChatRoomDetailsContainer = () => {
    return (
        <div className="flex-grow ">
            <DetailsTopCard />
            <div className="divider"></div>
            <Messages />
        </div>
    );
};
