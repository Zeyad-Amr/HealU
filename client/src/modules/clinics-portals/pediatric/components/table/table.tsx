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

const DevicesTable = (props: any) => {
  const [selectedDevices, setSelectedDevices] = useState<DeviceState>(
    {} as DeviceState
  );
  useEffect(() => {
    setSelectedDevices(props.data);
  }, [props.data]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700, maxWidth: 1100, margin: "auto" }}
          aria-label="customized table"
        >
          <TableHead >
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Manufacturer</StyledTableCell>
              <StyledTableCell align="center">PurchaseDate</StyledTableCell>
              <StyledTableCell align="center">ExpiryDate</StyledTableCell>
              <StyledTableCell align="center">DeviceStatus</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedDevices.AllDevices == undefined
              ? null
              : selectedDevices.AllDevices.map((item: any) => (
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
                      {item.Device[0].PurchaseDate}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.Device[0].ExpiryDate}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.Device[0].DeviceStatus}
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
