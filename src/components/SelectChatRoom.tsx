import { useAvatar } from './common/Avatar/useAvatar';
export const SelectChatRoom = () => {
    const { gradient } = useAvatar('');

    return (
        <div
            className={`border w-full h-full grid place-items-center bg-gradient-to-r ${gradient}`}
        >
            <p className="text-2xl">Select a chat room to start messaging!!!</p>
        </div>
    );
};
