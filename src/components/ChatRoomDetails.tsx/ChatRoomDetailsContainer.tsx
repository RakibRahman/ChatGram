import { DetailsTopCard } from './DetailsTopCard';
import { GroupMessages } from './GroupMessages';
import { SentMessage } from './SentMessage';

export const ChatRoomDetailsContainer = () => {
    return (
        <div className="flex-grow">
            {/* flex flex-col  h-screen   justify-between */}
            {/* <ChatRoomDetails /> */}
            <div>
                <DetailsTopCard />
                <div className="divider"></div>

                <GroupMessages />

                <div>
                    {' '}
                    {/* <SentMessage /> */}
                </div>
            </div>
        </div>
    );
};
