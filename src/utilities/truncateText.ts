export const truncateText = (str: string, maxLength = 15) => {
    return str.slice(0, maxLength) + '...';
};
