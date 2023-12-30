// DashBoard.tsx
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Stack,
  Typography,
  IconButton,
  Button,
  Modal,
  Box,
  MenuItem,
  Menu,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateSlotModal from "./popUP/CreateSlotModal";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import styles from "./DashBoard.module.css"; // Import the CSS module

interface Patient {
  time: string;
  patientName: string;
  patientID: number;
}

interface DashBoardProps {
  // Other props if needed
}

const DashBoard: React.FC<DashBoardProps> = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString()
  );
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [showCreateSlotModal, setShowCreateSlotModal] =
    useState<boolean>(false);

  const getWeekDates = () => {
    const currentDate = new Date(selectedDate);
    const currentDay = currentDate.getDay();
    const diff =
      currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 0);
    const startDate = new Date(currentDate.setDate(diff));
    const endDate = new Date(currentDate.setDate(diff + 6));
    return { startDate, endDate };
  };

  const generateWeekDates = () => {
    const { startDate, endDate } = getWeekDates();
    const weekDates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      weekDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return weekDates;
  };

  const formatDateString = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const weekDates = generateWeekDates();

  const rowData: Patient[] = [
    { time: "9:00 AM", patientName: "John Doe", patientID: 1 },
    { time: "10:30 AM", patientName: "Jane Smith", patientID: 2 },
    { time: "1:45 PM", patientName: "Bob Johnson", patientID: 3 },
    // Add more data as needed
  ];

  const handlePatientNameClick = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleCreateSlotClick = () => {
    setShowCreateSlotModal(true);
  };

  const handleCreateSlotModalClose = () => {
    setShowCreateSlotModal(false);
  };

  return (
    <div className={styles.dashboardContainer}>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <div className={styles.createSlotButtonContainer}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            className={styles.textStyle}
          >
            {/* Customized Date Selection */}
            <div className={styles.dateSelection} onClick={handleMenuOpen}>
              {formatDateString(new Date(selectedDate))}
            </div>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              className={styles.menu}
            >
              {weekDates.map((date) => (
                <MenuItem
                  key={date.toISOString()}
                  value={date.toISOString()}
                  onClick={() => {
                    setSelectedDate(date.toISOString());
                    handleMenuClose();
                  }}
                >
                  {formatDateString(date)}
                </MenuItem>
              ))}
            </Menu>
          </Stack>

          <Button
            variant="contained"
            className={styles.createSlotButton}
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleCreateSlotClick}
          >
            Create New Slot
          </Button>
        </div>

        <Table className={styles.table}>
          <TableBody>
            {rowData.map((row, index) => (
              <TableRow key={index}>
                <TableCell className={styles.tableCell}>
                  <Stack direction="row" spacing={2} style={{ width: "100%" }}>
                    <div className={styles.timeCell}>
                      <Typography
                        variant="body1"
                        className={styles.timeTextStyle}
                      >
                        {row.time}
                      </Typography>
                    </div>
                    <Typography
                      variant="body1"
                      className={styles.patientName}
                      onClick={() => handlePatientNameClick(row)}
                    >
                      {row.patientName}
                    </Typography>
                    <IconButton
                      aria-label="Cancel"
                      className={styles.cancelButton}
                    >
                      X
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      className={styles.deleteIcon}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for displaying patient details */}
      <Modal open={Boolean(selectedPatient)} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" component="div">
            Patient Details
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px" }}>
            Patient ID: {selectedPatient?.patientID}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px" }}>
            {/* Add more patient details as needed */}
          </Typography>
        </Box>
      </Modal>

      {/* Modal for creating a new slot */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CreateSlotModal
          open={showCreateSlotModal}
          onClose={handleCreateSlotModalClose}
          onSlotCreate={(date, time) =>
            console.log("Slot created:", date, time)
          }
          weekDates={weekDates}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DashBoard;
