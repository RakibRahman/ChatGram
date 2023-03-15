import React from 'react';
import { Link } from 'react-feather';

interface URLPreviewProps {
    url: string;
}

const URLPreview: React.FC<URLPreviewProps> = ({ url }) => {
    return (
        <div className="flex gap-2  items-center bg-white  p-2 rounded-md shadow-sm w-fit shadow-blue-100">
            <Link color="#000000" size="15px" />
            <a
                className="link break-words overflow-hidden no-underline text-sky-500 uppercase text-sm leading-tight tracking-wide font-semibold"
                href={url}
                target="_blank"
            >
                {url.replace(/.+\/\/|www.|\..+/g, '') ?? url}
            </a>
        </div>
    );
};

export default URLPreview;
