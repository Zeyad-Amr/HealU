import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface Appointment {
  doctorId: number;
  patientId: number;
  date: string;
  time: string;
  patientHistory: string;
}

function createData(
  doctorId: number,
  patientId: number,
  date: string,
  time: string,
  patientHistory: string,
): Appointment {
  return {
    doctorId,
    patientId,
    date,
    time,
    patientHistory,
  };
}

function Row(props: { row: Appointment }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.doctorId}</TableCell>
        <TableCell>{row.patientId}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.time}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Patient History
              </Typography>
              <Typography>{row.patientHistory}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows: Appointment[] = [
  createData(1, 101, '2023-01-01', '10:00 AM', 'Patient history for appointment 1...'),
  createData(2, 102, '2023-01-02', '11:30 AM', 'Patient history for appointment 2...'),
  // Add more appointment data as needed
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Doctor ID</TableCell>
            <TableCell>Patient ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.doctorId} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}