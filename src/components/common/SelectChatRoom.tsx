import { Alert } from './Alert';
export const SelectChatRoom = () => {
    return (
        <div className={`w-full px-2 h-[100vh]   flex flex-col   justify-center `}>
            <Alert type="info" title="Select a chat room to start messaging " size="42" />
        </div>
    );
};
