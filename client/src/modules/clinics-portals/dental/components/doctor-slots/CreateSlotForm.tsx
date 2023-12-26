import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Slot, createSlotForDoctor } from "../../state/slices/slotsSlice";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";

let newSlot: Slot = {
  doctorId: 13,
  clinicId: 5,
  time: "7 pm",
  weekDay: "Sunday",
};

const weekdaysMap = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];
const CreateSlotForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [time, setTime] = React.useState("10:00");

  const handleTimeChange = (value: any) => {
    setTime(value);
    newSlot.time = `${value["$H"]}:${value["$m"]}`;
  };

  const [selectedDay, setSelectedDay] = React.useState([]);
  const handleDayChange = (event: any) => {
    setSelectedDay(event.target.value);
    newSlot.weekDay = weekdaysMap[event.target.value].label;
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <h1> Create Slot</h1>
      <FormControl fullWidth>
        <InputLabel id="weekday-label">Week Day</InputLabel>
        <Select
          labelId="weekday-label"
          value={selectedDay}
          label="Week Day"
          onChange={handleDayChange}
        >
          {weekdaysMap.map((day) => (
            <MenuItem value={day.value}>{day.label}</MenuItem>
          ))}
        </Select>
        <br />
        <TimePicker label="Time" value={time} onChange={handleTimeChange} />
        <br />
        <TextField
          label="Doctor ID"
          onChange={(event) =>
            (newSlot.doctorId = parseInt(event.target.value))
          }
        />
        <br />
        <TextField
          label="Clinic ID"
          onChange={(event) =>
            (newSlot.clinicId = parseInt(event.target.value))
          }
        />
        <br />
        <Button
          variant="contained"
          color="success"
          onClick={() => dispatch(createSlotForDoctor(newSlot))}
        >
          Create Slot
        </Button>
      </FormControl>
    </Box>
  );
};
export default CreateSlotForm;
