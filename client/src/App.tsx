import React from "react";
import OrthopedicClinic from "./modules/clinics-portals/orthopedic/pages/App";
import CustomizedTables from "./modules/clinics-portals/orthopedic/components/table/table";

function App() {
  return (
    <div>
      <OrthopedicClinic />
      <CustomizedTables />
    </div>
  );
}

export default App;
