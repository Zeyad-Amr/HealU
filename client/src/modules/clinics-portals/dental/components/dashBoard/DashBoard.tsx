import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Stack,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const DashBoard = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
  })}, ${currentDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })}`;

  const rowData = [
    { time: '9:00 AM', patientName: 'John Doe' },
    { time: '10:30 AM', patientName: 'Jane Smith' },
    { time: '1:45 PM', patientName: 'Bob Johnson' },
    // Add more data as needed
  ];

  const textStyle: React.CSSProperties = {
    fontFamily: 'Roboto',
    fontWeight: 400,
  };

  return (
    <div style={{ height: '84vh', display: 'flex', flexDirection: 'column' }}>
      <TableContainer component={Paper} style={{ flex: 1, position: 'relative' }}>
        {/* Create New Slot Button */}
        <Button
          variant="contained"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: '16px',
            background: 'linear-gradient(285.17deg, #01B6B6 10.66%, #13D2DE 102.7%)',
            borderRadius: '15px', // Make the button circular
          }}
          startIcon={<AddCircleOutlineIcon />} // Use AddCircleOutlineIcon as the icon
        >
          Create New Slot
        </Button>

        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          style={{ ...textStyle }}
        >
          <Typography
            variant="body1"
            style={{
              ...textStyle,
              background: 'white',
              padding: '0px',
              borderRadius: '8px',
              color: 'rgba(139, 139, 139, 1)',
              fontSize: '1.5rem',
              margin: '16px',
            }}
          >
            {formattedDate}
          </Typography>
        </Stack>
        <Table style={{ borderCollapse: 'collapse' }}>
          <TableBody>
            {rowData.map((row, index) => (
              <TableRow key={index}>
                <TableCell style={{ border: 'none' }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    style={{ width: '100%' }}
                  >
                    <div style={{ flexGrow: 0, width: '100px' }}>
                      <Typography
                        variant="body1"
                        style={{
                          ...textStyle,
                          background: 'linear-gradient(285.17deg, #01B6B6 10.66%, #13D2DE 102.7%)',
                          padding: '8px',
                          borderRadius: '8px',
                          color: 'white',
                          textAlign: 'center',
                        }}
                      >
                        {row.time}
                      </Typography>
                    </div>
                    <Typography
                      variant="body1"
                      style={{
                        ...textStyle,
                        flexGrow: 1,
                        background: 'rgba(229, 229, 229, 1)',
                        padding: '8px',
                        borderRadius: '8px',
                      }}
                    >
                      {row.patientName}
                    </Typography>
                    <IconButton
                      aria-label="Cancel"
                      style={{
                        ...textStyle,
                        backgroundColor: 'rgba(85, 85, 85, 1)',
                        borderRadius: '15px',
                        color: 'white',
                        width: '50px',
                      }}
                    >
                      X
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      style={{
                        ...textStyle,
                        backgroundColor: 'rgba(184, 2, 2, 1)',
                        borderRadius: '15px',
                        color: 'white',
                        width: '50px',
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DashBoard;
