import { useContext, useState } from "react";
import FilterIcon from "./assets/filter.svg";
import { SearchContext } from "../SearchContext";
import FilterAndSortModal from "./FilterAndSortModal";

function FilterComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <button className="button" onClick={() => setIsModalOpen(true)}>
        <img src={FilterIcon} alt="" />
        Filter & Sort
      </button>
      <FilterAndSortModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default FilterComponent;
