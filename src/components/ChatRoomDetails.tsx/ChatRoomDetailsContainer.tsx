import { DetailsTopCard } from './DetailsTopCard';
import { GroupMessages } from './GroupMessages';
import { SentMessage } from './SentMessage';

export const ChatRoomDetailsContainer = () => {
    return (
        <div className="grow ">
            {/* <ChatRoomDetails /> */}
            <DetailsTopCard />
            <div className="h-[32rem] overflow-hidden overflow-y-scroll">
                {' www'}
                <GroupMessages />
            </div>
            <SentMessage />
        </div>
    );
};
