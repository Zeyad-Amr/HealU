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

const CreateSlotForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedDay, setSelectedDay] = React.useState(0);
    const [newSlot, setNewSlot] = React.useState({
        doctorId: 13,
        clinicId: 5,
        time: "11:00",
        weekDay: "Sunday",
    });

    const handleTimeChange = (value: any) => {
        setNewSlot((prevSlot) => ({
            ...prevSlot,
            time: formatTime(value),
        }));
    };

    const handleDayChange = (event: any) => {
        const selectedDayValue = event.target.value as number;
        setSelectedDay(selectedDayValue);

        setNewSlot((prevSlot) => ({
            ...prevSlot,
            weekDay: weekdaysMap[selectedDayValue].label,
        }));
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
                <TimePicker label="Time" onChange={handleTimeChange} />
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
