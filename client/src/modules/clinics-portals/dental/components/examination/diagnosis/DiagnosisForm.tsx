import { useState } from "react";
import TextField from "@mui/material/TextField";

// import styles from "./form.module.css";
import styles from "../examination.module.css";

import CustomTextArea from "../elements/CustomTextArea";

// test options
const TestOptions = [
  { label: "Test 1", value: 1 },
  { label: "Test 2", value: 2 },
  { label: "Test 3", value: 3 },
];

// services options
const ServicesOptions = [
  { label: "Service 1", value: 1 },
  { label: "Service 2", value: 2 },
  { label: "Service 3", value: 3 },
];

// prescriptions options
const PrescriptionsOptions = [
  { label: "Prescription 1", value: 1 },
  { label: "Prescription 2", value: 2 },
  { label: "Prescription 3", value: 3 },
];

// diagnosis form
const DiagnosisForm = () => {
  // report state
  const [report, setReport] = useState([]);
  const handleReportChange = (event: any) => {
    setReport(event.target.value);
    // console.log(report);
  };
  // recommendations state
  const [recommendations, setRecommendations] = useState([]);
  const handleRecommendationsChange = (event: any) => {
    setRecommendations(event.target.value);
    // console.log(recommendations);
  };
  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <label htmlFor="report">Report</label>
        <TextField
          id="report"
          multiline
          minRows={5}
          value={report}
          onChange={handleReportChange}
        />
      </div>
      <div className={styles.input}>
        <label htmlFor="recommendations">Recommendations</label>
        <TextField
          id="recommendations"
          multiline
          minRows={5}
          value={recommendations}
          onChange={handleRecommendationsChange}
        />
      </div>
    </div>
  );
};

export default DiagnosisForm;
