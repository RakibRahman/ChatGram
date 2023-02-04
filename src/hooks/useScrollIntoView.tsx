import React, { useLayoutEffect, useRef } from 'react';

export const useScrollIntoView = (
    ref: React.RefObject<HTMLElement>,
    triggeredBy?: unknown
) => {
    const isMounted = useRef(false);
    const depedencies = triggeredBy ? [triggeredBy] : [];
    useLayoutEffect(() => {
        isMounted.current = true;

        if (isMounted.current && ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'end',
            });
        }

        return () => {
            isMounted.current = false;
        };
    }, [triggeredBy]);
};
