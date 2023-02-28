import React, { useState } from 'react';

interface ImagePreview {
    src: string;
    width?: string;
    height?: string;
}
export const ImagePreview: React.FC<ImagePreview> = ({ src, width = 'full', height = '20' }) => {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <img
                onClick={() => {
                    console.log(src);
                    setOpen(true);
                }}
                style={{
                    height: '300px',
                    maxWidth: '100%',
                    objectFit: 'cover',
                    cursor: 'pointer',
                }}
                className={`w-${40} h-${40} object-cover`}
                src={src ? src : 'https://via.placeholder.com/150/FFFF00/000000?Text=No Preview'}
                alt="preview"
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = 'https://via.placeholder.com/400x400?text=Image not found';
                }}
            />
            {isOpen ? (
                <div
                    className={
                        ' fixed overflow-hidden z-10 bg-black  bg-opacity-70 inset-0 transform ease-in-out ' +
                        (isOpen
                            ? ' transition-opacity opacity-100 duration-200 translate-y-0  '
                            : ' transition-all delay-100 opacity-0 translate-y-full  ')
                    }
                >
                    <button
                        onClick={() => {
                            setOpen(false);
                        }}
                        className="btn btn-sm absolute right-0 top-0"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <div className="grid place-items-center mt-10">
                        <img
                            onClick={() => {
                                setOpen(true);
                            }}
                            style={{
                                maxHeight: '90vh',
                                maxWidth: '100%',
                                objectFit: 'cover',
                            }}
                            className={`w-${40} h-${40} object-cover`}
                            src={
                                src
                                    ? src
                                    : 'https://via.placeholder.com/150/FFFF00/000000?Text=No Preview'
                            }
                            alt="preview"
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src =
                                    'https://via.placeholder.com/400x400?text=Image not found';
                            }}
                        />
                    </div>
                </div>
            ) : null}
        </>
    );
};
