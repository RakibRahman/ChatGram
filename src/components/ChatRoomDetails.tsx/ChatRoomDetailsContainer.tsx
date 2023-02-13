import { DetailsTopCard } from './DetailsTopCard';
import { GroupMessages } from './GroupMessages';
import { SentMessage } from './SentMessage';

export const ChatRoomDetailsContainer = () => {
    return (
        <div className="flex-grow">
            {/* <ChatRoomDetails /> */}
            <DetailsTopCard />
            <div className="divider"></div>
            <div className="h-[75vh] overflow-hidden overflow-y-scroll pr-4" id="messageContainer">
                <GroupMessages />
            </div>
            <SentMessage />
        </div>
    );
};
