// CreateSlotModal.tsx
import React, { useState } from "react";
import {
  Box,
  Modal,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WeekDayPicker from "../../doctor-slots/WeekDayPicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import styles from "./CreateSlotModal.module.css"; // Import the CSS module

interface CreateSlotModalProps {
  open: boolean;
  onClose: () => void;
  onSlotCreate: (date: string, time: string) => void;
  weekDates: Date[];
}

interface TimeObject {
  $H: number;
  $m: number;
}

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

const CreateSlotModal: React.FC<CreateSlotModalProps> = ({
  open,
  onClose,
  onSlotCreate,
  weekDates,
}) => {
  const [selectedDay, setSelectedDay] = useState(0);

  const handleDayChange = (event: any) => {
    const selectedDayValue = event.target.value as number;
    setSelectedDay(selectedDayValue);
  };

  const handleCreateSlot = () => {
    const currentDate = new Date();
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + selectedDay
    );

    const timeObject = { $H: 12, $m: 0 };
    const formattedTime = formatTime(timeObject);

    const slotDateTime = `${
      selectedDate.toISOString().split("T")[0]
    } ${formattedTime}`;
    onSlotCreate(slotDateTime, formattedTime);

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
          <TimePicker label="Time" className={styles.timePicker} />
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
