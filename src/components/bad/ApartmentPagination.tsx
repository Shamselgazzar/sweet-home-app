import React from 'react';

interface Props {
    currentPage: number;
    totalPages: number;
    onPaginate: (page: number) => void;
}

const ApartmentPagination: React.FC<Props> = ({ currentPage, totalPages, onPaginate }) => {
    return (
        <div>
            <button onClick={() => onPaginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => onPaginate(i + 1)}>
                    {i + 1}
                </button>
            ))}
            <button onClick={() => onPaginate(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
};

export default ApartmentPagination;
