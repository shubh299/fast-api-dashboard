import "./common.css";
import DownloadIcon from "./assets/arrow-down-circle.svg";
import AddIcon from "./assets/plus-lg.svg";
import { export_all_leads } from "../apiService";

function Header() {
  const handleExportAll = () => {
    console.log("handle export all");
    export_all_leads()
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "all_leads.csv"); // File name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div className="header">
      <h1>Leads</h1>
      <div className="header-buttons-group">
        <button className="button">
          <img src={AddIcon} alt="" />
          Add Lead
        </button>
        <button className="button export-button" onClick={handleExportAll}>
          <img src={DownloadIcon} alt="" className="invert-icon-color" />
          Export All
        </button>
      </div>
    </div>
  );
}

export default Header;
