import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../../core/store";
import { Slot, deleteSlot } from "../../state/slices/slotsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  TableRow,
  TableCell,
  TableBody,
  Table,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { openSnackbar } from "../../state/slices/snackbarSlice";
import {
  Appointment,
  cancelAppointment,
} from "../../state/slices/appointmentSlice";
import styles from "./DashBoard.module.css"; // Import the CSS module

function SlotsTable(props: {
  slots: Slot[];
  handleAppointmentClick: (appointment: Appointment | undefined) => void;
}) {
  const dispatch = useAppDispatch();
  const AppointmentState = useSelector(
    (state: RootState) => state.appointmentReducer
  );
  const PatientsState = useSelector((state: RootState) => state.patientReducer);

  const handleDeleteSlot = async (slotId: string) => {
    console.log("SlotID: ", slotId);
    console.log("Slots ", props.slots);
    await dispatch(deleteSlot(slotId)).then((resultAction) => {
      dispatch(
        openSnackbar({
          message:
            resultAction.meta.requestStatus === "fulfilled"
              ? "Slot Deleted Successfully"
              : "Something Went Wrong! Please try again later",
          type:
            resultAction.meta.requestStatus === "fulfilled"
              ? "error"
              : "warning",
        })
      );
    });
  };

  const handleCancelAppointment = async (slotId: string) => {
    const appointmentToCancel = AppointmentState.appointments.filter(
      (appointment) => appointment.slotId.toString() === slotId
    )[0];
    await dispatch(cancelAppointment(appointmentToCancel?._id ?? "")).then(
      (resultAction) => {
        dispatch(
          openSnackbar({
            message:
              resultAction.meta.requestStatus === "fulfilled"
                ? "Appointment Canceled Successfully"
                : "Something Went Wrong! Please try again later",
            type:
              resultAction.meta.requestStatus === "fulfilled"
                ? "info"
                : "warning",
          })
        );
      }
    );
  };

  return (
    <>
      <Table key={"SlotsTable"} className={styles.table}>
        <TableBody>
          {props.slots.map((slot) => (
            <TableRow key={slot._id}>
              <TableCell className={styles.tableCell}>
                <Stack direction="row" spacing={2} style={{ width: "100%" }}>
                  
                  <Typography variant="body1" className={styles.timeCell}>
                    {slot.time}
                  </Typography>

                  <Typography
                    variant="body1"
                    className={styles.patientName}
                    onClick={() =>
                      props.handleAppointmentClick(
                        AppointmentState.appointments.find(
                          (appointment) => appointment.slotId === slot._id
                        )
                      )
                    }
                  >
                    {(() => {
                      const appointment = AppointmentState.appointments.find(
                        (appointment) => appointment.slotId === slot._id
                      );

                      const patient = PatientsState.patients.find(
                        (patient) => patient.userId === appointment?.patientId
                      );

                      const firstName = patient?.firstName ?? "";
                      const lastName = patient?.lastName ?? "";

                      return `${firstName} ${lastName}`;
                    })()}
                  </Typography>

                  <IconButton
                    aria-label="Cancel"
                    className={styles.cancelButton}
                    onClick={() => handleCancelAppointment(slot._id ?? "")}
                  >
                    X
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    className={styles.deleteIcon}
                    onClick={() => handleDeleteSlot(slot._id ?? "")}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default SlotsTable;
