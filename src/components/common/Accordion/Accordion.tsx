import React, { ReactNode } from 'react';

export const Accordion = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="w-full  mx-auto  space-y-2 shadow  ">{children}</div>
        </>
    );
};
