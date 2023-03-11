import { SentMessage } from '../SentMessage/SentMessage';
import { DetailsTopCard } from '../TopDetailsCard/DetailsTopCard';
import { Messages } from './Messages';

export const ChatRoomDetailsContainer = () => {
    return (
        <div className="h-full  overflow-hidden flex flex-col ">
            <DetailsTopCard />
            <div className="h-[80vh]  p-1">
                <Messages />
            </div>

            <div className="pb-2 flex-1">
                <SentMessage />
            </div>
        </div>
    );
};
