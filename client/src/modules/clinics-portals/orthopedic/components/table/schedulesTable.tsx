import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classes from "./schedulesTable.module.css";
import styles from "./schedulesTable.module.css";
import { getSlots } from "../../slices/addSlotsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../slices/combineReducers";

const TableComponent = () => {
  const slots = useSelector((state: RootState) => state.slots.slots);

  return (
    <Paper sx={{ width: "1836px", overflow: "hidden" }}>
      <TableContainer className={classes.customTableContainer}>
        <Table>
          <TableBody>
            {slots.map((row, rowIndex) => (
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
                  {row.date}
                </TableCell>
                <TableCell
                  key={`${rowIndex}-column3`}
                  className={styles.column3}
                >
                  {/* Additional content for column3 */}
                </TableCell>
                <TableCell
                  key={`${rowIndex}-column4`}
                  className={styles.column4}
                >
                  {/* Additional content for column4 */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableComponent;
