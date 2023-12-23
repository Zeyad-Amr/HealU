// import ListGroup from "./components/ListGroup";
import { useState } from "react";
import Table from "./components/Table";
import "../../../App.css";

const slotsColumn = [
  { key: "clinicId", header: "Clinic ID" },
  { key: "doctorId", header: "Doctor ID" },
  { key: "time", header: "time" },
  { key: "weekDay", header: "Week Day" },
];

const apptColumns = [
  { key: "slotId", header: "Slot ID" },
  { key: "patientId", header: "Patient ID" },
  { key: "doctorId", header: "Doctor ID" },
  { key: "clinicId", header: "Clinic ID" },
  { key: "date", header: "Date" },
  { key: "time", header: "Time"},
  { key: "status", header: "Status" },
];

function ServiceTable() {
  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <div>
      <h1>Slots Table</h1>
      <Table
        columns={slotsColumn}
        apiUrl="https://appointment-service-y30u.onrender.com/slots/"
      ></Table>
      <br />

      <h1>Appointments Table</h1>
      <Table
        columns={apptColumns}
        apiUrl="https://appointment-service-y30u.onrender.com/appointments/"
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

export default ServiceTable;
