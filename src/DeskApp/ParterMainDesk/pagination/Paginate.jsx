import ArrowRightLineIcon from "@rsuite/icons/ArrowRightLine";
import ArrowLeftLineIcon from "@rsuite/icons/ArrowLeftLine";
export function Paginate({
  currentPage,
  totalPages,
  handlePageChange,
  hotel,
  hotalList,
}) {
  return (
    <>
      <span>
        Page {currentPage} of {totalPages}, showing {hotel} records out of{" "}
        {hotalList} total
      </span>
      <nav aria-label="Page navigation example">
        <ul className="pagination mb-2 mb-sm-0">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                color: currentPage === 1 ? "#c9bcbc" : "",
              }}
            >
              <ArrowLeftLineIcon />
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
              key={index}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                color: currentPage === totalPages ? "#c9bcbc" : "",
              }}
            >
              {/* <i className="fa-solid fa-angle-right" /> */}
              <ArrowRightLineIcon />
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
