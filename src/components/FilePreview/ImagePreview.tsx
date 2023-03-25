import React, { useState } from 'react';
import { XSquare } from 'react-feather';

interface ImagePreview {
    src: string;
    width?: string;
    height?: string;
}
export const ImagePreview: React.FC<ImagePreview> = ({ src, width, height }) => {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <img
                loading="lazy"
                onClick={() => {
                    setOpen(true);
                }}
                style={{
                    height: height ? height : '300px',
                    width: width ? width : '100%',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    borderRadius: '6px',
                }}
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
                        <XSquare />
                    </button>

                    <div className=" mt-10">
                        <img
                            onClick={() => {
                                setOpen(true);
                            }}
                            // style={{
                            //     maxHeight: '600px',
                            //     width: '100%',
                            //     objectFit: 'cover',
                            // }}
                            className={`w-${'full'} max-h-[90dvh] object-cover`}
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
