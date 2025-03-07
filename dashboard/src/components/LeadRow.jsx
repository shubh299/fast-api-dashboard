import "./common.css";
import ProfileCard from "./ProfileCard";
import ProfileCircle from "./assets/person-circle.svg";

function LeadRow(rowData) {
  const row = rowData.row;
  //   console.log(rowData.row.name, rowData.row.email, rowData.row);
  return (
    <tr className="LeadTableRows">
      <td width="30%">
        <ProfileCard
          imageSrc={ProfileCircle}
          name={row.name}
          email={row.email}
        />
      </td>
      <td width="20%" className="Name">
        {row.company}
      </td>
      <td width="10%">
        <div style={{ display: "flex", gap: "5px", justifyContent: "left" }}>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="StageBar"
              style={{
                backgroundColor: i < row.stage ? "#7D3CFC" : "#E0E0E0",
              }}
            ></div>
          ))}
        </div>
      </td>
      <td>
        <span
          className="Engaged"
          style={{
            backgroundColor: row.engaged ? "#E0F7E9" : "#F0F0F0",
            color: row.engaged ? "#009688" : "#666",
          }}
        >
          {row.engaged ? "Engaged" : "Not Engaged"}
        </span>
      </td>
      <td></td>
      <td>
        <span className="ActionDots">⋮</span>
      </td>
    </tr>
  );
}

export default LeadRow;
