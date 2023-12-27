// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// interface Appointment {
//   doctorId: number;
//   patientId: number;
//   date: string;
//   time: string;
//   patientHistory: string;
// }

// function createData(
//   doctorId: number,
//   patientId: number,
//   date: string,
//   time: string,
//   patientHistory: string,
// ): Appointment {
//   return {
//     doctorId,
//     patientId,
//     date,
//     time,
//     patientHistory,
//   };
// }

// function Row(props: { row: Appointment }) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);

//   return (
//     <React.Fragment>
//       <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
//         <TableCell>
//           <IconButton
//             aria-label="expand row"
//             size="small"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell>{row.doctorId}</TableCell>
//         <TableCell>{row.patientId}</TableCell>
//         <TableCell>{row.date}</TableCell>
//         <TableCell>{row.time}</TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Typography variant="h6" gutterBottom component="div">
//                 Patient History
//               </Typography>
//               <Typography>{row.patientHistory}</Typography>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }

// const rows: Appointment[] = [
//   createData(1, 101, '2023-01-01', '10:00 AM', 'Patient history for appointment 1...'),
//   createData(2, 102, '2023-01-02', '11:30 AM', 'Patient history for appointment 2...'),
//   // Add more appointment data as needed
// ];

// export default function CollapsibleTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label="collapsible table">
//         <TableHead>
//           <TableRow>
//             <TableCell />
//             <TableCell>Doctor ID</TableCell>
//             <TableCell>Patient ID</TableCell>
//             <TableCell>Date</TableCell>
//             <TableCell>Time</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <Row key={row.doctorId} row={row} />
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

