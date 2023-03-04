import React from 'react';
interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    paginateFront: () => void;
    paginateBack: () => void;
    currentPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({
    itemsPerPage,
    totalItems,
    paginateFront,
    paginateBack,
    currentPage,
}) => {
    const isFinished = currentPage * itemsPerPage >= totalItems;
    return (
        <div className="my-2">
            {/* <div>
                <p className='text-sm text-gray-700'>
                    Showing
                    <span className='font-medium'>{currentPage * itemsPerPage - 10}</span>
                    to
                    <span className='font-medium'> {currentPage * itemsPerPage} </span>
                    of
                    <span className='font-medium'> {totalItems} </span>
                    results
                </p>
            </div> */}
            <nav className="block"></nav>
            <div>
                <div className="btn-group ">
                    <button
                        className={` ${
                            currentPage <= 1 ? 'btn-disabled' : ''
                        } btn btn-outline btn-xs`}
                        onClick={() => {
                            paginateBack();
                        }}
                    >
                        Previous
                    </button>
                    <button
                        className={`${isFinished ? 'btn-disabled' : ''} btn btn-outline btn-xs`}
                        onClick={() => {
                            paginateFront();
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
