import { Alert } from './Alert';
export const SelectChatRoom = () => {
    return (
        <div className={`w-full h-full grid place-items-center `}>
            <Alert type="info" title="Select a chat room to start messaging " />
        </div>
    );
};
