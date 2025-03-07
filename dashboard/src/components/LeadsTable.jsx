import { useState } from "react";
import LeadRow from "./LeadRow";

function LeadsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [currentRows, setCurrentRows] = useState([]);

  const data = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: "a" + i,
    email: "b@a.com" + i,
    company: "company" + i,
    engaged: i % 2,
    stage: i % 4,
    lastContacted: i % 2 ? Date.now() : null,
  }));

  //   setCurrentRows(data.slice(0, 10));

  return (
    <div>
      <div>Showing count</div>
      <div>
        <table cellPadding="10" className="LeadTable">
          <thead className="LeadTableHead">
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Stage</th>
              <th>Engaged</th>
              <th>Last Contacted</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <LeadRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeadsTable;
