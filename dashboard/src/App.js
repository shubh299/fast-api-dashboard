import "./App.css";
import Header from "./components/Header";
import FilterComponent from "./components/FilterComponent";
import LeadsTable from "./components/LeadsTable";

function App() {
  return (
    <>
      <title>Leads</title>
      <div className="Dashboard">
        <Header />
        <FilterComponent />
        <LeadsTable />
      </div>
    </>
  );
}

export default App;
