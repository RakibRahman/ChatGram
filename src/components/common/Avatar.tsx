import React from 'react'

interface AvatarProps {
    name: string;
    img?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name, img }) => {
    return (
        <div>

            {!img && name ? <div className="w-10 h-10 bg-red-200 rounded-full">

            </div> : <img src={img} className='w-10 h-10 object-cover rounded-full' alt={name} />}
        </div>
    )
}
