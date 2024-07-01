import React from 'react';

interface PaginationProps {
  productsPerPage: number;
  totalProducts: number;
  onPageChange: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ productsPerPage, totalProducts, onPageChange, currentPage }) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const renderPreviousButton = () => {
    if (currentPage > 1) {
      return (
        <li className="page-item">
          <button onClick={() => onPageChange(currentPage - 1)} className="page-link">
            <svg className="previous" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
            </svg>
          </button>
        </li>
      );
    } else {
      return (
        <li className="page-item disabled">
          <button className="page-link" disabled>
            <svg className="previous" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ccc">
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
            </svg>
          </button>
        </li>
      );
    }
  };

  const renderNextButton = () => {
    if (currentPage < totalPages) {
      return (
        <li className="page-item">
          <button onClick={() => onPageChange(currentPage + 1)} className="page-link">
            <svg className="next" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
            </svg>
          </button>
        </li>
      );
    } else {
      return (
        <li className="page-item disabled">
          <button className="page-link" disabled>
            <svg className="next" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ccc">
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
            </svg>
          </button>
        </li>
      );
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='pagination-container'>
      <ul className="pagination-item">
        {renderPreviousButton()}
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button onClick={() => onPageChange(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        {renderNextButton()}
      </ul>
    </nav>
  );
};

export default Pagination;
