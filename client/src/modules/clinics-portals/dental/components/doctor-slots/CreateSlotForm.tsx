import { Box, FormControl } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import LoadingButton from "@mui/lab/LoadingButton";
import WeekDayPicker from "./WeekDayPicker";
import { createSlotForDoctor } from "../../state/slices/slotsSlice";
import { useState } from "react";
import { openSnackbar } from "../../state/slices/snackbarSlice";

const weekdaysMap = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

// Define the type for the time object
interface TimeObject {
  $H: number;
  $m: number;
}
// Function to format time object to string
const formatTime = (timeObject: TimeObject) => {
  let hours = timeObject["$H"].toString();

  // If it's 12:00, set hours to "12"
  if (timeObject["$H"] === 12) {
    hours = "12";
  } else {
    // Otherwise, use the regular formatting with leading zeros
    hours = hours.padStart(2, "0"); // Ensure two digits
  }

  const minutes = timeObject["$m"].toString().padStart(2, "0"); // Ensure two digits
  return `${hours}:${minutes}`;
};

const CreateSlotForm = (props: { doctorId: number; clinicId: number }) => {
  const dispatch = useDispatch<AppDispatch>();
  const SlotsState = useSelector((state: RootState) => state.slots);

  ////////////////////////////////////////////////////////

  const handleCreateSlot = async () => {
    await dispatch(createSlotForDoctor(newSlot)).then((resultAction) => {
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
            message: "Slot Created Successfully",
            type: "success",
          })
        );
      }
    });
  };
  ////////////////////////////////////////////////////////

  const [selectedDay, setSelectedDay] = useState(0);
  const [newSlot, setNewSlot] = useState({
    doctorId: props.doctorId,
    clinicId: props.clinicId,
    time: "11:00",
    weekDay: "Sunday",
  });

  const handleTimeChange = (value: any) => {
    setNewSlot((prevSlot) => ({
      ...prevSlot,
      time: formatTime(value),
    }));
  };

  ////////////////////////////////////////////////////////

  const handleDayChange = (event: any) => {
    const selectedDayValue = event.target.value as number;
    setSelectedDay(selectedDayValue);

    setNewSlot((prevSlot) => ({
      ...prevSlot,
      weekDay: weekdaysMap[selectedDayValue].label,
    }));
  };

  ////////////////////////////////////////////////////////

  return (
    <Box sx={{ minWidth: 120 }}>
      <h1> Create Slot</h1>
      <FormControl>
        <WeekDayPicker
          selectedDay={selectedDay}
          handleDayChange={handleDayChange}
        />
        <br />
        <TimePicker label="Time" onChange={handleTimeChange} />
        <br />
        <LoadingButton
          loading={SlotsState.loading}
          loadingPosition="start"
          color="success"
          variant="contained"
          onClick={() => dispatch(handleCreateSlot)}
        >
          Create Slot
        </LoadingButton>
      </FormControl>
    </Box>
  );
};
export default CreateSlotForm;
