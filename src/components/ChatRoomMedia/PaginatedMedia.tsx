import React, { useState } from 'react';
import { GroupMessage } from '../../models/types';
import { Pagination } from '../common/Pagination/Pagination';
import { MediaType } from './MediaType';

interface PaginatedMediaProps {
    mediaArray: GroupMessage[];
    type: 'photos' | 'files' | 'videos' | 'links';
    itemsPerPage?: number;
}

export const PaginatedMedia: React.FC<PaginatedMediaProps> = ({
    mediaArray,
    type = 'photos',
    itemsPerPage = 12,
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPosts = mediaArray?.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginateFront = () => setCurrentPage(currentPage + 1);
    const paginateBack = () => setCurrentPage(currentPage - 1);

    return (
        <>
            <div className="grid lg:grid-cols-4  gap-2">
                {mediaArray?.length === 0 ? `No ${type ?? 'media'} here yet...` : null}

                {currentPosts?.map((photo: GroupMessage) => (
                    <MediaType type={type} link={photo?.fileLink!} />
                ))}
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={mediaArray?.length}
                paginateBack={paginateBack}
                paginateFront={paginateFront}
                currentPage={currentPage}
            />
        </>
    );
};
