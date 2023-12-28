import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DateRangeIcon from "@mui/icons-material/DateRange";
import "./Appointments&Slotslist.css";

const initialAppointments = [
  { time: "09:00 AM", patientName: "bassma" },
  { time: "11:00 AM", patientName: "nada" },
  { time: "12:00 PM", patientName: "" },
  { time: "02:00 PM", patientName: "salma" },
];

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isDateDialogOpen, setDateDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    time: "",
    amOrPm: "am",
    day: "sunday",
  });

  const handleDeleteAppointment = (index: any) => {
    const updatedAppointments = [...appointments];
    updatedAppointments.splice(index, 1);
    setAppointments(updatedAppointments);
  };

  const handleAddAppointment = () => {
    setAddDialogOpen(true);
  };

  const handleSaveAdd = () => {
    console.log("Save new appointment:", newAppointment);
    setAppointments([...appointments, { ...newAppointment }]);
    setNewAppointment({
      patientName: "",
      time: "",
      amOrPm: "am",
      day: "sunday",
    });
    setAddDialogOpen(false);
  };

  const handleCloseDialogs = () => {
    setAddDialogOpen(false);
    setDateDialogOpen(false);
  };

  const handleClearSlot = (index: any) => {
    const updatedAppointments = [...appointments];
    updatedAppointments[index].patientName = "";
    setAppointments(updatedAppointments);
  };

  const handleOpenDateDialog = () => {
    setDateDialogOpen(true);
  };

  const handleCloseDateDialog = () => {
    setDateDialogOpen(false);
  };

  const handleSelectDate = (selectedDate: any) => {
    setSelectedDate(selectedDate);
    handleCloseDateDialog();
  };

  return (
    <Box className="appointment-container">
      <Typography variant="h5">Doctor's slots and appointments</Typography>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" className="header-cell">
                <Typography variant="body1" className="header-text">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </Typography>
                <IconButton
                  aria-label="select-date"
                  color="primary"
                  onClick={handleOpenDateDialog}
                  className="date-icon"
                >
                  <DateRangeIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right" className="header-cell">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleAddAppointment}
                >
                  Create New Slot
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment, index) => (
              <TableRow key={index}>
                <TableCell className="time-cell">{appointment.time}</TableCell>
                <TableCell
                  className={`patient-cell ${
                    appointment.patientName ? "occupied" : "available"
                  }`}
                  onClick={() =>
                    appointment.patientName && handleClearSlot(index)
                  }
                >
                  {appointment.patientName || "Available"}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="clear"
                    color="default"
                    onClick={() => handleClearSlot(index)}
                    disabled={!appointment.patientName}
                  >
                    <ClearIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => handleDeleteAppointment(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={isAddDialogOpen} onClose={handleCloseDialogs}>
        <DialogTitle>Create New Slot</DialogTitle>
        <DialogContent>
          <InputLabel>Select Day:</InputLabel>
          <Select
            value={newAppointment.day}
            onChange={(e) =>
              setNewAppointment({ ...newAppointment, day: e.target.value })
            }
            className="MuiDialogContent-select"
          >
            <MenuItem value="sunday">Sunday</MenuItem>
            <MenuItem value="monday">Monday</MenuItem>
            <MenuItem value="tuesday">Tuesday</MenuItem>
            <MenuItem value="wednesday">Wednesday</MenuItem>
            <MenuItem value="thursday">Thursday</MenuItem>
          </Select>
          <InputLabel>Select Time:</InputLabel>
          <div className="time-input-group">
            <TextField
              type="time"
              value={newAppointment.time}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, time: e.target.value })
              }
              className="MuiDialogContent-timeField"
            />
            <Select
              value={newAppointment.amOrPm}
              onChange={(e) =>
                setNewAppointment({
                  ...newAppointment,
                  amOrPm: e.target.value,
                })
              }
              className="MuiDialogContent-amPmSelect"
            >
              <MenuItem value="am">AM</MenuItem>
              <MenuItem value="pm">PM</MenuItem>
            </Select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveAdd}
            color="primary"
            className="create-button"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isDateDialogOpen} onClose={handleCloseDateDialog}>
        <DialogTitle>Select Date</DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={(e) => handleSelectDate(new Date(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDateDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleSelectDate(new Date())} color="primary">
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
