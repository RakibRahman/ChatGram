import React from 'react';
import { Copy, CornerRightUp, Download, Link, Link2, Trash } from 'react-feather';
type IconKey = 'copy-text' | 'delete' | 'forward' | 'download' | 'copy-link' | 'url-link';
interface ContextMenuItem {
    title: string;
    icon: IconKey;
    action: () => void;
    downloadUrl?: string;
}

type IconList = { [key in IconKey]?: JSX.Element };

const iconList: IconList = {
    'copy-text': <Copy size="20px" />,
    'copy-link': <Link2 size="20px" />,
    download: <Download size="20px" />,
    delete: <Trash size="20px" />,
    forward: <CornerRightUp size="20px" />,
    'url-link': <Link size="20px" />,
};
export const ContextMenuItem: React.FC<ContextMenuItem> = ({
    action,
    title,
    icon,
    downloadUrl,
}) => {
    if (icon === 'download' && downloadUrl) {
        return (
            <li onClick={action} className="capitalize">
                <a href={downloadUrl} download target="_blank">
                    {iconList[icon]}
                    {title}
                </a>
            </li>
        );
    }

    return (
        <li onClick={action} className="capitalize">
            <a>
                {iconList[icon]}
                {title}
            </a>
        </li>
    );
};
