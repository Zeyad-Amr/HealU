import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../slices/combineReducers";
import { getSchedules } from "../../slices/scheduleSlice";
import classes from "./schedulesTable.module.css";

export default function DoctorScheduleTable() {
  const dispatch = useDispatch();
  const schedules = useSelector(
    (state: RootState) => state.schedules.schedules
  );
  useEffect(() => {
    dispatch(getSchedules() as any);
  }, [dispatch]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "1836px", overflow: "hidden" }}>
      <TableContainer className={classes.customTableContainer}>
        <Table
          stickyHeader
          aria-label="sticky table"
          className={classes.customTable}
        >
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Doctor Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(schedules) &&
              schedules
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.scheduleId}
                  >
                    <TableCell>{row.patient.patientId}</TableCell>
                    <TableCell>{row.patient.patientName}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.doctorName}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={Array.isArray(schedules) ? schedules.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
