import { useEffect, useState } from "react";
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

  useEffect(() => {
    setCurrentRows(data.slice(0, 10));
  }, []);

  return (
    <div>
      <div className="CountStats">Showing count</div>
      <table cellPadding="10" className="LeadTable">
        <thead>
          <tr className="LeadTableRows">
            <th className="LeadTableHeaders">Name</th>
            <th className="LeadTableHeaders">Company</th>
            <th className="LeadTableHeaders">Stage</th>
            <th className="LeadTableHeaders">Engaged</th>
            <th className="LeadTableHeaders">Last Contacted</th>
            <th className="LeadTableHeaders"></th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row) => (
            <LeadRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadsTable;
