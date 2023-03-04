import React from 'react';
import { GroupMessage } from '../../models/types';
import { Accordion } from '../common/Accordion/Accordion';
import { AccordionItem } from '../common/Accordion/AccordionItem';
import { PaginatedMedia } from './PaginatedMedia';

export interface ChatRoomMediaProps {
    photos: GroupMessage[];
    videos: GroupMessage[];
}

export const ChatRoomMedia: React.FC<ChatRoomMediaProps> = ({ photos, videos }) => {
    return (
        <>
            <Accordion>
                <AccordionItem title={`Photos ${photos?.length ?? 0}`}>
                    <PaginatedMedia mediaArray={photos} type="photos" />
                </AccordionItem>
                <AccordionItem title={`Videos ${videos?.length ?? 0}`}>
                    <PaginatedMedia mediaArray={videos} type="videos" />
                </AccordionItem>
            </Accordion>
        </>
    );
};
