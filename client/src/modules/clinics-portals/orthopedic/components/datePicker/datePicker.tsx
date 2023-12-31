import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import classes from "./datePicker.module.css";
import styles from "../../components/form/addSlotForm.module.css";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { getSlots } from "../../slices/addSlotsSlice";
import { addSlotActions } from "../../slices/addSlotsSlice";
import { RootState } from "../../slices/combineReducers";
import { useSelector } from "react-redux";

// interface DateComponentProps {
//   isFormVisible: boolean;
// }

const DateComponent = () => {
  const [selectedDay, setSelectedDay] = React.useState<string | null>(null);
  const isVisible = useSelector((state: RootState) => state.slots.isVisible);
  const dispatch = useDispatch();
  const toggleFormVisibility = () => {
    if (isVisible) {
      dispatch(addSlotActions.setFormVisibility(!isVisible));
    }
  };
  const onchange = (date: string | null) => {
    if (date) {
      const dayName = dayjs(date).format("dddd").toString();
      setSelectedDay(dayName);
      dispatch(getSlots(dayName) as any);
      dispatch(addSlotActions.setSelectedDate(dayName));
    }
  };
  return (
    <div
      className={classes.datePickerWrapper}
      onClick={() => {
        toggleFormVisibility();
      }}
    >
      {selectedDay && (
        <label className={styles.labelElement}>{selectedDay}</label>
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker onChange={onchange} />
      </LocalizationProvider>
    </div>
  );
};

export default DateComponent;
