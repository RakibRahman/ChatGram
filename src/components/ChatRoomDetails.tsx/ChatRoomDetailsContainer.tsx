import { DetailsTopCard } from './DetailsTopCard';
import { GroupMessages } from './GroupMessages';
import { SentMessage } from './SentMessage';

export const ChatRoomDetailsContainer = () => {
    return (
        <div className="grow ">
            {/* <ChatRoomDetails /> */}
            <DetailsTopCard />
            <div className="divider"></div>
            <div className="h-[30rem] overflow-hidden overflow-y-scroll" id="messageContainer">
                <GroupMessages />
            </div>
            <SentMessage />
        </div>
    );
};
