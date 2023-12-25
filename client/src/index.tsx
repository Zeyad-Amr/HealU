import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { store } from "./modules/clinics-portals/dental/state/store";
import SlotsTable from "./modules/clinics-portals/dental/components/doctor-slots/SlotsTable";
import CreateSlotForm from "./modules/clinics-portals/dental/components/doctor-slots/CreateSlotForm";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <h1>Doctor Slots</h1>
      <SlotsTable />
      <CreateSlotForm/>
    </Provider>
  </React.StrictMode>
);
