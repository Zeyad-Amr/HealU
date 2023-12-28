import React, { useState, useRef, SetStateAction } from "react";
import styles from "./addSlotForm.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import classes from "../button/button.module.css";
import ButtonComponent from "../button/button";
import { useDispatch } from "react-redux";
import Slot from "../../slices/addSlotsSlice";
import { getSlots } from "../../slices/addSlotsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../slices/combineReducers";
import { Dispatch } from "react";
import { addSlot } from "../../slices/addSlotsSlice";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  textField: {
    width: "591px",
    height: "215px",
    "& input": {
      width: "591px",
      height: "200px",
      backgroundColor: " #F4F4F4 ",
    },
  },
});

const weekdays: string[] = [
  " ",
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
  toggleFormVisibility,
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
  toggleFormVisibility: Dispatch<SetStateAction<boolean>>;
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
  const [selectedDay, setSelectedDay] = useState<string>(" ");
  const [time, setTime] = useState<string | null>(null);
  const [period, setPeriod] = useState<string | null>(null);
  const selectedDate = useSelector(
    (state: RootState) => state.slots.selectedDate
  );
  const add = (date: string) => {
    const data: Slot = {
      time: `${time} ${period}`,
      date: date,
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
    setSelectedDay(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "AM" || value === "PM") {
      setPeriod(value);
    } else {
      console.error("Invalid period value");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: Slot = {
      time: `${time} ${period}`,
      date: selectedDay,
    };
    onAddSlot && add(data.date);
    toggleFormVisibility(false);
  };

  return isFormVisible ? (
    <form className={styles[formStyle as string]} onSubmit={handleSubmit}>
      <h2 className={styles.textElement}>{formTitle}</h2>
      <Box>
        <div className={styles[div1Style as string]}>
          <label className={styles.labelElement}>{label1}</label>
          {inputType === "select" ? (
            <TextField
              id="doctorDay"
              select
              className={styles.textField}
              onChange={handleDayChange}
              value={selectedDay}
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
              onChange={handleDayChange}
              value={selectedDay}
            />
          )}
        </div>
        {isIncluded && (
          <div className={styles[div3Style as string]}>
            <label className={styles.labelElement}>Dose</label>
            <TextField id="Dose" style={{ backgroundColor: "#F4F4F4" }} />
          </div>
        )}
        <div className={styles[div2Style as string]}>
          <label className={styles.labelElement}>Time</label>
          {inputType === "select" ? (
            <TextField
              id="doctorTime"
              select
              onChange={handleTimeChange}
              value={time || ""}
              style={{
                width: "248.5px ",
                backgroundColor: " #F4F4F4 ",
                color: "black",
                fontFamily: "Roboto",
                fontSize: "40px",
              }}
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
              onChange={handleTimeChange}
              value={time || ""}
            />
          )}
          {inputType === "select" && (
            <TextField
              id="doctorPeriod"
              select
              onChange={handlePeriodChange}
              style={{
                width: "170px",
                backgroundColor: " #F4F4F4 ",
                marginTop: "-55px",
                marginLeft: "60px",
                left: "calc(351.4px)",
              }}
              value={period || ""}
            >
              {["AM", "PM"].map((period) => (
                <MenuItem key={period} value={period}>
                  {period}
                </MenuItem>
              ))}
            </TextField>
          )}
        </div>
        {isIncluded && (
          <div className={styles[div4Style as string]}>
            <label className={styles.labelElement}>Notes</label>
            <TextField id="Notes" className={classesM.textField} />
          </div>
        )}
      </Box>
      <div className={classes[submitButtonStyle as string]}>
        <ButtonComponent
          type="submit"
          classStyle="ButtonComponent"
          text="Create"
        />
      </div>
    </form>
  ) : null;
};

export default AddSlotForm;
