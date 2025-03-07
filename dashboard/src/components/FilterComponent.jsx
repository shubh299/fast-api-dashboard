import FilterIcon from "./assets/filter.svg";

function FilterComponent(props) {
  const handleSearchQuery = (queryInput) => {
    console.log(queryInput.target.value);
  };
  return (
    <div className="SearchDiv">
      <input
        type="text"
        placeholder="Search by lead's name, email or company name"
        className="SearchBar"
        onChange={handleSearchQuery}
      />
      <button className="Button">
        <img src={FilterIcon} alt="" />
        Filter & Sort
      </button>
    </div>
  );
}

export default FilterComponent;
