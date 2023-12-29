import DoctorSlot from "./modules/clinics-portals/orthopedic/pages/doctorSlot/doctorSlot";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./modules/clinics-portals/orthopedic/components/navbar/navbar";
import Patient from "./modules/clinics-portals/orthopedic/pages/patient/patient";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DoctorSlot />} />
        <Route path="/patient" element={<Patient />} />
        {/* <Route path="/appoinments" element={<ScheduleTable />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
