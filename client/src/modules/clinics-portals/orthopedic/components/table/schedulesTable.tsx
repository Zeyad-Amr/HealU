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
import { useNavigate, useParams } from "react-router-dom";

const useStyles = makeStyles({
  box: {
    "& table ": {
      width: "100%",
    },
  },
  containerA: {
    "& div": {
      width: "100%",
    },
  },
});

const TableComponent = ({ schedules }: { schedules: Slot[] }) => {
  const params = useParams();
  const navigate = useNavigate();
  const classesX = useStyles();

  const date = useSelector(
    (state: any) => state.rootReducer.slots.selectedDate
  );

  const dispatch = useDispatch();
  const handleDelete = async (slotId: string | undefined) => {
    if (slotId) {
      await dispatch(deleteSlot(slotId) as any);
    }
    dispatch(getSlots(date) as any);
  };
  // const handleClearAppoinment = async (dateId: string, date: string) => {
  //   dispatch(updateSlot(parseInt(dateId)) as any);
  // };
  const handlePreview = () => {
    console.log("Preview");
  };

  return (
    <>
      {schedules.length !== 0 && (
        <Paper
          sx={{ width: "90%", overflow: "hidden" }}
          classes={{ root: classesX.containerA }}
        >
          <TableContainer
            className={styles.customTableContainer}
            classes={{ root: classesX.box }}
          >
            <Table style={{ width: "80%" }}>
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
                      <div>{row.patientFirstName}</div>
                    </TableCell>
                    <TableCell
                      key={`${rowIndex}-column3`}
                      className={styles.column3}
                    >
                      <div
                        onClick={() => {
                          // if (row.appointmentObject?.patient?.userId) {
                          //   handleClearAppoinment(row.appointmentObject.patient.userId, row.weekDay);
                          // }
                        }}
                        className={styles.addIcon}
                        style={{ justifyContent: "center", display: "flex" }}
                      >
                        <ClearIcon style={{ width: "38px", height: "38px" }} />
                      </div>
                    </TableCell>
                    <TableCell
                      key={`${rowIndex}-column4`}
                      className={styles.column4}
                    >
                      <div
                        onClick={() => {
                          handleDelete(row.slotId);
                          console.log(row.slotId);
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
                          if (row.patientId !== undefined) {
                            navigate(
                              `/clinic/orthopedic/examination/${row.patientId}`
                            );
                          }
                        }}
                        className={styles.addIcon}
                        style={{ justifyContent: "center", display: "flex" }}
                      >
                        <PreviewIcon
                          style={{ width: "38px", height: "38px" }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
};

// const isSlot = (obj: any): obj is Slot => "time" in obj && "date" in obj;
// const isSchedule = (obj: any): obj is Schedule =>
//   "scheduleId" in obj && "doctorName" in obj;

export default TableComponent;
