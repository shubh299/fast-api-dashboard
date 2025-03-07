import { useContext, useEffect, useState } from "react";
import LeadRow from "./LeadRow";
import { get_leads } from "../apiService";
import ReactPaginate from "react-paginate";
import LeftPage from "./assets/chevron-left.svg";
import RightPage from "./assets/chevron-right.svg";
import { SearchContext } from "../SearchContext";

function LeadsTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [currentRows, setCurrentRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);

  const {
    searchQuery,
    engagedFilter,
    sortColumn,
    sortOrder,
    leadUpdated,
    setLeadUpdated,
  } = useContext(SearchContext);

  const getData = async (
    pageNumber,
    searchQuery,
    engagedFilter,
    sortColumn,
    sortOrder
  ) => {
    console.log("getData", searchQuery);
    const leads = await get_leads(
      pageNumber * pageSize,
      pageSize,
      searchQuery,
      engagedFilter,
      sortColumn,
      sortOrder
    );
    setTotalPages(Math.ceil(leads.totalCount / pageSize));
    setCurrentRows(leads.data);
    setTotalRows(leads.totalCount);
    setLeadUpdated(false);
  };

  useEffect(() => {
    getData(0);
  }, []);

  useEffect(() => {
    getData(currentPage, searchQuery, engagedFilter, sortColumn, sortOrder);
  }, [
    currentPage,
    pageSize,
    searchQuery,
    engagedFilter,
    sortOrder,
    sortColumn,
  ]);

  useEffect(() => {
    if (leadUpdated) {
      getData(currentPage, searchQuery, engagedFilter, sortColumn, sortOrder);
    }
  }, [leadUpdated]);

  return (
    <div>
      <div className="count-stats">
        Showing {currentPage * pageSize + 1} - {(currentPage + 1) * pageSize} of{" "}
        {totalRows} leads
      </div>
      <table cellPadding="10" className="lead-table">
        <thead>
          <tr className="lead-table-rows">
            <th className="lead-table-headers">Name</th>
            <th className="lead-table-headers">Company</th>
            <th className="lead-table-headers">Stage</th>
            <th className="lead-table-headers">Engaged</th>
            <th className="lead-table-headers">Last Contacted</th>
            <th className="lead-table-headers"></th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row) => (
            <LeadRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={
          <button
            className={`page-nav-item ${
              currentPage === 0 ? ".page-nav-item-disabled" : ""
            }`}
            disabled={currentPage === 0}
          >
            <img src={LeftPage} alt="<" />
          </button>
        }
        nextLabel={
          <button
            className={`page-nav-item ${
              currentPage === totalPages ? ".page-nav-item-disabled" : ""
            }`}
            disabled={currentPage === totalPages}
          >
            <img src={RightPage} alt="<" />
          </button>
        }
        breakLabel="..."
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={(elem) => setCurrentPage(elem.selected)}
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        previousClassName={"prev-item"}
        nextClassName={"next-item"}
        breakClassName={"page-item break-nav-item"}
      />
    </div>
  );
}

export default LeadsTable;
