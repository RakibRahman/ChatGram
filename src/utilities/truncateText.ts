export const truncateText = (str: string, maxLength = 5) => {
    if (str.length >= 15) {
        return str.slice(0, maxLength) + '...';
    }
    return str;
};
