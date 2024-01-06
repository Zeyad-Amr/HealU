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
import { useSelector } from "react-redux";

interface DateComponentProps {
  admin?: boolean;
  onSelectDate?: (date: string) => void;
}

const DateComponent: React.FC<DateComponentProps> = ({
  admin,
  onSelectDate,
}) => {
  const [selectedDay, setSelectedDay] = React.useState<string | null>(null);
  const isVisible = useSelector((state: any) => state.rootReducer.isVisible);
  const dispatch = useDispatch();

  const toggleFormVisibility = () => {
    if (isVisible) {
      dispatch(addSlotActions.setFormVisibility(!isVisible));
    }
  };
  const handleAdminChange = (date: string | null) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      if (formattedDate) {
        if (onSelectDate) {
          onSelectDate(formattedDate);
        }
      }
    }
  };

  const handleRegularChange = (date: string | null) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      const dayName = dayjs(date).format("dddd").toString();
      setSelectedDay(dayName);
      dispatch(getSlots(formattedDate) as any);
      dispatch(addSlotActions.setSelectedDate(formattedDate));
    }
  };

  const onchange = (date: string | null) => {
    if (admin) {
      handleAdminChange(date);
    } else {
      handleRegularChange(date);
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