const OphthalmologyForm = () => {
  const [openPopup, setOpenPopup] = useState({
    prescription: false,
    tests: false,
    services: false,
  });

  const [patientData] = useState({
    patientId: '12345',
    name: 'Mariam',
    age: '22',
    weight: '75Kg',
    height: '175cm',
  });

  const [prescriptionData, setPrescriptionData] = useState({
    drugName: '',
    dosage: '',
    time: '',
  });

  const [medicalHistory, setMedicalHistory] = useState({
    illnesses: ['Flu', 'Allergies'],
    drugs: ['Panadol', 'Zexromax'],
    medicalTests: ['Test 1', 'Test 2'],
    operations: [], // Empty for now
  });

  const [testName, setTestName] = useState('');
  const [prescriptionCard, setPrescriptionCard] = useState('');
  const [testCard, setTestCard] = useState('');

  const [diagnosis, setDiagnosis] = useState({
    title: 'Diagnosis 1',
    info: 'Diagnosis 1 info',
  });

  const [editDiagnosis, setEditDiagnosis] = useState('');
  const [showEditDiagnosis, setShowEditDiagnosis] = useState(false);

  const handleOpenPopup = (type:any) => {
    setOpenPopup((prevState) => ({
      ...prevState,
      [type]: true,
    }));
  };

  const handleClosePopup = (type:any) => {
    setOpenPopup((prevState) => ({
      ...prevState,
      [type]: false,
    }));
  };

  const handlePrescriptionSubmit = () => {
    if (prescriptionData.drugName && prescriptionData.dosage && prescriptionData.time) {
      const newPrescription = `Prescription: ${prescriptionData.drugName}, Dosage: ${prescriptionData.dosage}, Time: ${prescriptionData.time}`;
      setPrescriptionData({ drugName: '', dosage: '', time: '' });
      setOpenPopup((prevState) => ({ ...prevState, prescription: false }));
      setPrescriptionCard(newPrescription);
    }
  };

  const handleTestSubmit = () => {
    if (testName) {
      setOpenPopup((prevState) => ({ ...prevState, tests: false }));
      setTestCard(`Test: ${testName}`);
      setTestName('');
    }
  };

  const handleEditDiagnosis = () => {
    setShowEditDiagnosis(true);
    setEditDiagnosis(diagnosis.info);
  };

  const handleSaveDiagnosis = () => {
    setDiagnosis({ ...diagnosis, info: editDiagnosis });
    setShowEditDiagnosis(false);
  };
  const handleEditPrescription = () => {
    setOpenPopup((prevState) => ({ ...prevState, prescription: true }));
  };

  const handleEditTest = () => {
    setOpenPopup((prevState) => ({ ...prevState, tests: true }));
  };

  return (
    <Grid container spacing={2}>
      {/* Left Column for Personal Data */}
      <Grid item xs={6}>
        <Paper   style={{
            height: '150px',
            backgroundColor: '#62C7CE',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '16px',
          }}  elevation={3} >
          <Typography variant="h6">Patient Information</Typography>
          <Typography><strong>Patient ID:</strong> {patientData.patientId}</Typography>
          <Typography><strong>Name:</strong> {patientData.name}</Typography>
          <Typography><strong>Age:</strong> {patientData.age}</Typography>
          <Typography><strong>Weight:</strong> {patientData.weight}</Typography>
          <Typography><strong>Height:</strong> {patientData.height}</Typography>
        </Paper>
      </Grid>

      {/* Right Column for Medical History */}
      <Grid item xs={6}>
        <Paper       style={{
            height: '150px',
            backgroundColor: '#1F4849',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '16px',
          }} elevation={3}>
          <Typography variant="h6">Medical History</Typography>
          <Grid container spacing={2}>
            {/* Column 1: Illnesses */}
            <Grid item xs={3}>
              {medicalHistory.illnesses.map((illness, index) => (
                <Typography key={index}>{illness}</Typography>
              ))}
            </Grid>
            {/* Column 2: Drugs */}
            <Grid item xs={3}>
              {medicalHistory.drugs.map((drug, index) => (
                <Typography key={index}>{drug}</Typography>
              ))}
            </Grid>
            {/* Column 3: Medical Tests */}
            <Grid item xs={3}>
              {medicalHistory.medicalTests.map((test, index) => (
                <Typography key={index}>{test}</Typography>
              ))}
            </Grid>
            {/* Column 4: Operations */}
            <Grid item xs={3}>
              {medicalHistory.operations.map((operation, index) => (
                <Typography key={index}>{operation}</Typography>
              ))}
            </Grid>
          </Grid>
                  </Paper>
      </Grid>

      {/* Diagnosis Section */}
      <Grid item xs={12}>
        <Typography variant="h6">Diagnosis</Typography>
        <Paper           className="diagnosis-card"
          style={{
            backgroundColor: '#F4F4F4',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '16px',}}
        >
          <Typography variant="subtitle1">{diagnosis.title}</Typography>
          {showEditDiagnosis ? (
            <>
              <TextField
                label="Edit Diagnosis"
                value={editDiagnosis}
                onChange={(e) => setEditDiagnosis(e.target.value)}
                fullWidth
              />
              <Button variant="contained" color="primary" onClick={handleSaveDiagnosis}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body2">{diagnosis.info}</Typography>
              <Button variant="outlined" onClick={handleEditDiagnosis}>
                Edit
              </Button>
            </>
          )}
        </Paper>
      </Grid>

      {/* Add Prescription Section */}
      <Grid item xs={4}>
        <Paper  className="add-section"
          elevation={3}
          style={{
            backgroundColor: '#C3C3C3',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '16px',
          }}>
          <Typography variant="h6">Add Prescription</Typography>
          <Button onClick={() => handleOpenPopup('prescription')}>Add Prescription</Button>
          <Typography>{prescriptionCard}</Typography>
          {prescriptionCard && (
            <Button variant="outlined" onClick={handleEditPrescription}>
              Edit
            </Button>
          )}
        </Paper>
        {/* Prescription Popup */}
        <Modal open={openPopup.prescription} onClose={() => handleClosePopup('prescription')}>
          <Paper className="popup">
            <Typography variant="h6">Add Prescription</Typography>
            <TextField
              label="Drug Name"
              value={prescriptionData.drugName}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, drugName: e.target.value })}
              fullWidth
            />
            <TextField
              label="Dosage"
              value={prescriptionData.dosage}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, dosage: e.target.value })}
              fullWidth
            />
            <TextField
              label="Time"
              value={prescriptionData.time}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, time: e.target.value })}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handlePrescriptionSubmit}>
              Save Prescription
            </Button>
          </Paper>
        </Modal>
          </Grid>

      {/* Add Test Section */}
      <Grid item xs={4}>
        <Paper   className="add-section"
          elevation={3}
          style={{
            backgroundColor: '#C3C3C3',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '16px',
          }}>
          <Typography variant="h6">Add Test</Typography>
          <Button onClick={() => handleOpenPopup('tests')}>Add Test</Button>
          <Typography>{testCard}</Typography>
          {testCard && (
            <Button variant="outlined" onClick={handleEditTest}>
              Edit
            </Button>
          )}
        </Paper>
        {/* Test Popup */}
    <Modal open={openPopup.tests} onClose={() => handleClosePopup('tests')}>
          <Paper className="popup">
            <Typography variant="h6">Add Test</Typography>
            <TextField
              label="Test Name"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleTestSubmit}>
              Save Test
            </Button>
          </Paper>
        </Modal>
              </Grid>

      {/* Add Services Section */}
      <Grid item xs={4}>
        <Paper           className="add-section"
          elevation={3}
          style={{
            backgroundColor: '#C3C3C3',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '16px'}}
            >
          <Typography variant="h6">Add Services</Typography>
          <Button onClick={() => handleOpenPopup('services')}>Select Services</Button>
        </Paper>
        {/* Services Popup */}
        <Modal open={openPopup.services} onClose={() => handleClosePopup('services')}>
          <Paper className="popup">
            <Typography variant="h6">Select Services</Typography>
            {/* Options for selecting services */}
            <Button variant="contained" color="primary" onClick={() => handleClosePopup('services')}>
              Close
            </Button>
          </Paper>
        </Modal>     
	 </Grid>
       </Grid>
  );
};

export default OphthalmologyForm;
