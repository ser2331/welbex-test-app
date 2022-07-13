import React  from "react";

import './pagination.css';

const Pagination = ({currentPage, setCurrentPage, pageSize, totalCount}) => {
    const pagesCount = Math.ceil(totalCount / pageSize);

    let startPage;
    let endPage;

    if (pagesCount <= 10) {
        startPage = 1;
        endPage = pagesCount;
    } else if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
    } else if (currentPage + 4 >= pagesCount) {
        startPage = pagesCount - 9;
        endPage = pagesCount;
    } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
    }

    const pages = [...Array((endPage + 1) - startPage).keys()].map((i) => startPage + i);

    return (
        <div className="Pagination">
            <nav className="pagination-outer">
                <ul className="pagination">
                    <button
                        type="button"
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage <= 1}
                    >
                        «
                    </button>

                    {pagesCount > 5 && (
                        <button
                            type="button"
                            className="page-link first"
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage <= 3}
                        >
                            First
                        </button>
                    )}

                    {
                        pages.map((page) => (
                            <button
                                type="button"
                                onClick={() => setCurrentPage(page)}
                                key={page}
                                className={currentPage === page ? 'page-link active' : 'page-link'}
                            >
                                {page}
                            </button>
                        ))
                    }

                    {pagesCount > 5 && (
                        <button
                            type="button"
                            className="page-link first"
                            onClick={() => setCurrentPage(pagesCount)}
                            disabled={currentPage >= (pagesCount - 1)}
                        >
                            Last
                        </button>
                    )}

                    <button
                        type="button"
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === endPage}
                    >
                        »
                    </button>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
