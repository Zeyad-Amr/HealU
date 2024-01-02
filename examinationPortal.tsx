/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
    operations: ['Operation 1', 'Operation 2'], // Add new operations here
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
      <div style={{ padding: '50px' }}>
        <Grid container spacing={2}>
        {/* Left Column for Personal Data */}

          <Grid item xs={6}>
            <Paper   style={{
                height: '150px',
                backgroundColor: '#13D2DE',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontFamily: 'Roboto, sans-serif', // Font family: Roboto
                fontSize: '32px', // Font size: 32px
                fontWeight: 600, // Font weight: 600 (bold)
                lineHeight: '38px', // Line height: 38px
                letterSpacing: '0em', // Letter spacing: 0em
                textAlign: 'left', // Text alignment: center
                color: '#FFFFFF', // Font color: white
              }}  elevation={3} >
              <Typography variant="h6">Personal Data </Typography>
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
              fontFamily: 'Roboto, sans-serif', // Font family: Roboto
              fontSize: '32px', // Font size: 32px
              fontWeight: 600, // Font weight: 600 (bold)
              lineHeight: '38px', // Line height: 38px
              letterSpacing: '0em', // Letter spacing: 0em
              textAlign: 'left', // Text alignment: center
              color: '#FFFFFF', // Font color: white
            }} elevation={3}>
            <Typography variant="h6" align="center" style={{ marginBottom: '16px' }}>History</Typography>
            <Grid container spacing={2}>
              {/* Column 1: Illnesses */}
              <Grid item xs={3}>
              <Box display="flex" flexDirection="column" border={1} borderColor="primary.main" borderRadius={4} padding={1}>

                {medicalHistory.illnesses.map((illness, index) => (
                  <Typography key={index}>{illness}</Typography>
                ))}
              </Box>

              </Grid>
              {/* Column 2: Drugs */}
              <Grid item xs={3}>
              <Box display="flex" flexDirection="column" border={1} borderColor="primary.main" borderRadius={4} padding={1}>

                {medicalHistory.drugs.map((drug, index) => (
                  <Typography key={index}>{drug}</Typography>
                ))}
              </Box>
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
              marginBottom: '16px',
            }}
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
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '400px', // Adjusted width
                  backgroundColor: 'white',
                  padding: '24px', // Adjusted padding for extra space
                  borderRadius: '8px',
                  textAlign: 'center', // Center content horizontally
                }}
              >
                <Typography variant="h6" sx={{ fontFamily: 'Roboto, sans-serif', fontSize: '32px', fontWeight: 600, lineHeight: '38px', letterSpacing: '0em', textAlign: 'left' }}>
                  Prescription
                </Typography>
                <TextField
                  label="Drug Name"
                  value={prescriptionData.drugName}
                  onChange={(e) => setPrescriptionData({ ...prescriptionData, drugName: e.target.value })}
                  fullWidth
                  sx={{ marginBottom: '16px' }} // Adding margin to separate fields
                />
                <TextField
                  label="Dosage"
                  value={prescriptionData.dosage}
                  onChange={(e) => setPrescriptionData({ ...prescriptionData, dosage: e.target.value })}
                  fullWidth
                  sx={{ marginBottom: '16px' }} // Adding margin to separate fields
                />
                <TextField
                  label="Time"
                  value={prescriptionData.time}
                  onChange={(e) => setPrescriptionData({ ...prescriptionData, time: e.target.value })}
                  fullWidth
                  sx={{ marginBottom: '24px' }} // Adding more space before the button
                />
                <Button variant="contained" color="primary" onClick={handlePrescriptionSubmit}>
                  Save Prescription
                </Button>
              </Box>
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
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '810px',
              height: '451px',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Paper className="popup" style={{ width: '810px', height: '451px', padding: '16px' }}>
              <Typography variant="h6">Add Test</Typography>
              <TextField
                label="Test Name"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                fullWidth
              />
              <Button
                  variant="contained"
                  color="primary"
                  onClick={handleTestSubmit}
                  sx={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '20px', // Adjust this value to move the button downwards
                  }}
                >
                  Save Test
                </Button>

            </Paper>
          </Box>
        </Modal>


          <Box
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 1, // Ensure the close button appears on top
              }}
            >
              <IconButton onClick={() => handleClosePopup('prescription')}>
                <CloseIcon />
              </IconButton>
            </Box>
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
      </div>
    );
  };

export default OphthalmologyForm;
