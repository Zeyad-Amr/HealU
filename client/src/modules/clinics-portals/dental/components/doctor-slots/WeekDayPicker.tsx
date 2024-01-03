import { InputLabel, MenuItem, Select } from "@mui/material";

const weekdaysMap = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

const WeekDayPicker = ({
  selectedDay,
  handleDayChange,
}: {
  selectedDay: number;
  handleDayChange: any;
}) => {
  return (
    <div>
      <InputLabel id="weekday-label">Week Day</InputLabel>
      <Select
        fullWidth
        labelId="weekday-label"
        value={selectedDay}
        label="Week Day"
        onChange={handleDayChange}
        style={{ background: "rgba(244, 244, 244, 1)" }}
      >
        {weekdaysMap.map((day) => (
          <MenuItem key={day.value} value={day.value}>
            {day.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default WeekDayPicker;
