import { SentMessage } from '../SentMessage/SentMessage';
import { DetailsTopCard } from '../TopDetailsCard/DetailsTopCard';
import { Messages } from './Messages';

export const ChatRoomDetailsContainer = () => {
    return (
        <div className="h-screen overflow-hidden">
            <DetailsTopCard />
            <div className="h-[80%] overflow-hidden p-1">
                <Messages />
            </div>

            <div className="justify-end">
                {' '}
                <SentMessage />
            </div>
        </div>
    );
};
