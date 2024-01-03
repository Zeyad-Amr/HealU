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
          <Typography variant="h6" style={{ fontFamily: 'Roboto', fontSize: '32px', fontWeight: 600, lineHeight: '38px', letterSpacing: '0em', textAlign: 'left' }}>
          Patient Information
        </Typography>
        <Typography style={{ fontFamily: 'Roboto', fontSize: '32px', fontWeight: 600, lineHeight: '38px', letterSpacing: '0em', textAlign: 'left' }}>
          <strong>Patient ID:</strong> {patientData.patientId}
        </Typography>
        <Typography style={{ fontFamily: 'Roboto', fontSize: '32px', fontWeight: 600, lineHeight: '38px', letterSpacing: '0em', textAlign: 'left' }}>
          <strong>Name:</strong> {patientData.name}
        </Typography>
        <Typography style={{ fontFamily: 'Roboto', fontSize: '32px', fontWeight: 600, lineHeight: '38px', letterSpacing: '0em', textAlign: 'left' }}>
          <strong>Age:</strong> {patientData.age}
        </Typography>
        <Typography style={{ fontFamily: 'Roboto', fontSize: '32px', fontWeight: 600, lineHeight: '38px', letterSpacing: '0em', textAlign: 'left' }}>
          <strong>Weight:</strong> {patientData.weight}
        </Typography>
        <Typography style={{ fontFamily: 'Roboto', fontSize: '32px', fontWeight: 600, lineHeight: '38px', letterSpacing: '0em', textAlign: 'left' }}>
          <strong>Height:</strong> {patientData.height}
        </Typography>
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
          <Typography variant="h6" style={{ fontFamily: 'Roboto', fontSize: '32px', fontWeight: 600, lineHeight: '38px', letterSpacing: '0em', textAlign: 'left' }}>
            Medical History
          </Typography>    
                <Grid container spacing={2}>
            {/* Column 1: Illnesses */}
            <Grid item xs={3}>
              {medicalHistory.illnesses.map((illness, index) => (
                <Typography key={index} style={{
                  fontFamily: 'Roboto',
                  fontSize: '25px',
                  fontWeight: 600,
                  lineHeight: '29px',
                  letterSpacing: '0em',
                  textAlign: 'left',
                }} >{illness}</Typography>
              ))}
            </Grid>
            {/* Column 2: Drugs */}
            <Grid item xs={3}>
              {medicalHistory.drugs.map((drug, index) => (
                <Typography key={index}
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '25px',
                  fontWeight: 600,
                  lineHeight: '29px',
                  letterSpacing: '0em',
                  textAlign: 'left',
                }}>{drug}</Typography>
              ))}
            </Grid>
            {/* Column 3: Medical Tests */}
            <Grid item xs={3}>
              {medicalHistory.medicalTests.map((test, index) => (
                <Typography key={index} style={{
                  fontFamily: 'Roboto',
                  fontSize: '25px',
                  fontWeight: 600,
                  lineHeight: '29px',
                  letterSpacing: '0em',
                  textAlign: 'left',
                }}>{test}</Typography>
              ))}
            </Grid>
            {/* Column 4: Operations */}
            <Grid item xs={3}>
              {medicalHistory.operations.map((operation, index) => (
                <Typography key={index} style={{
                  fontFamily: 'Roboto',
                  fontSize: '25px',
                  fontWeight: 600,
                  lineHeight: '29px',
                  letterSpacing: '0em',
                  textAlign: 'left',
                }}>{operation}</Typography>
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
