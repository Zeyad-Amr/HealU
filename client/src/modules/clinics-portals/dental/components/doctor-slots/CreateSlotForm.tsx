import styles from "../form/form.module.css";
import CustomTextField from "../form/elements/CustomTextFiled";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { Slot, createSlotForDoctor } from "../../state/slices/slotsSlice";
import { CustomMultiSelect, CustomSelect } from "../form";
import { useState } from "react";

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

  // function needs for multiple select you need to make this for each multiple select
  const [selectedDay, setSelectedDay] = useState([]);
  const handleDayChange = (event: any) => {
    setSelectedDay(event.target.value);
    newSlot.weekDay = weekdaysMap[event.target.value].label;
  };
  return (
    <>
      <div className={styles.form}>
        <div>
          <CustomTextField
            label="Clinic ID"
            onChange={(event) =>
              (newSlot.clinicId = parseInt(event.target.value))
            }
          />
        </div>
        <div>
          <CustomTextField
            label="Time"
            onChange={(event) => (newSlot.time = event.target.value)}
          />
        </div>
        <div>
          <CustomSelect
            label="Week Day"
            options={weekdaysMap}
            onChange={handleDayChange}
          />
        </div>
        <button onClick={() => dispatch(createSlotForDoctor(newSlot))}>
          Create Slot
        </button>
      </div>
    </>
  );
};

export default CreateSlotForm;
