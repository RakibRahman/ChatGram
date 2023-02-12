import React from 'react';
import { Avatar } from '../Avatar/Avatar';

interface ProfileCardProps {
    name: string;
    pic: string;
    isOnline?: string;
    lastActive?: string | Date;
}
export const ProfileCard: React.FC<ProfileCardProps> = ({ name, pic, isOnline, lastActive }) => {
    const date = new Date(lastActive ?? '');
    return (
        <>
            <div className="flex gap-3">
                <Avatar name={name} img={pic} />
                <div className="flex flex-col">
                    <p className="capitalize"> {name}</p>
                    {isOnline && !lastActive ? <p>{isOnline}</p> : null}
                    {lastActive ? (
                        <p className="text-sm">last seen {date.toLocaleDateString()}</p>
                    ) : null}
                </div>
            </div>
        </>
    );
};
