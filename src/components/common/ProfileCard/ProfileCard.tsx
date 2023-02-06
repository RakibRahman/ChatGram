import React from 'react';
import { Avatar } from '../Avatar/Avatar';

interface ProfileCardProps {
    name: string;
    pic: string;
}
export const ProfileCard: React.FC<ProfileCardProps> = ({ name, pic }) => {
    return (
        <div className="flex gap-3">
            <Avatar name={name} img={pic} />
            <p>{name}</p>
        </div>
    );
};
