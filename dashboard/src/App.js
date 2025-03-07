import "./App.css";
import Header from "./components/Header";
import FilterComponent from "./components/FilterComponent";
import LeadsTable from "./components/LeadsTable";
import { SearchContextProvider } from "./SearchContext";

function App() {
  return (
    <>
      <title>Leads</title>
      <div className="Dashboard">
        <SearchContextProvider>
          <Header />
          <FilterComponent />
          <LeadsTable />
        </SearchContextProvider>
      </div>
    </>
  );
}

export default App;
