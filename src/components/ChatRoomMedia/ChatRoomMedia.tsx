import React from 'react';
import { GroupMessage } from '../../models/types';
import { Accordion } from '../common/Accordion/Accordion';
import { AccordionItem } from '../common/Accordion/AccordionItem';
import { ImagePreview } from '../FilePreview/ImagePreview';
import VideoPreview from '../FilePreview/VideoPreview';

interface ChatRoomMediaProps {
    photos: GroupMessage[];
    videos: GroupMessage[];
}

export const ChatRoomMedia: React.FC<ChatRoomMediaProps> = ({ photos, videos }) => {
    return (
        <>
            <Accordion>
                <AccordionItem title={`Photos ${photos?.length}`}>
                    <div className="grid grid-cols-3 gap-4">
                        {photos?.length === 0 ? 'No videos here yet...' : null}

                        {photos?.map((photo: GroupMessage) => (
                            <ImagePreview src={photo?.fileLink!} width="72" height="72" />
                        ))}
                    </div>
                </AccordionItem>
                <AccordionItem title={`Videos ${videos?.length}`}>
                    <div className="grid grid-cols-3 gap-4">
                        {videos?.length === 0 ? 'No videos here yet...' : null}
                        {videos?.map((vid: GroupMessage) => (
                            <VideoPreview
                                videoLink={vid?.fileLink!}
                                showControl
                                autoPlay={false}
                                height="220px"
                            />
                        ))}
                    </div>
                </AccordionItem>
            </Accordion>
        </>
    );
};
