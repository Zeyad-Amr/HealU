import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { store } from "./modules/clinics-portals/dental/state/store";
import SlotsTable from "./modules/clinics-portals/dental/components/doctor-slots/SlotsTable";
import CreateSlotForm from "./modules/clinics-portals/dental/components/doctor-slots/CreateSlotForm";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import NavBar from "./modules/clinics-portals/dental/components/navBar/NavBar";
import DashBoard from "./modules/clinics-portals/dental/components/dashBoard/DashBoard";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
let doctorId: number = 13,
    clinicId: number = 5;

root.render(
    <React.StrictMode>
        <NavBar/>
        <DashBoard/>
        {/* <Provider store={store}>
            <h1>Doctor Slots</h1>
            <SlotsTable doctorId={doctorId} clinicId={clinicId} />
            <br></br>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CreateSlotForm doctorId={doctorId} clinicId={clinicId} />
            </LocalizationProvider>
        </Provider> */}
    </React.StrictMode>
);
