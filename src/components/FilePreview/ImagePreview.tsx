import React from 'react';

interface ImagePreview {
    src: string;
    width?: string;
    height?: string;
}
export const ImagePreview: React.FC<ImagePreview> = ({ src, width = 'full', height = '20' }) => {
    return (
        <>
            <img
                className={`w-${width} h-${height} object-cover`}
                src={src ? src : 'https://via.placeholder.com/150/FFFF00/000000?Text=No Preview'}
                alt="preview"
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = 'https://via.placeholder.com/400x400?text=Image not found';
                }}
            />
        </>
    );
};
