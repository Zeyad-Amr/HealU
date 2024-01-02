import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./schedulesTable.module.css";
import Slot, {
  deleteSlot,
  getSlots,
  updateSlot,
} from "../../slices/addSlotsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices/combineReducers";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  box: {
    "& table ": {
      width: "80%",
    },
  },
  containerA: {
    "& div": {
      width: "100%",
    },
  },
});

const TableComponent = ({ schedules }: { schedules: Slot[] }) => {
  const classesX = useStyles();
  // const slots = useSelector((state: RootState) => state.slots.slots);
  const dispatch = useDispatch();
  const handleDelete = async (dateId: number, date: string) => {
    await dispatch(deleteSlot(dateId) as any);
    dispatch(getSlots(date) as any);
  };
  const handleClearAppoinment = async (dateId: string, date: string) => {
    await dispatch(updateSlot(parseInt(dateId)) as any);
    dispatch(getSlots(date) as any);
  };
  

  return (
    <Paper
      sx={{ width: "1836px", overflow: "hidden" }}
      classes={{ root: classesX.containerA }}
    >
      <TableContainer
        className={styles.customTableContainer}
        classes={{ root: classesX.box }}
      >
        <Table>
          <TableBody>
            {schedules.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell
                  key={`${rowIndex}-column1`}
                  className={styles.column1}
                >
                  {row.time}
                </TableCell>
                <TableCell
                  key={`${rowIndex}-column2`}
                  className={styles.column2}
                >
                  <div>{row.patient?.patientName}</div>
                </TableCell>
                <TableCell
                  key={`${rowIndex}-column3`}
                  className={styles.column3}
                >
                  <div onClick={() => {if (row._id){ handleClearAppoinment(row._id, row.weekDay)}}}>
                    <ClearIcon className={styles.addIcon} />
                  </div>
                  {/* <div>{row.date}</div> */}
                </TableCell>
                <TableCell
                  key={`${rowIndex}-column4`}
                  className={styles.column4}
                >
                  <div
                    onClick={() => {
                      if (row.time !== null) {
                        handleDelete(row._id, row.weekDay);
                      }
                    }}
                  >
                    <DeleteIcon className={styles.addIcon} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

// const isSlot = (obj: any): obj is Slot => "time" in obj && "date" in obj;
// const isSchedule = (obj: any): obj is Schedule =>
//   "scheduleId" in obj && "doctorName" in obj;

export default TableComponent;
