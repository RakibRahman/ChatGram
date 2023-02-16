import { DetailsTopCard } from './DetailsTopCard';
import { GroupMessages } from './GroupMessages';
import { SentMessage } from './SentMessage';

export const ChatRoomDetailsContainer = () => {
    return (
        <div className="flex-grow flex flex-col  h-screen   justify-between">
            {/* <ChatRoomDetails /> */}
            <div>
                <DetailsTopCard />
                <div className="divider"></div>
                <div
                    className=" overflow-hidden overflow-y-scroll pr-4 flex-grow-0 h-[75vh]"
                    id="messageContainer"
                >
                    <GroupMessages />
                </div>
                <div>
                    {' '}
                    <SentMessage />
                </div>
            </div>
        </div>
    );
};
