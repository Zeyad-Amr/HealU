/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem
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
    note: '',
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
    if (prescriptionData.drugName && prescriptionData.dosage && prescriptionData.time &&prescriptionData.note) {
      const newPrescription = `Prescription: ${prescriptionData.drugName}, Dosage: ${prescriptionData.dosage}, Time: ${prescriptionData.time},  Note: ${prescriptionData.note}`;
      setPrescriptionData({ drugName: '', dosage: '', time: '' ,note: ''});
      setOpenPopup((prevState) => ({ ...prevState, prescription: false }));
      setPrescriptionCard(newPrescription);
    }
  };

  const [tests, setTests] = useState([]);
  const [editTestIndex, setEditTestIndex] = useState(null);
  
  
  const handleTestSubmit = () => {
    if (testName) {
      if (editTestIndex !== null) {
        // If an edit is in progress, update the existing test
        const updatedTests:any = [...tests];
        updatedTests[editTestIndex] = testName;
        setTests(updatedTests);
        setEditTestIndex(null);
      } else {
        // If not editing, add a new test
        const updatedTests:any = [...tests, testName];
        setTests(updatedTests);
      }
      setOpenPopup((prevState) => ({ ...prevState, tests: false }));
      setTestName('');
    }
  };
  
  const handleEditTest = (index:any) => {
    const editedTest = tests[index]; // Fetch the test based on index
    setOpenPopup((prevState) => ({ ...prevState, tests: true }));
    setTestName(editedTest);
    setEditTestIndex(index);
  };
  
  const handleDeleteTest = (index:any) => {
    const updatedTests = tests.filter((test, idx) => idx !== index);
    setTests(updatedTests);
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

 

  const handleOpenServices = () => {
    setShowServiceModal(true);
  };

  const [selectedService, setSelectedService] = useState('');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const services = ['Service 1', 'Service 2', 'Service 3']; // Ad services here


  const handleServiceChange = (event:any) => {
    setSelectedService(event.target.value);
  };

  const handleCloseServices = () => {
    if (selectedService) {
      setTestCard(`Selected Service: ${selectedService}`);
    }
    setShowServiceModal(false);
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
                <TextField
      label="Note"
      value={prescriptionData.note}
      onChange={(e) => setPrescriptionData({ ...prescriptionData, note: e.target.value })}
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
  <Paper className="add-section" elevation={3} style={{ backgroundColor: '#C3C3C3', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
    <Typography variant="h6">Add Test</Typography>
    <Button onClick={() => handleOpenPopup('tests')}>Add Test</Button>
    {tests.map((test, index) => (
      <div key={index}>
        <Typography>{test}</Typography>
        <Button onClick={() => handleEditTest(index)}>Edit</Button>
        <Button onClick={() => handleDeleteTest(index)}>Delete</Button>
      </div>
    ))}
    {/* Test Popup */}
    <Modal open={openPopup.tests} onClose={() => handleClosePopup('tests')}>
      <Paper className="popup">
        <Typography variant="h6">{editTestIndex !== null ? 'Edit Test' : 'Add Test'}</Typography>
        <TextField
          label="Test Name"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleTestSubmit}>
          {editTestIndex !== null ? 'Save Edited Test' : 'Save Test'}
        </Button>
      </Paper>
    </Modal>
  </Paper>
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
          <Button onClick={handleOpenServices}>Select Services</Button>
            <Typography>{testCard}</Typography>

          <Modal open={showServiceModal} onClose={handleCloseServices}>
            <Paper
              className="popup"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#F4F4F4',
                padding: '16px',
                borderRadius: '8px',
              }}
            >
              <Typography variant="h6">Select Services</Typography>
              <Select
                value={selectedService}
                onChange={handleServiceChange}
                variant="outlined"
                fullWidth
              >
                {services.map((service, index) => (
                  <MenuItem key={index} value={service}>
                    {service}
                  </MenuItem>
                ))}
              </Select>
              <Button variant="contained" color="primary" onClick={handleCloseServices}>
                Close
              </Button>
            </Paper>
          </Modal>
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
   <Grid container spacing={2}>
  {/* Rest of your code */}
  {/* Submit Buttons */}
  <Grid item xs={12}>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="contained" color="primary" style={{ marginRight: '8px' }}>
        Submit
      </Button>
      <Button variant="outlined" color="primary">
        Pay
      </Button>
    </div>
  </Grid>
</Grid>
       </Grid>
       
  );
};

export default OphthalmologyForm;
