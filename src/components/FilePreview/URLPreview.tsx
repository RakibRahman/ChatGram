import React from 'react';

interface URLPreviewProps {
    url: string;
}

const URLPreview: React.FC<URLPreviewProps> = ({ url }) => {
    return (
        <div className="flex gap-2  items-center bg-white  p-2 rounded-md shadow-sm w-fit shadow-blue-100">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#000"
                className="w-4 h-4"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
            </svg>
            <a
                className="link break-words overflow-hidden no-underline text-sky-500 uppercase text-sm leading-tight tracking-wide"
                href={url}
                target="_blank"
            >
                {url.replace(/.+\/\/|www.|\..+/g, '') ?? url}
            </a>
        </div>
    );
};

export default URLPreview;
