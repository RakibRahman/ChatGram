import { useEffect, useState } from 'react';

export const useRightClickMenu = (triggeredBy?: unknown) => {
    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });
    useEffect(() => {
        const handleClick = () => setClicked(false);

        window.document.addEventListener('click', handleClick);
        return () => {
            window.document.removeEventListener('click', handleClick);
        };
    }, [triggeredBy]);
    return {
        clicked,
        setClicked,
        points,
        setPoints,
    };
};
