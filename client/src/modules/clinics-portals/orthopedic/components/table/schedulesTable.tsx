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
import PreviewIcon from "@mui/icons-material/Preview";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const classesX = useStyles();
  const slots = useSelector((state: RootState) => state.slots.slots);
  const dispatch = useDispatch();
  const handleDelete = async (dateId: number, date: string) => {
    dispatch(deleteSlot(dateId) as any);
  };
  const handleClearAppoinment = async (dateId: number, date: string) => {
    dispatch(updateSlot(dateId) as any);
  };
  const handlePreview = () => {
    console.log("Preview");
  };

  // useEffect(() => {
  //   dispatch(getSlots() as any);
  // }, [dispatch,slots]);

  return (
    <Paper
      sx={{ width: "220vh", overflow: "hidden" }}
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
                  <div
                    onClick={() => handleClearAppoinment(row.id, row.date)}
                    className={styles.addIcon}
                    style={{ justifyContent: "center", display: "flex" }}
                  >
                    <ClearIcon style={{ width: "38px", height: "38px" }} />
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
                        handleDelete(row.id, row.date);
                      }
                    }}
                    className={styles.addIcon}
                    style={{ justifyContent: "center", display: "flex" }}
                  >
                    <DeleteIcon style={{ width: "38px", height: "38px" }} />
                  </div>
                </TableCell>
                <TableCell
                  key={`${rowIndex}-column5`}
                  className={styles.column5}
                >
                  <div
                    onClick={() => {
                      if (row.time !== null) {
                        navigate(`/ExaminationScreen/${row.patient?.patientId}`);
                      }
                    }}
                    className={styles.addIcon}
                    style={{ justifyContent: "center", display: "flex" }}
                  >
                    <PreviewIcon style={{ width: "38px", height: "38px" }} />
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
