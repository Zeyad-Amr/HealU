import React, { useEffect } from "react";
import { useState } from "react";
import { DeviceState } from "./../../slices/pediatric-slice";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { borderRadius } from "@mui/system";
import { useAppDispatch } from "../../../../../core/store/index";
import { useSelector } from "react-redux";
import {
  fetchDevices,
  AddDevice,
  DeleteDevice,
  device,
} from "../../slices/pediatric-slice";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0fcbd3",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    borderRadius: "1.5rem",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DevicesTable = () => {
  const dispatch = useAppDispatch();
  const deviceState: DeviceState = useSelector((state: any) => state.devices);
  useEffect(() => {
    dispatch(fetchDevices(deviceState.AllDevices));
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700, maxWidth: 1100, margin: "auto" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Manufacturer</StyledTableCell>
              <StyledTableCell align="center">PurchaseDate</StyledTableCell>
              <StyledTableCell align="center">ExpiryDate</StyledTableCell>
              <StyledTableCell align="center">DeviceStatus</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deviceState.AllDevices == undefined
              ? null
              : deviceState.AllDevices.map((item: any) => (
                  <StyledTableRow key={item.DeviceID}>
                    <StyledTableCell component="th" scope="row">
                      {item.Device[0].DeviceName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.Device[0].DeviceType}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.Device[0].DeviceManufacturer}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.Device[0].PurchaseDate.slice(0, 10)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.Device[0].ExpiryDate.slice(0, 10)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.Device[0].DeviceStatus}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          dispatch(DeleteDevice(item.DeviceID));
                        }}
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DevicesTable;
