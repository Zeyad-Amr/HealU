import {
  Button,
  IconButton,
  Typography,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import Modal from "../modal";
import { StyledButton } from "../LowerComponets/shared";
import { addAppointment } from "../../slices/nutritionSlice";
import { useAppDispatch } from "../../../../../core/store";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const PM_AM = ["AM", "PM"];

const slots = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30"];

const AppointmentsHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    day: "",
    startTime: "",
    isPM: false,
  });

  const dispatch = useAppDispatch();

  const addAppointmentButtonHandler = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDayChange = (e: any) => {
    setFormData({
      ...formData,
      day: e.target.value,
    });
  };

  const handleStartTimeChange = (e: any) => {
    setFormData({
      ...formData,
      startTime: e.target.value,
    });
  };

  const handlPMTimeChange = (e: any) => {
    setFormData({
      ...formData,
      isPM: e.target.value === "PM",
    });
  };

  const createAppointment = () => {
    dispatch(
      addAppointment({
        patientId: "",
        patientName: "",
        time: formData.startTime + (formData.isPM ? "PM" : "AM"),
        id: Math.floor(Math.random() * 100),
      })
    );
  };

  const handleSaveButton = () => {
    createAppointment();
    handleCloseModal();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant={"h4"}
            sx={{
              fontWeight: 300,
              color: "gray",
            }}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </Typography>
        </Box>
        <Box>
          <Button
            variant={"contained"}
            color="primary"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "white",
              borderRadius: "0.6rem",
            }}
            onClick={addAppointmentButtonHandler}
          >
            <IconButton
              sx={{
                border: 1,
                marginRight: "0.5rem",
                color: "white",
              }}
            >
              <AddIcon fontSize={"small"} />
            </IconButton>
            <Typography>Add Appointment</Typography>
          </Button>
        </Box>
      </Box>

      {isModalOpen && (
        <Modal onClose={handleCloseModal} modalTitle={"Add Slot"}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ width: "100%", marginBottom: "2rem" }}>
              <InputLabel id="demo-simple-select-label">Day</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.day}
                label="Day"
                fullWidth
                onChange={handleDayChange}
              >
                {DAYS.map((day) => (
                  <MenuItem value={day}>{day}</MenuItem>
                ))}
              </Select>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ width: "65%" }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.startTime}
                  fullWidth
                  onChange={handleStartTimeChange}
                >
                  {slots.map((slot) => (
                    <MenuItem value={slot}>{slot}</MenuItem>
                  ))}
                </Select>
              </Box>

              <Box sx={{ width: "30%" }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.isPM ? "PM" : "AM"}
                  fullWidth
                  onChange={handlPMTimeChange}
                >
                  {PM_AM.map((pam) => (
                    <MenuItem value={pam}>{pam}</MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <StyledButton onClick={handleSaveButton}>Add</StyledButton>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default AppointmentsHeader;
