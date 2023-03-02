import { useRef } from 'react';
import { useScrollIntoView } from '../../hooks/useScrollIntoView';
import { Alert } from '../common/Alert';
import { Loader } from '../common/Loader/Loader';
import { NoMessage } from './NoMessage';
import { RightClickMenu } from './RightClickMenu';

import { useChatRoomDetails } from './useChatRoomDetails';

export const Messages = () => {
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const { messageData, isValidUser, chatRoomInfo, currentUser } = useChatRoomDetails();

    useScrollIntoView(messageContainerRef, messageData?.groupMessages);

    if (!chatRoomInfo) {
        return null;
    }

    if (!isValidUser) {
        return <Alert title="  You are not a member of this group." />;
    }

    return (
        <>
            <div className=" h-full  overflow-y-scroll overflow-x-hidden " id="messageContainer">
                <div ref={messageContainerRef}>
                    {messageData?.loadingMessage ? (
                        <div className="grid place-items-center mt-20">
                            <Loader />
                        </div>
                    ) : null}
                    {messageData?.groupMessages?.length === 0 ? <NoMessage /> : null}
                    <RightClickMenu />
                </div>
            </div>
        </>
    );
};
