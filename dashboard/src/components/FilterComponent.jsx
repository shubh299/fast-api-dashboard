import { useContext } from "react";
import FilterIcon from "./assets/filter.svg";
import { SearchContext } from "../SearchContext";

function FilterComponent() {
  const { setSearchQuery } = useContext(SearchContext);
  const handleSearchQuery = (queryInput) => {
    setSearchQuery(queryInput.target.value);
  };
  return (
    <div className="search-div">
      <input
        type="text"
        placeholder="Search by lead's name, email or company name"
        className="search-bar"
        onChange={handleSearchQuery}
      />
      <button className="button">
        <img src={FilterIcon} alt="" />
        Filter & Sort
      </button>
    </div>
  );
}

export default FilterComponent;
