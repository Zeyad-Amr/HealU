import React, { useState, useRef, SetStateAction } from "react";
import styles from "./addSlotForm.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import classes from "../button/button.module.css";
import ButtonComponent from "../button/button";
import { useDispatch } from "react-redux";
import Slot, { addSlotActions } from "../../slices/addSlotsSlice";
import { getSlots } from "../../slices/addSlotsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../slices/combineReducers";
import { Dispatch } from "react";
import { addSlot } from "../../slices/addSlotsSlice";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

const orthoId = 2;
const doctorId = 13;

export const useStyles = makeStyles({
  textField: {
    width: "591px",
    height: "215px",
    "& input": {
      width: "591px",
      height: "200px",
      backgroundColor: " #F4F4F4 ",
      fontSize: "40px",
    },
  },
  menuItem: {
    fontSize: "40px",
    "& div": {
      backgroundColor: " #F4F4F4 ",
      fontFamily: "Roboto !important",
      fontSize: "32px !important",
      letterSpacing: "0em",
      textAlign: "left",
      color: "black",
    },
    "& input": {
      backgroundColor: " #F4F4F4 ",
      fontFamily: "Roboto !important",
      fontSize: "32px !important",
      letterSpacing: "0em",
      textAlign: "left",
      color: "black",
    },
  },
});

