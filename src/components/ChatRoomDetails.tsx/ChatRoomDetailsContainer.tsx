import { SentMessage } from '../SentMessage/SentMessage';
import { DetailsTopCard } from '../TopDetailsCard/DetailsTopCard';
import { Messages } from './Messages';

export const ChatRoomDetailsContainer = () => {

    return (
        <div className="border-l-2 pl-1 h-screen">
            <DetailsTopCard />
            <div className="h-[80%] overflow-hidden">
                <Messages />
            </div>

            <div className="justify-end">
                {' '}
                <SentMessage />
            </div>
        </div>
    );
};
