import { Loader } from '../common/Loader/Loader';
import { SentMessage } from '../SentMessage/SentMessage';
import { DetailsTopCard } from '../TopDetailsCard/DetailsTopCard';
import { Messages } from './Messages';
import { useChatRoomDetails } from './useChatRoomDetails';

export const ChatRoomDetailsContainer = () => {
    const { loading } = useChatRoomDetails();
    return (
        <div className="h-full  overflow-hidden flex flex-col justify-between">
            {loading ? (
                <div className="mt-20">
                    <Loader />
                </div>
            ) : null}
            <DetailsTopCard />
            <div className="h-[80dvh]  p-1">
                <Messages />
            </div>

            <div className="">
                <SentMessage />
            </div>
        </div>
    );
};
