import "./common.css";
import ProfileCard from "./ProfileCard";
import ProfileCircle from "./assets/person-circle.svg";
import UpdateLeadModal from "./UpdateLeadModal";
import { useContext, useState } from "react";
import { SearchContext } from "../SearchContext";
import { delete_lead, update_lead } from "../apiService";

function LeadRow(rowData) {
  const row = rowData.row;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setLeadUpdated } = useContext(SearchContext);

  const handleUpdateLead = (lead) => {
    console.log("Updated Lead:", lead, row.id);
    update_lead(row.id, lead)
      .then((response) => {
        console.log(response);
        setLeadUpdated(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteLead = () => {
    delete_lead(row.id)
      .then(() => {
        setLeadUpdated(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr className="lead-table-rows">
      <td width="30%">
        <ProfileCard
          imageSrc={ProfileCircle}
          name={row.name}
          email={row.email}
        />
      </td>
      <td width="20%" className="name">
        {row.company}
      </td>
      <td width="10%">
        <div style={{ display: "flex", gap: "5px", justifyContent: "left" }}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="stage-bar"
              style={{
                backgroundColor: i < row.stage ? "#7D3CFC" : "#E0E0E0",
              }}
            ></div>
          ))}
        </div>
      </td>
      <td>
        <span
          className="engaged"
          style={{
            backgroundColor: row.engaged ? "#E0F7E9" : "#F0F0F0",
            color: row.engaged ? "#009688" : "#666",
          }}
        >
          {row.engaged ? "Engaged" : "Not Engaged"}
        </span>
      </td>
      <td>
        {row.lastContacted
          ? new Date(row.lastContacted).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "-"}
      </td>
      <td>
        <span onClick={() => setIsModalOpen(true)} className="action-dots">
          ⋮
        </span>
        <div>
          <UpdateLeadModal
            name={row.name}
            email={row.email}
            company={row.company}
            stage={row.stage}
            lastContacted={row.lastContacted}
            engaged={row.lastContacted}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onUpdate={handleUpdateLead}
            onDelete={handleDeleteLead}
          />
        </div>
      </td>
    </tr>
  );
}

export default LeadRow;
