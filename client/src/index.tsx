import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppointmentForm from "./modules/clinics-portals/dental/components/form/AppointmentForm";
import ServiceTable from "./modules/clinics-portals/dental/ServiceTable";
import DoctorSlots from "./modules/clinics-portals/dental/components/doctor-slots/DoctorSlots";

import { Provider } from "react-redux";
import { store } from "./modules/clinics-portals/dental/state/store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <DoctorSlots />
            {/* <ServiceTable />
            <AppointmentForm /> */}
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
