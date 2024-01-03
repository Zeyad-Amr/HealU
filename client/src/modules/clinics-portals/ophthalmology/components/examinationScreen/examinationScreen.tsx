import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
// import { IconButton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
import "./style.css";

const OphthalmologyForm = () => {
  const [openPopup, setOpenPopup] = useState({
    prescription: false,
    tests: false,
    services: false,
  });

  const [patientData] = useState({
    patientId: "12345",
    name: "Mariam",
    age: "22",
    weight: "75Kg",
    height: "175cm",
  });

  const [prescriptionData, setPrescriptionData] = useState({
    drugName: "",
    dosage: "",
    time: "",
    note: "",
  });

  const [medicalHistory, setMedicalHistory] = useState({
    illnesses: ["Flu", "Allergies"],
    drugs: ["Panadol", "Zexromax"],
    medicalTests: ["Test 1", "Test 2"],
    operations: ["Operation 1", "Operation 2"], // Add new operations here
  });

  const [testName, setTestName] = useState("");
  const [prescriptionCard, setPrescriptionCard] = useState("");
  const [testCard, setTestCard] = useState("");

  const [diagnosis, setDiagnosis] = useState({
    title: "Diagnosis ",
    info: "",
  });

  const [editDiagnosis, setEditDiagnosis] = useState("");

  const handleOpenPopup = (type: any) => {
    setOpenPopup((prevState) => ({
      ...prevState,
      [type]: true,
    }));
  };

  const handleClosePopup = (type: any) => {
    setOpenPopup((prevState) => ({
      ...prevState,
      [type]: false,
    }));
  };

  const handlePrescriptionSubmit = () => {
    if (
      prescriptionData.drugName &&
      prescriptionData.dosage &&
      prescriptionData.time &&
      prescriptionData.note
    ) {
      const newPrescription = `Prescription: ${prescriptionData.drugName}, Dosage: ${prescriptionData.dosage}, Time: ${prescriptionData.time},  Note: ${prescriptionData.note}`;
      setPrescriptionData({ drugName: "", dosage: "", time: "", note: "" });
      setOpenPopup((prevState) => ({ ...prevState, prescription: false }));
      setPrescriptionCard(newPrescription);
    }
  };

  const [tests, setTests] = useState([]);
  const [editTestIndex, setEditTestIndex] = useState(null);

  const handleTestSubmit = () => {
    if (testName) {
      const newTests = testName.split(",").map((test) => test.trim()); // Split by comma and trim whitespace

      if (editTestIndex !== null) {
        // If an edit is in progress, update the existing test
        const updatedTests: any = [...tests];
        updatedTests.splice(editTestIndex, 1, ...newTests); // Replace at index with new tests
        setTests(updatedTests);
        setEditTestIndex(null);
      } else {
        // If not editing, add new tests individually
        const updatedTests: any = [...tests, ...newTests];
        setTests(updatedTests);
      }
      setOpenPopup((prevState) => ({ ...prevState, tests: false }));
      setTestName("");
    }
  };

  const handleEditTest = (index: any) => {
    const editedTest = tests[index]; // Fetch the test based on index
    setOpenPopup((prevState) => ({ ...prevState, tests: true }));
    setTestName(editedTest);
    setEditTestIndex(index);
  };

  const handleDeleteTest = (index: any) => {
    const updatedTests = tests.filter((test, idx) => idx !== index);
    setTests(updatedTests);
  };

  const handleSaveDiagnosis = () => {
    setDiagnosis({ ...diagnosis, info: editDiagnosis });
  };
  const handleEditPrescription = () => {
    setOpenPopup((prevState) => ({ ...prevState, prescription: true }));
  };

  const handleOpenServices = () => {
    setShowServiceModal(true);
  };

  const [selectedService, setSelectedService] = useState("");
  const [showServiceModal, setShowServiceModal] = useState(false);
  const services = [
    "Eye examination",
    "Prescription glasses",
    "Contact lenses",
    " specialized testing",
  ]; // Ad services here

  const handleServiceChange = (event: any) => {
    setSelectedService(event.target.value);
  };

  const handleCloseServices = () => {
    if (selectedService) {
      setTestCard((prevTestCard) => {
        // Check if the testCard already has content
        const separator = prevTestCard ? ", " : ""; // Separator between services

        // Append the selected service to the existing content
        return prevTestCard + separator + `${selectedService}`;
      });
    }
    setSelectedService(""); // Clear the selected service for the next selection
    setShowServiceModal(false);
  };

  return (
    <div style={{ padding: "50px" }}>
      <Grid container spacing={2}>
        {/* Left Column for Personal Data */}

        <Grid item xs={6}>
          <Paper
            style={{
              height: "100%",
              backgroundColor: "#13D2DE",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontFamily: "Roboto, sans-serif", // Font family: Roboto
              fontSize: "32px", // Font size: 32px
              fontWeight: 600, // Font weight: 600 (bold)
              lineHeight: "38px", // Line height: 38px
              letterSpacing: "0em", // Letter spacing: 0em
              textAlign: "left", // Text alignment: center
              color: "#FFFFFF", // Font color: white
            }}
            elevation={3}
          >
            <Typography variant="h6">Personal Data </Typography>
            <Typography>
              <strong>Patient ID:</strong> {patientData.patientId}
            </Typography>
            <Typography>
              <strong>Name:</strong> {patientData.name}
            </Typography>
            <Typography>
              <strong>Age:</strong> {patientData.age}
            </Typography>
            <Typography>
              <strong>Weight:</strong> {patientData.weight}
            </Typography>
            <Typography>
              <strong>Height:</strong> {patientData.height}
            </Typography>
          </Paper>
        </Grid>

        {/* Right Column for Medical History */}
        <Grid item xs={6}>
          <Paper
            sx={{
              height: "100%",
              backgroundColor: "#1F4849",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontFamily: "Roboto, sans-serif", // Font family: Roboto
              fontSize: "32px", // Font size: 32px
              fontWeight: 600, // Font weight: 600 (bold)
              lineHeight: "38px", // Line height: 38px
              letterSpacing: "0em", // Letter spacing: 0em
              textAlign: "left", // Text alignment: center
              color: "#FFFFFF", // Font color: white
            }}
            elevation={3}
          >
            <Typography
              variant="h6"
              align="center"
              style={{ marginBottom: "16px" }}
            >
              History
            </Typography>
            <Grid container spacing={2}>
              {/* Column 1: Illnesses */}
              <Grid item xs={3}>
                <Box
                  display="flex"
                  flexDirection="column"
                  border={1}
                  borderColor="primary.main"
                  borderRadius={4}
                  padding={1}
                >
                  {medicalHistory.illnesses.map((illness, index) => (
                    <Typography key={index}>{illness}</Typography>
                  ))}
                </Box>
              </Grid>
              {/* Column 2: Drugs */}
              <Grid item xs={3}>
                <Box
                  display="flex"
                  flexDirection="column"
                  border={1}
                  borderColor="primary.main"
                  borderRadius={4}
                  padding={1}
                >
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
          <Paper
            className="diagnosis-card"
            style={{
              backgroundColor: "#F4F4F4",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "16px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <TextField
              label="Add Diagnosis"
              value={editDiagnosis}
              onChange={(e) => {
                setEditDiagnosis(e.target.value);
                handleSaveDiagnosis();
              }}
              // fullWidth
            />
            <TextField
              label="Left Eye Measurement"
              value="Left Eye Measurement"
              onChange={(e) => {
                // "Left Eye Measurement";
              }}
            />
            <TextField
              label="Right Eye Measurement"
              value="Right Eye Measurement"
              onChange={(e) => {
                // "Right Eye Measurement";
              }}
            />
            <></>
          </Paper>
        </Grid>

        {/* Add Prescription Section */}
        <Grid item xs={4}>
          <Paper
            className="add-section"
            elevation={3}
            style={{
              backgroundColor: "#C3C3C3",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          >
            <Typography variant="h6">Add Prescription</Typography>
            <Button onClick={() => handleOpenPopup("prescription")}>
              Add Prescription
            </Button>
            <Typography>{prescriptionCard}</Typography>
            {prescriptionCard && (
              <Button variant="outlined" onClick={handleEditPrescription}>
                Edit
              </Button>
            )}
          </Paper>
          {/* Prescription Popup */}
          <Modal
            open={openPopup.prescription}
            onClose={() => handleClosePopup("prescription")}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "500px", // Adjusted width
                backgroundColor: "white",
                padding: "16px", // Adjusted padding for extra space
                borderRadius: "8px",
                textAlign: "center", // Center content horizontally
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "32px",
                  fontWeight: 600,
                  lineHeight: "38px",
                  letterSpacing: "0em",
                  textAlign: "left",
                }}
              >
                Prescription
              </Typography>
              <TextField
                label="Drug Name"
                value={prescriptionData.drugName}
                onChange={(e) =>
                  setPrescriptionData({
                    ...prescriptionData,
                    drugName: e.target.value,
                  })
                }
                fullWidth
                sx={{ marginBottom: "16px" }} // Adding margin to separate fields
              />
              <TextField
                label="Dosage"
                value={prescriptionData.dosage}
                onChange={(e) =>
                  setPrescriptionData({
                    ...prescriptionData,
                    dosage: e.target.value,
                  })
                }
                fullWidth
                sx={{ marginBottom: "16px" }} // Adding margin to separate fields
              />
              <TextField
                label="Time"
                value={prescriptionData.time}
                onChange={(e) =>
                  setPrescriptionData({
                    ...prescriptionData,
                    time: e.target.value,
                  })
                }
                fullWidth
                sx={{ marginBottom: "24px" }} // Adding more space before the button
              />
              <TextField
                label="Note"
                value={prescriptionData.note}
                onChange={(e) =>
                  setPrescriptionData({
                    ...prescriptionData,
                    note: e.target.value,
                  })
                }
                fullWidth
              />
              <Button
                className="gradient-button "
                variant="contained"
                color="primary"
                onClick={handlePrescriptionSubmit}
              >
                Save Prescription
              </Button>
            </Box>
          </Modal>
        </Grid>

        {/* Add Test Section */}
        <Grid item xs={4}>
          <Paper
            className="add-section"
            elevation={3}
            style={{
              backgroundColor: "#C3C3C3",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          >
            <Typography variant="h6">Add Test</Typography>
            <Button onClick={() => handleOpenPopup("tests")}>Add Test</Button>
            {tests.map((test, index) => (
              <div key={index}>
                <Typography>{test}</Typography>
                <Button onClick={() => handleEditTest(index)}>Edit</Button>
                <Button onClick={() => handleDeleteTest(index)}>Delete</Button>
              </div>
            ))}
          </Paper>
          {/* Test Popup */}
          <Modal
            className="table-container"
            open={openPopup.tests}
            onClose={() => handleClosePopup("tests")}
          >
            <Box>
              <Paper
                className="popup"
                style={{
                  width: "400px",
                  height: "150px",
                  padding: "16px",
                  position: "absolute",
                }}
              >
                <Typography variant="h6">
                  {editTestIndex !== null ? "Edit Test" : "Add Test"}
                </Typography>
                <TextField
                  label="Test Name"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  fullWidth
                />
                <Button
                  className="gradient-button "
                  variant="contained"
                  color="primary"
                  onClick={handleTestSubmit}
                >
                  {editTestIndex !== null ? "Save Edited Test" : "Save Test"}
                </Button>
              </Paper>
            </Box>
          </Modal>

          <Box
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 1, // Ensure the close button appears on top
            }}
          >
            <Button onClick={() => handleClosePopup("prescription")}></Button>
          </Box>
        </Grid>

        {/* Add Services Section */}
        <Grid item xs={4}>
          <Paper
            className="add-section"
            elevation={3}
            style={{
              backgroundColor: "#C3C3C3",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          >
            <Typography variant="h6">Add Services</Typography>
            <Button onClick={handleOpenServices}>Select Services</Button>
            <Typography>{testCard}</Typography>

            <Modal open={showServiceModal} onClose={handleCloseServices}>
              <Paper
                className="popup"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "20%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "#F4F4F4",
                  padding: "26px",
                  borderRadius: "8px",
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
                <Button
                  className="gradient-button "
                  variant="contained"
                  color="primary"
                  onClick={handleCloseServices}
                >
                  Save
                </Button>
              </Paper>
            </Modal>
          </Paper>
          {/* Services Popup */}
          <Modal
            open={openPopup.services}
            onClose={() => handleClosePopup("services")}
          >
            <Paper className="popup">
              <Typography variant="h6">Select Services</Typography>
              {/* Options for selecting services */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClosePopup("services")}
              >
                Close
              </Button>
            </Paper>
          </Modal>
        </Grid>
        <Grid container spacing={2}>
          {/* Rest of your code */}
          {/* Submit Buttons */}
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                className="gradient-button "
                variant="contained"
                color="primary"
                style={{ marginRight: "8px" }}
              >
                Submit
              </Button>
              <Button
                className="gradient-button "
                variant="outlined"
                color="primary"
                style={{ marginRight: "8px" }}
              >
                Pay
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default OphthalmologyForm;
