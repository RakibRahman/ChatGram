import React, { ReactNode } from 'react';

export const Accordion = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="w-full  px-8 mx-auto mt-20 space-y-2 shadow  ">{children}</div>
        </>
    );
};
