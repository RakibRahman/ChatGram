import React from 'react';
import { useAvatar } from './useAvatar';

interface AvatarProps {
    name: string;
    img?: string;
}

export const Avatar: React.FC<AvatarProps> = React.memo(({ name, img }) => {
    const { avatarName, gradient } = useAvatar(name);

    return (
        <>
            {!img && name ? (
                <div
                    className={`w-12 h-12 bg-gradient-to-r ${gradient}  rounded-full text-white font-bold grid place-items-center`}
                >
                    {avatarName}
                </div>
            ) : (
                <img src={img} className="w-12 h-12 object-cover rounded-full" alt={name} />
            )}
        </>
    );
});
