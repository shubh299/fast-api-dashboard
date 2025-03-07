import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [engagedFilter, setEngagedFilter] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("ASC");

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        engagedFilter,
        setEngagedFilter,
        sortColumn,
        setSortColumn,
        sortOrder,
        setSortOrder,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
