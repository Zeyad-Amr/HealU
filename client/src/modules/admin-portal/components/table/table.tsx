import React, { useEffect, useState } from "react";
import { AnyAction, Dispatch } from "redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Doctor,
  deleteDoctor,
  getDoctors,
  getDoctorById,
} from "../../slices/doctor-slice";
import { makeStyles } from "@mui/styles";
import styles from "./table.module.css";
import { RootState } from "../../../clinics-portals/orthopedic/slices/combineReducers";
import { flexbox } from "@mui/system";
import { formActions } from "../../slices/form-slice";
export const useStyles = makeStyles({
  box: {
    "& table ": {
      width: "100%",
    },
  },
  containerA: {
    "& div": {
      width: "100%",
    },
    "& td": {
      fontSize: "28px",
      fontFamily: "Roboto",
    },
  },
});

const TableComponent = () => {
  const classesX = useStyles();
  const doctors = useSelector(
    (state: any) => state.rootReducer.doctors.doctors
  );
  const isFormVisible = useSelector(
    (state: any) => state.rootReducer.form.isFormVisible
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!doctors.length) {
      console.log("Dispatching getDoctors");
      dispatch(getDoctors() as any);
    }
  }, [dispatch, doctors]);

  const handleDelete = async (doctorId: number | undefined) => {
    if (doctorId) {
      await dispatch(deleteDoctor(doctorId) as any);
    }
  };
  // const handleEdit = (
  //   doctorId: number,
  //   dispatch: Dispatch,
  //   doctors: Doctor[],
  // ): void => {
  //   const doctorToEdit = doctors.find((row) => row.id === doctorId);
  //   dispatch(formActions.setFormVisibility(!isFormVisible));
  //   dispatch(formActions.setIsEdit(true));

  //   if (!doctorToEdit) {
  //     return;
  //   }

  //   const { name, speciality, phone, email } = doctorToEdit;

  //   dispatch(
  //     editDoctor({
  //       doctorId,
  //       updatedData: { name, speciality, phone, email },
  //     }) as any
  //   );
  // };

  // const handleEdit = async (doctorId: number) => {
  //   const doctorToEdit = doctors.find((row) => row.id === doctorId);
  //   const { name, speciality, phone, email } = doctorToEdit;
  //   dispatch(formActions.setFormVisibility(!isFormVisible));
  //   dispatch(formActions.setIsEdit(true));
  // };
  // const [selectedDoctor, setSelectedDoctor] = useState<Partial<Doctor>>({});
  const handleEdit = async (doctorId: number | undefined) => {
    await dispatch(getDoctorById(doctorId) as any);
    dispatch(formActions.setFormVisibility(!isFormVisible));
    dispatch(formActions.setIsEdit(true));
    const selectedDoctor = doctors.find((row: any) => row.userId === doctorId);
    if (selectedDoctor) {
      dispatch(formActions.setEditedDoctor(selectedDoctor));
    }
    // dispatch(getDoctors()as any);
  };
  return (
    <Paper
      sx={{ width: "90%", overflow: "hidden" }}
      classes={{ root: classesX.containerA }}
    >
      <TableContainer
        className={styles.customTableContainer}
        classes={{ root: classesX.box }}
      >
        <Table style={{ width: "100%" }}>
          {doctors && (
            <TableBody>
              {doctors.map((row: Doctor, rowIndex: number) => (
                <TableRow key={rowIndex}>
                  <TableCell
                    key={`${rowIndex}-column1`}
                    className={styles.column1}
                  >
                    {row.userId}
                  </TableCell>

                  <TableCell
                    key={`${rowIndex}-column2`}
                    className={styles.column1}
                  >
                    {row.userName}
                  </TableCell>

                  <TableCell
                    key={`${rowIndex}-column3`}
                    className={styles.column3}
                  >
                    {row.firstName}
                  </TableCell>
                  <TableCell
                    key={`${rowIndex}-column4`}
                    className={styles.column3}
                  >
                    {row.lastName}
                  </TableCell>
                  <TableCell
                    key={`${rowIndex}-column5`}
                    className={styles.column3}
                  >
                    {row.specialization}
                  </TableCell>
                  <TableCell
                    key={`${rowIndex}-column6`}
                    className={styles.column3}
                  >
                    {row.phoneNumber}
                  </TableCell>
                  <TableCell
                    key={`${rowIndex}-column7`}
                    className={styles.column3}
                  >
                    {row.email}
                  </TableCell>
                  <TableCell
                    key={`${rowIndex}-column8`}
                    className={styles.column4}
                  >
                    {row.dateOfBirth}
                  </TableCell>
                  <TableCell
                    key={`${rowIndex}-column9`}
                    className={styles.column4}
                  >
                    {row.ssn}
                  </TableCell>

                  <TableCell
                    key={`${rowIndex}-column10`}
                    className={styles.column5}
                  >
                    <div
                      className={styles.addIcon}
                      onClick={() => handleDelete(row.userId)}
                    >
                      <DeleteIcon style={{ width: "38px", height: "38px" }} />
                    </div>
                  </TableCell>
                  <TableCell
                    key={`${rowIndex}-column11`}
                    className={styles.column6}
                  >
                    <div className={styles.addIcon}>
                      <BorderColorIcon
                        style={{ width: "38px", height: "38px" }}
                        onClick={() => handleEdit(row.userId)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Paper>
  );
};

// const isSlot = (obj: any): obj is Slot => "time" in obj && "date" in obj;
// const isSchedule = (obj: any): obj is Schedule =>
//   "scheduleId" in obj && "doctorName" in obj;

export default TableComponent;
