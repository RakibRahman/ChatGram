import React, { useEffect, useState } from 'react';
import useCopyToClipboard from './useCopyToClipBoard';

export const useRightClickMenu = (triggeredBy?: unknown) => {
    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });
    useEffect(() => {
        const handleClick = () => setClicked(false);
        if (triggeredBy) {
            console.log(triggeredBy);
            console.log('sss');

            window.document.addEventListener('click', handleClick);
            return () => {
                console.log('ds');
                window.document.removeEventListener('click', handleClick);
            };
        }
    }, [triggeredBy]);
    return {
        clicked,
        setClicked,
        points,
        setPoints,
    };
};
