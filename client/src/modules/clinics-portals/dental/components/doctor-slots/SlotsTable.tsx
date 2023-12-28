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

let doctorId: number = 13;

const weekdaysMap = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const headers: string[] = ["Doctor ID", "Clinic ID", "Week Day", "Time", ""];

let slotsData: Slot[] = [];

function SlotsTable() {
  const SlotsState = useSelector((state: RootState) => state.slots);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    dispatch(fetchSlots());
  }, [dispatch]);

  useEffect(() => {
    const selectedWeekdayLabel = weekdaysMap[selectedDay];
    slotsData = SlotsState.slots.filter(
      (slot) =>
        slot.doctorId === doctorId && slot.weekDay === selectedWeekdayLabel
    );
    dispatch(fetchSlots());
  }, [selectedDay]);

  const handleDayChange = (event: any) => {
    const selectedDayValue = event.target.value as number;
    setSelectedDay(selectedDayValue);
  };

  return (
    <>
      <WeekDayPicker
        handleDayChange={handleDayChange}
        selectedDay={selectedDay}
      />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
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
            {slotsData.map((slot) => (
              <TableRow key={slot._id}>
                <TableCell>{slot.doctorId}</TableCell>
                <TableCell>{slot.clinicId}</TableCell>
                <TableCell>{slot.weekDay}</TableCell>
                <TableCell>{slot.time}</TableCell>
                <TableCell>
                  <LoadingButton
                    loading={SlotsState.loading}
                    loadingPosition="start"
                    color="error"
                    onClick={() => dispatch(deleteSlot(slot._id ?? ""))}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SlotsTable;
