import { InputLabel, MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";

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
  function getNextOccurrenceOfSelectedDay() {
    const today = dayjs();
    const daysUntilNextSelectedDay = (selectedDay - today.day() + 7) % 7;
    const nextSelectedDay = today.add(daysUntilNextSelectedDay, "days");
    return nextSelectedDay.format("YYYY-MM-DD");
  }

  return (
    <div>
      <InputLabel id="weekday-label">Week Day</InputLabel>
      <Select
        fullWidth
        labelId="weekday-label"
        value={selectedDay}
        label="Week Day"
        onChange={handleDayChange}
      >
        {weekdaysMap.map((day) => (
          <MenuItem value={day.value}>{day.label}</MenuItem>
        ))}
      </Select>
      {getNextOccurrenceOfSelectedDay()}
    </div>
  );
};

export default WeekDayPicker;
