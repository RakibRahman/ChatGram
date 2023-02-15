import { DetailsTopCard } from './DetailsTopCard';
import { GroupMessages } from './GroupMessages';
import { SentMessage } from './SentMessage';

export const ChatRoomDetailsContainer = () => {
    return (
        <div className="flex-grow flex flex-col  h-4/5  justify-between">
            {/* <ChatRoomDetails /> */}
            <div>
                <DetailsTopCard />
                <div className="divider"></div>
                <div
                    className=" overflow-hidden overflow-y-scroll pr-4 flex-grow h-5/6"
                    id="messageContainer"
                >
                    <GroupMessages />
                </div>
            </div>
            <SentMessage />
        </div>
    );
};
