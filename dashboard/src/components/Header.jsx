import "./common.css";
import DownloadIcon from "./assets/arrow-down-circle.svg";
import AddIcon from "./assets/plus-lg.svg";

function Header() {
  return (
    <div className="Header">
      <h1>Leads</h1>
      <div className="HeaderButtonsGroup">
        <button className="Button">
          <img src={AddIcon} alt="" />
          Add Lead
        </button>
        <button className="Button ExportButton">
          <img src={DownloadIcon} alt="" className="InvertIconColor" />
          Export All
        </button>
      </div>
    </div>
  );
}

export default Header;
