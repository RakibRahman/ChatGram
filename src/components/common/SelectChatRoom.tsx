import { Alert } from './Alert';
export const SelectChatRoom = () => {
    return (
        <div className={`w-full h-screen overflow-hidden grid place-items-center pl-2`}>
            <Alert type="info" title="Select a chat room to start messaging " />
        </div>
    );
};
