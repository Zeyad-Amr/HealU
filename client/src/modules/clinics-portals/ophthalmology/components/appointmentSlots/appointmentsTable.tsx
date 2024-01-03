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
import "./appointmentsTable.css";
import api from "../../../../../core/api/api";

const initialAppointments = [
  { time: "09:00 ", patientName: "bassma", amOrPm: "am" },
  { time: "11:00 ", patientName: "nada", amOrPm: "am" },
  { time: "12:00 ", patientName: "", amOrPm: "am" },
  { time: "14:00 ", patientName: "salma", amOrPm: "pm" },
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
    day: "Sunday",
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
    console.log("HANDLE");
    setAppointments([...appointments, { ...newAppointment }]);
    setNewAppointment({
      patientName: "",
      time: "",
      amOrPm: "am",
      day: "Sunday",
    });
    const postObj = {
      weekDay: newAppointment.day,
      time: newAppointment.time,
    };
    console.log("post object ", postObj);
    api
      .post("/data/slots", postObj)
      .then((res) => console.log("CREATE RESPONSE ", res));
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

  const formatDate = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSelectDate = (dateValue: any) => {
    const selectedDate = new Date(dateValue.toString());
    setSelectedDate(selectedDate);
    const formattedDate = formatDate(selectedDate);
    console.log(formattedDate);
    api
      .get(`/data/slots/${formattedDate}`)
      .then((res) => console.log("RESSS", res));
    handleCloseDateDialog();
  };

  return (
    <Box className="appointment-container">
      <Typography variant="h2">Doctor's slots and appointments</Typography>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="header-cell">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    aria-label="select-date"
                    onClick={handleOpenDateDialog}
                    className="date-icon"
                    style={{
                      background:
                        "linear-gradient(285deg, #01b6b6 10.66%, #13d2de 102.7%)",
                      color: "white",
                      fontSize: "10px",
                      padding: "5px",
                      marginRight: "8px",
                    }}
                  >
                    <DateRangeIcon />
                  </IconButton>

                  <Typography variant="body1" className="header-text">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </Typography>
                </div>
              </TableCell>

              <TableCell className="header-cell">
                <div style={{ display: "flex", alignItems: "center" }}></div>
              </TableCell>
              <TableCell align="right" className="header-cell">
                <Button
                  className="gradient-button"
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
                <TableCell className="time-cell">
                  {appointment.time} {appointment.amOrPm}
                </TableCell>
                <TableCell
                  className={`patient-cell ${
                    appointment.patientName ? "occupied" : "available"
                  }`}
                >
                  {appointment.patientName || "Available"}
                </TableCell>
                <TableCell align="right" className="header-cell">
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
            className="MuiDialogContent-select "
          >
            <MenuItem value="Sunday">Sunday</MenuItem>
            <MenuItem value="Monday">Monday</MenuItem>
            <MenuItem value="Tuesday">Tuesday</MenuItem>
            <MenuItem value="Wednesday">Wednesday</MenuItem>
            <MenuItem value="Thursday">Thursday</MenuItem>
            <MenuItem value="Friday">Friday</MenuItem>
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
          <Button
            className="gradient-button"
            onClick={handleCloseDialogs}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            className="gradient-button"
            onClick={handleSaveAdd}
            color="primary"
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
            value={formatDate(selectedDate)}
            onChange={(e) => handleSelectDate(e.target.value)}
            className="MuiDialogContent-select"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDateDialog}
            color="secondary"
            className="gradient-button"
          >
            Cancel
          </Button>
          <Button
            className="gradient-button"
            onClick={() => handleSelectDate(selectedDate.toString())}
            color="primary"
          >
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
