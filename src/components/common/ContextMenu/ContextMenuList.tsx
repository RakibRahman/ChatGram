import React from 'react';

export const ContextMenuList = ({ children }: { children: React.ReactNode }) => {
    return <ul className="menu bg-base-200 w-52  rounded-box">{children}</ul>;
};
