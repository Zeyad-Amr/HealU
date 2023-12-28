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
import TableComponent from "./schedulesTable";
import ClassNames from "../../pages/doctorSlot.module.css";

export default function ScheduleTable() {
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
    <div className={ClassNames.mainContainer}>
      <TableComponent schedules={schedules} />
    </div>
  );
}
