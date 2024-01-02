// CreateSlotModal.tsx
import React, { useState } from "react";
import { Box, Modal, Button, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WeekDayPicker from "../../doctor-slots/WeekDayPicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import styles from "./CreateSlotModal.module.css"; // Import the CSS module
import { openSnackbar } from "../../../state/slices/snackbarSlice";
import { createSlotForDoctor } from "../../../state/slices/slotsSlice";
import { useAppDispatch } from "../../../../../../core/store";

interface CreateSlotModalProps {
  open: boolean;
  onClose: () => void;
}

interface TimeObject {
  $H: number;
  $m: number;
}

const weekdaysMap = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

const formatTime = (timeObject: TimeObject) => {
  let hours = timeObject.$H.toString();

  if (timeObject.$H === 12) {
    hours = "12";
  } else {
    hours = hours.padStart(2, "0");
  }

  const minutes = timeObject.$m.toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const CreateSlotModal: React.FC<CreateSlotModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();

  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string>("10:00");

  const handleDayChange = (event: any) => {
    const selectedDayValue = event.target.value as number;
    setSelectedDay(selectedDayValue);
  };

  const handleTimeChange = (value: any) => {
    setSelectedTime(formatTime(value));
  };

  const createSlot = async (weekDay: string, time: string) => {
    await dispatch(
      createSlotForDoctor({
        time: time,
        weekDay: weekDay,
      })
    ).then((resultAction) => {
      dispatch(
        openSnackbar({
          message:
            resultAction.meta.requestStatus === "fulfilled"
              ? "Slot Created Successfully"
              : "Something Went Wrong! Please try again later",
          type:
            resultAction.meta.requestStatus === "fulfilled"
              ? "success"
              : "warning",
        })
      );
    });
  };

  const handleCreateSlot = () => {
    createSlot(weekdaysMap[selectedDay].label, selectedTime);

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modalContainer}>
        <div className={styles.createSlotHeader}>
          <span className={styles.createSlotText}>Create New Slot</span>

          {/* Close button in the top right */}
          <IconButton
            aria-label="Close"
            onClick={onClose}
            className={styles.close_btn}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <Stack spacing={2} width="100%">
          <WeekDayPicker
            selectedDay={selectedDay}
            handleDayChange={handleDayChange}
          />
          <TimePicker
            label="Time"
            onChange={handleTimeChange}
            className={styles.timePicker}
          />
        </Stack>

        <Button
          variant="contained"
          size="large"
          onClick={handleCreateSlot}
          style={{
            background:
              "linear-gradient(285.17deg, #01B6B6 10.66%, #13D2DE 102.7%)",
            borderRadius: "15px",
            marginTop: "16px",
            alignSelf: "center",
          }}
        >
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateSlotModal;
