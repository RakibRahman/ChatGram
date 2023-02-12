import { useAvatar } from './Avatar/useAvatar';
export const SelectChatRoom = () => {
    const { gradient } = useAvatar('');

    return (
        <div className={`border w-full h-full grid place-items-center bg-gradient-to-r `}>
            <p className="text-2xl">Select a chat room to start messaging!!!</p>
        </div>
    );
};