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
import Schedule from "../../slices/scheduleSlice";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";

const TableComponent = ({ schedules }: { schedules: Schedule[] | Slot[] }) => {
  const slots = useSelector((state: RootState) => state.slots.slots);
  const dispatch = useDispatch();
  const handleDelete = async (dateId: number, date: string) => {
    await dispatch(deleteSlot(dateId) as any);
    dispatch(getSlots(date) as any);
  };
  const handleClearAppoinment = async (dateId: number, date: string) => {
    await dispatch(updateSlot(dateId) as any);
    dispatch(getSlots(date) as any);
  };

  return (
    <Paper sx={{ width: "1836px", overflow: "hidden" }}>
      <TableContainer className={styles.customTableContainer}>
        <Table>
          <TableBody>
            {schedules.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell
                  key={`${rowIndex}-column1`}
                  className={styles.column1}
                >
                  {isSlot(row) ? row.time : row.patient.patientName}
                </TableCell>
                <TableCell
                  key={`${rowIndex}-column2`}
                  className={styles.column2}
                >
                  {isSlot(row) && (
                    <>
                      <div>{row.patient?.patientName}</div>
                    </>
                  )}
                  {isSchedule(row) && (
                    <>
                      <div>{row.doctorName}</div>
                    </>
                  )}
                </TableCell>
                <TableCell
                  key={`${rowIndex}-column3`}
                  className={styles.column3}
                >
                  {isSlot(row) && (
                    <>
                      <div
                        onClick={() => handleClearAppoinment(row.id, row.date)}
                      >
                        <ClearIcon className={styles.addIcon} />
                      </div>
                    </>
                  )}
                  {isSchedule(row) && (
                    <>
                      <div>{row.date}</div>
                    </>
                  )}
                </TableCell>
                <TableCell
                  key={`${rowIndex}-column4`}
                  className={styles.column4}
                >
                  {isSlot(row) && (
                    <>
                      <div
                        onClick={() => {
                          if (row.time !== null) {
                            handleDelete(row.id, row.date);
                          }
                        }}
                      >
                        <DeleteIcon className={styles.addIcon} />
                      </div>
                    </>
                  )}
                  {isSchedule(row) && <></>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const isSlot = (obj: any): obj is Slot => "time" in obj && "date" in obj;
const isSchedule = (obj: any): obj is Schedule =>
  "scheduleId" in obj && "doctorName" in obj;

export default TableComponent;
