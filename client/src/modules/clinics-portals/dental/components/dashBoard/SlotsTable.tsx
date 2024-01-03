import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../../core/store";
import { Slot,  } from "../../state/slices/slotsSlice";
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
} from "../../state/slices/appointmentSlice";
import styles from "./DashBoard.module.css"; // Import the CSS module
import { cancelAppointment, deleteSlot } from "../../state/slices/doctorSlotsSlice";

function SlotsTable(props: {
  slots: Array<{ slot: Slot; appointmentObject: Appointment }>;
  handleAppointmentClick: (appointmentId: string) => void;
}) {
  const dispatch = useAppDispatch();

  const PatientsState = useSelector((state: RootState) => state.patientReducer);
  const DoctorSlotsState = useSelector(
    (state: RootState) => state.doctorSlotsReducer
  );

  const handleDeleteSlot = async (slotId: string) => {
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

  const handleCancelAppointment = async (appointmentId: string) => {
    await dispatch(cancelAppointment(appointmentId)).then((resultAction) => {
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
    });
  };

  return (
    <>
      <Table key={"SlotsTable"} className={styles.table}>
        <TableBody>
          {DoctorSlotsState.slots.map((slot) => (
            <TableRow key={slot.slot._id}>
              <TableCell className={styles.tableCell}>
                <Stack direction="row" spacing={2} style={{ width: "100%" }}>
                  <Typography variant="body1" className={styles.timeCell}>
                    {slot.slot.time}
                  </Typography>

                  <Typography
                    variant="body1"
                    className={styles.patientName}
                    onClick={() => {
                      props.handleAppointmentClick(
                        slot.appointmentObject?._id ?? ""
                      );
                      console.log(slot.appointmentObject._id);
                    }}
                  >
                    {(() => {
                      const appoPatientId = slot.appointmentObject?.patientId;

                      const patient = PatientsState.patients.find(
                        (patient) => patient.userId === appoPatientId
                      );

                      const firstName = patient?.firstName ?? "";
                      const lastName = patient?.lastName ?? "";

                      return `${firstName} ${lastName}`;
                    })()}
                  </Typography>

                  <IconButton
                    aria-label="Cancel"
                    className={styles.cancelButton}
                    onClick={() =>
                      handleCancelAppointment(slot.appointmentObject?._id ?? "")
                    }
                  >
                    X
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    className={styles.deleteIcon}
                    onClick={() => handleDeleteSlot(slot.slot._id ?? "")}
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
