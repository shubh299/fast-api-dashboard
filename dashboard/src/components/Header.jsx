import "./common.css";
import DownloadIcon from "./assets/arrow-down-circle.svg";
import AddIcon from "./assets/plus-lg.svg";

function Header() {
  return (
    <div className="header">
      <h1>Leads</h1>
      <div className="header-buttons-group">
        <button className="button">
          <img src={AddIcon} alt="" />
          Add Lead
        </button>
        <button className="button export-button">
          <img src={DownloadIcon} alt="" className="invert-icon-color" />
          Export All
        </button>
      </div>
    </div>
  );
}

export default Header;
