import Box from "@mui/material/Box";
import AppointmentSlot from "./AppointmentSlot";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../../core/store";
import {
  clearAppointment,
  removeAppointment,
} from "../../slices/nutritionSlice";

// const data = [
//     {
//         time: "10:00 AM",
//         name: "Patient Name",
//     },
//     {
//         time: "01:00 PM",
//         name: "Patient Name",
//     }, {
//         time: "03:00 PM",
//         name: "",
//     }, {
//         time: "05:00 PM",
//         name: "Patient Name",
//     }
// ];

const AppointmentsBody = () => {
  const { appointments } = useSelector((state: any) => state.nutrition);

  const dispatch = useAppDispatch();

  const handleDeleteSlot = (id: string) => {
    dispatch(removeAppointment(id));
  };

  const handleClearSlot = (time: string) => {
    dispatch(clearAppointment(time));
  };

  return (
    <Box>
      {appointments.map((item: any, index: number) => {
        return (
          <Box
            key={index}
            sx={{
              marginBottom: "1rem",
            }}
          >
            <AppointmentSlot
              time={item.time}
              name={item.patientName}
              onDeleteSlot={() => handleDeleteSlot(item.patientId)}
              onClearSlot={() => handleClearSlot(item.time)}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default AppointmentsBody;
