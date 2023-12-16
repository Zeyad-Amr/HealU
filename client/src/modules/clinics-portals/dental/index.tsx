// import ListGroup from "./components/ListGroup";
import { useState } from "react";
import Table from "./components/Table";
import "./App.css";

const slotsColumn = [
  { key: "clinic_id", header: "Clinic ID" },
  { key: "doctor_id", header: "Doctor ID" },
  { key: "date", header: "Date" },
  { key: "time", header: "Time" },
];

const apptColumns = [
  { key: "slot_id", header: "Slot ID" },
  { key: "patient_id", header: "Patient ID" },
  { key: "doctor_id", header: "Doctor ID" },
  { key: "clinic_id", header: "Clinic" },
  { key: "status", header: "Status" },
];

function app() {
  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <div>
      <h1>Slots Table</h1>
      <Table
        columns={slotsColumn}
        apiUrl="http://localhost:3000/api/slots/"
      ></Table>
      <br />

      <h1>Appointments Table</h1>
      <Table
        columns={apptColumns}
        apiUrl="http://localhost:3000/api/appointments/"
      ></Table>

      {/* <Button
        Title="Explode"
        SubClass="btn-secondary"
        onClick={() => setAlertVisibility(true)}
      ></Button> */}
    </div>
  );
}
// var cors = require("cors");

export default app;
