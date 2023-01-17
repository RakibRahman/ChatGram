import { formatRelative, format } from 'date-fns';

export const getTime = (seconds: number, dateOnly?: boolean): string | null => {

    if (!seconds) return null;
    const createDate = new Date(seconds * 1000);
    const today = new Date();
    if (!today) return null;
    const formattedDate = formatRelative(createDate, today);

    return dateOnly ? format(createDate, 'MM/dd/yyyy') : formattedDate



}
