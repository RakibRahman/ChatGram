import { SentMessage } from '../SentMessage/SentMessage';
import { DetailsTopCard } from '../TopDetailsCard/DetailsTopCard';
import { Alert } from '../common/Alert';
import { Loader } from '../common/Loader/Loader';
import { Messages } from './Messages';
import { useChatRoomDetails } from './useChatRoomDetails';

const ChatRoomDetailsContainer = () => {
    const { loading, chatRoomInfo } = useChatRoomDetails();

    if (!chatRoomInfo && !loading) {
        return (
            <div className={`w-full px-2 h-[100vh]   flex flex-col   justify-center `}>
                <Alert type="error" title="No such chat  exists, select another chat" />
            </div>
        );
    }

    return (
        <div className="h-full  overflow-hidden flex flex-col justify-between">
            {loading ? (
                <div className="mt-20">
                    <Loader />
                </div>
            ) : null}
            <DetailsTopCard />
            <div className="h-[82dvh]  p-1">
                <Messages />
            </div>

            <div className="">{chatRoomInfo ? <SentMessage /> : null}</div>
        </div>
    );
};
export default ChatRoomDetailsContainer;