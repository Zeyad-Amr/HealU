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



import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  box: {
    "& table ": {
      width: "80%",
    },
  },
  containerA:{
    "& div":{
      width : "100%",

    },
  }
});

const TableComponent = () => {

  const classesX = useStyles();
  const slots = useSelector((state: RootState) => state.slots.slots);

  return (
    <Paper sx={{ width: "1836px", overflow: "hidden" }} classes={{ root: classesX.containerA}}>
      <TableContainer className={classes.customTableContainer} classes={{ root: classesX.box }} >
        <Table >

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
