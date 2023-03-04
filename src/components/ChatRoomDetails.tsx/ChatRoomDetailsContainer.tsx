import { SentMessage } from '../SentMessage/SentMessage';
import { DetailsTopCard } from '../TopDetailsCard/DetailsTopCard';
import { Messages } from './Messages';

export const ChatRoomDetailsContainer = () => {
    return (
        <div className="h-full overflow-hidden">
            <DetailsTopCard />
            <div className="h-[80%]  p-1">
                <Messages />
            </div>

            <div className="pb-2">
                <SentMessage />
            </div>
        </div>
    );
};
