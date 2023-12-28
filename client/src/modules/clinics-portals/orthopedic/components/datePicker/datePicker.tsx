import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import classes from "./datePicker.module.css";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { getSlots } from "../../slices/addSlotsSlice";
import { addSlotActions } from "../../slices/addSlotsSlice";

const DateComponent = () => {
  const [selectedDay, setSelectedDay] = React.useState<string | null>(null);
  const dispatch = useDispatch();
  const onchange = (date: string | null) => {
    if (date) {
      const dayName = dayjs(date).format("dddd").toString();
      setSelectedDay(dayName);
      dispatch(getSlots(dayName) as any);
      dispatch(addSlotActions.setSelectedDate(dayName));
    }
  };
  return (
    <div className={classes.datePickerWrapper}>
      {selectedDay && (
        <div>
          <p>{selectedDay}</p>
        </div>
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker onChange={onchange} />
      </LocalizationProvider>
    </div>
  );
};

export default DateComponent;
