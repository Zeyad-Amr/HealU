import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import { Slot, deleteSlot, fetchSlots } from "../../state/slices/slotsSlice";
import WeekDayPicker from "./WeekDayPicker";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@mui/material";
import { openSnackbar } from "../../state/slices/snackbarSlice";
import { Close } from "@mui/icons-material";
import {
  Appointment,
  cancelAppointment,
  fetchAppointments,
} from "../../state/slices/appointmentSlice";

const weekdaysMap = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const headers: string[] = ["Time", "Patient ID", "", ""];

function SlotsTable(props: { doctorId: number; clinicId: number }) {
  const dispatch = useDispatch<AppDispatch>();

  const SlotsState = useSelector((state: RootState) => state.slots);
  const AppointmentState = useSelector(
    (state: RootState) => state.appointments
  );

  const [selectedDay, setSelectedDay] = useState(0);
  const [slotsData, setSlotsData] = useState<Slot[]>([]);
  const [appointmentsData, setAppointmentsData] = useState<Appointment[]>([]);

  useEffect(() => {
    dispatch(fetchSlots());
    dispatch(fetchAppointments());
  }, [dispatch, selectedDay]);

  /////////////////////////////////////////////////

  useEffect(() => {
    const selectedWeekdayLabel = weekdaysMap[selectedDay];
    setSlotsData(
      SlotsState.slots.filter(
        (slot) =>
          slot.doctorId === props.doctorId &&
          slot.weekDay === selectedWeekdayLabel
      )
    );
  }, [selectedDay, SlotsState.slots]);

  /////////////////////////////////////////////////

  useEffect(() => {
    setAppointmentsData(
      AppointmentState.appointments.filter(
        (appointment) => appointment.doctorId === props.doctorId
      )
    );
  }, [AppointmentState.appointments]);

  /////////////////////////////////////////////////

  const handleDayChange = (event: any) => {
    const selectedDayValue = event.target.value as number;
    setSelectedDay(selectedDayValue);
  };
  /////////////////////////////////////////////////

  const handleDeleteSlot = async (id: string) => {
    await dispatch(deleteSlot(id)).then((resultAction) => {
      if (resultAction.meta.requestStatus === "rejected") {
        dispatch(
          openSnackbar({
            message: "Something Went Wrong! Please try again later",
            type: "warning",
          })
        );
      } else if (resultAction.meta.requestStatus === "fulfilled") {
        dispatch(
          openSnackbar({ message: "Slot Deleted Successfully", type: "error" })
        );
      }
    });
  };
  /////////////////////////////////////////////////

  const handleCancelAppointment = async (slotId: string) => {
    const appointmentToCancel = appointmentsData.filter(
      (appointment) => appointment.slotId.toString() === slotId
    )[0];
    await dispatch(cancelAppointment(appointmentToCancel?._id ?? "")).then(
      (resultAction) => {
        if (resultAction.meta.requestStatus === "rejected") {
          dispatch(
            openSnackbar({
              message: "Something Went Wrong! Please try again later",
              type: "warning",
            })
          );
        } else if (resultAction.meta.requestStatus === "fulfilled") {
          dispatch(
            openSnackbar({
              message: "Appointment Canceled Successfully",
              type: "info",
            })
          );
        }
      }
    );
  };
  /////////////////////////////////////////////////

  const mapAppointmentToTableCell = (slot: Slot) => (
    <TableCell>
      {appointmentsData
        .filter((appointment) => appointment.slotId === slot._id)
        .map((appointment) => appointment.patientId)
        .join(", ")}
    </TableCell>
  );
  /////////////////////////////////////////////////

  const mapSlotToTableRow = (slot: Slot) => (
    <TableRow key={slot._id}>
      <TableCell>{slot.time}</TableCell>
      {mapAppointmentToTableCell(slot)}
      <TableCell>
        <LoadingButton
          loading={SlotsState.loading}
          loadingPosition="start"
          color="error"
          variant="outlined"
          onClick={() => handleDeleteSlot(slot._id ?? "")}
          startIcon={<DeleteIcon />}
        >
          Delete
        </LoadingButton>
      </TableCell>
      {appointmentsData.some(
        (appointment) => appointment.slotId === slot._id
      ) && (
        <TableCell>
          <LoadingButton
            loading={AppointmentState.loading}
            loadingPosition="start"
            color="primary"
            variant="outlined"
            onClick={() => handleCancelAppointment(slot._id ?? "")}
            startIcon={<Close />}
          >
            Cancel Appointment
          </LoadingButton>
        </TableCell>
      )}
    </TableRow>
  );

  return (
    <>
      <WeekDayPicker
        handleDayChange={handleDayChange}
        selectedDay={selectedDay}
      />
      <br />
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} style={{ fontWeight: "bolder" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {slotsData.map((slot) => mapSlotToTableRow(slot))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SlotsTable;