const weekdays: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const AddSlotForm = ({
  isFormVisible,
  // toggleFormVisibility,
  onAddSlot,
  classStyle,
  formTitle,
  label1,
  div1Style,
  div2Style,
  div3Style,
  formStyle,
  submitButtonStyle,
  inputType,
  isIncluded,
  div4Style,
}: {
  isFormVisible: boolean;
  classStyle?: string;
  formTitle: string;
  label1: string;
  div1Style: string;
  div2Style: string;
  div3Style?: string;
  div4Style?: string;
  formStyle: string;
  onAddSlot?: boolean;
  submitButtonStyle: string;
  inputType: "select" | "text"; // Added inputType prop
  isIncluded: boolean;
}) => {
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [error, setError] = useState({ date: "", time: "", period: "" });
  const [time, setTime] = useState<string | null>(null);
  const [period, setPeriod] = useState<string | null>(null);
  const slots = useSelector((state: RootState) => state.slots.slots);
  const selectedDate = useSelector(
    (state: RootState) => state.slots.selectedDate
  );
  const isVisible = useSelector((state: RootState) => state.slots.isVisible);
  const add = (weekDay: string) => {
    let generatedId = slots.length + 1;
    const existingSlot = slots.find(
      (slot) => slot.weekDay === weekDay && slot.time === time
    );
    const isIdExists = slots.some((slot) => slot._id);
    if (isIdExists) {
      generatedId = generatedId + 1;
    }
    if (existingSlot) {
      setError((prevError) => ({
        ...prevError,
        date: "Slot already exists for this time.",
      }));
      return;
    }
    const data: Slot = {
      doctorId: 20,
      clinicId: 2,
      weekDay,
      time,
    };
    if (selectedDate === selectedDay) {
      dispatch(getSlots(selectedDate) as any);
    }

    dispatch(addSlot(data) as any);
  };

  const classesM = useStyles();

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 12; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        options.push({
          label: `${hour % 12 === 0 ? 12 : hour}:${
            minute === 0 ? "00" : minute
          }`,
          value: `${hour % 12 === 0 ? 12 : hour}:${
            minute === 0 ? "00" : minute
          }`,
          period: hour < 12 ? "AM" : "PM",
        });
      }
    }
    return options;
  };
  const timeOptions = generateTimeOptions();

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === " " || event.target.value === null) {
      setError((prevError) => ({ ...prevError, date: "Please select a day" }));
    } else {
      setError((prevError) => ({ ...prevError, date: "" }));
      setSelectedDay(event.target.value);
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "" || event.target.value === null) {
      setError((prevError) => ({ ...prevError, time: "Please select a time" }));
    } else {
      setError((prevError) => ({ ...prevError, time: "" }));
      setTime(event.target.value);
    }
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "AM" || value === "PM") {
      setError((prevError) => ({ ...prevError, period: "" }));
      setPeriod(value);
    } else {
      setError((prevError) => ({
        ...prevError,
        period: "Please select a Period",
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: Slot = {
      time: `${time}`,
      weekDay: selectedDay,
      clinicId: orthoId,
      doctorId: doctorId,
    };
    if (selectedDay === "" || time === null || period === null) {
      setError({
        date: !selectedDay ? "Please select a day" : "",
        time: !time ? "Please select a time" : "",
        period: !period ? "Please select a period" : "",
      });
      return;
    } else {
      setSelectedDay("");
      setTime(null);
      setPeriod(null);
    }
    onAddSlot && add(data.weekDay);
    console.log(error);
    if (error.date === "" && error.time === "" && error.period === "") {
      dispatch(addSlotActions.setFormVisibility(false));
    }
  };

  return isVisible ? (
    <form className={styles[formStyle as string]} onSubmit={handleSubmit}>
      <div className={styles.closeIcon}>
        <CloseIcon
          onClick={() => dispatch(addSlotActions.setFormVisibility(false))}
          style={{ width: "30px", height: "30px" }}
        />
      </div>
      <h2 className={styles.textElement}>{formTitle}</h2>
      <Box>
        <div className={styles[div1Style as string]}>
          <label className={styles.labelElement}>{label1}</label>
          {inputType === "select" ? (
            <TextField
              id="doctorDay"
              select
              className={styles.textField}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleDayChange(e)
              }
              classes={{ root: classesM.menuItem }}
              value={selectedDay}
              helperText={error.date}
            >
              {weekdays.map((date) => (
                <MenuItem key={date} value={date} className={styles.menuItem}>
                  {date}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              id="doctorDay"
              className={styles.textField}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleDayChange(e)
              }
              classes={{ root: classesM.menuItem }}
              helperText={error.date}
              value={selectedDay}
            />
          )}
        </div>
        <div className={styles.prescriptionForm_div}>
          {isIncluded && (
            <div className={styles[div3Style as string]}>
              <label className={styles.labelElement}>Dose</label>
              <TextField
                id="Dose"
                style={{ backgroundColor: "#F4F4F4" }}
                classes={{ root: classesM.menuItem }}
              />
            </div>
          )}
          <div className={styles[div2Style as string]}>
            <label className={styles.labelElement}>Time</label>
            {inputType === "select" ? (
              <TextField
                id="doctorTime"
                select
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleTimeChange(e)
                }
                value={time || ""}
                style={{
                  width: "248.5px ",
                  backgroundColor: " #F4F4F4 ",
                  color: "black",
                  fontFamily: "Roboto",
                  fontSize: "40px",
                }}
                classes={{ root: classesM.menuItem }}
                helperText={error.time}
              >
                {timeOptions.map((option) => (
                  <MenuItem
                    key={`${option.value}-${option.period}`}
                    value={option.value}
                    className={styles.menuItem}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                id="doctorTime"
                style={{
                  width: "248.5px ",
                  backgroundColor: " #F4F4F4 ",
                  color: "black",
                  fontFamily: "Roboto",
                  fontSize: "40px",
                }}
                classes={{ root: classesM.menuItem }}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleTimeChange(e)
                }
                helperText={error.time}
                value={time || ""}
              />
            )}
          </div>
          {inputType === "select" && (
            <TextField
              classes={{ root: classesM.menuItem }}
              id="doctorPeriod"
              select
              onChange={handlePeriodChange}
              style={{
                width: "170px",
                backgroundColor: " #F4F4F4 ",
                marginTop: "-80px",
                marginLeft: "60px",
                left: "calc(351.4px)",
                fontSize: "40px",
              }}
              value={period || ""}
              helperText={error.period}
            >
              {[" ", "AM", "PM"].map((period) => (
                <MenuItem
                  key={period}
                  value={period}
                  className={styles.menuItem}
                >
                  {period}
                </MenuItem>
              ))}
            </TextField>
          )}
        </div>
        {isIncluded && (
          <div className={styles[div4Style as string]}>
            <label className={styles.labelElement}>Notes</label>
            <TextField
              id="Notes"
              className={classesM.textField}
              classes={{ root: classesM.menuItem }}
            />
          </div>
        )}
      </Box>
      <div className={classes[submitButtonStyle as string]}>
        <ButtonComponent
          type="submit"
          classStyle="ButtonComponent"
          text="Create"
          color="white"
          fontSize="32px"
        />
      </div>
    </form>
  ) : null;
};

export default AddSlotForm;
