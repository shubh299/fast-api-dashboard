import React, { useContext } from "react";
import "./common.css";
import { SearchContext } from "../SearchContext";

const FilterAndSortModal = ({ isOpen, onClose }) => {
  const {
    engagedFilter,
    setEngagedFilter,
    sortColumn,
    setSortColumn,
    sortOrder,
    setSortOrder,
  } = useContext(SearchContext);
  if (!isOpen) return null;

  const handleIsEngagedInput = (event) => {
    let currentValue = event.target.value;
    if (currentValue === "null") {
      currentValue = null;
    }
    setEngagedFilter(currentValue);
  };

  const handleSortColumnChange = (event) => {
    let currentValue = event.target.value;
    if (currentValue === "null") {
      currentValue = null;
    }
    setSortColumn(currentValue);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          <div className="dropdown-container">
            <h2>Filter</h2>
            <label className="dropdown-label"> Is Engaged: </label>
            <select
              className="styled-select"
              value={engagedFilter}
              onChange={handleIsEngagedInput}
            >
              <option value="null">Clear</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="dropdown-container">
            <h2>Sort</h2>
            <label className="dropdown-label"> Sort By: </label>
            <select
              className="styled-select"
              value={sortColumn}
              onChange={handleSortColumnChange}
            >
              <option value="null">Clear</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="company">Company</option>
              <option value="stage">Stage</option>
              <option value="lastContacted">Last Contacted</option>
            </select>
            <br />
            <label className="dropdown-label">Sort Order: </label>
            <select
              className="styled-select"
              value={sortOrder}
              onChange={handleSortOrderChange}
            >
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default FilterAndSortModal;
