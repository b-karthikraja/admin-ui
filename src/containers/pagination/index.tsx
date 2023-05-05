const PaginationComp = ({ ...props }) => {
  const { totalPages, currentPage, setCurrentPage } = props;
  const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const startPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - currentPage + 1);
  };
  const endPage = () => {
    setCurrentPage(totalPages);
  };

  if (currentPage > totalPages) {
    setCurrentPage(1);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center pagination-ul">
        <li className="page-item">
          <a className="page-link" onClick={startPage}>
            First
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" onClick={prevPage}>
            Previous
          </a>
        </li>
        {pageNumbers.map((noOfPage) => (
          <li
            key={noOfPage}
            className={`page-item ${
              currentPage === noOfPage ? "active" : ""
            } `}>
            <a onClick={() => setCurrentPage(noOfPage)} className="page-link">
              {noOfPage}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" onClick={nextPage}>
            Next
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" onClick={endPage}>
            Last
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComp;
