import DoctorSlot from "./modules/clinics-portals/orthopedic/pages/doctorSlot/doctorSlot";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./modules/clinics-portals/orthopedic/components/navbar/navbar";
import Patient from "./modules/clinics-portals/orthopedic/pages/patient/patient";
import AddDoctor from "./modules/admin-portal/pages/doctors";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DoctorSlot />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/addDoctor" element={<AddDoctor />} />
      </Routes>
    </Router>
  );
}

export default App;
