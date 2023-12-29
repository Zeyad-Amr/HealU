import { useState } from "react";

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
  // text area for report
  const [report, setReport] = useState("");
  const handleReportChange = (event: any) => {
    setReport(event.target.value);
  };

  // text area for recommendations
  const [recommendations, setRecommendations] = useState("");
  const handleRecommendationsChange = (event: any) => {
    setRecommendations(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <CustomTextArea
          title="Report"
          placeholder="Enter Report"
          value={report}
        />
      </div>
      <div className={styles.input}>
        <CustomTextArea
          title="Recommendations"
          placeholder="Enter Recommendations.."
          value={recommendations}
        ></CustomTextArea>
      </div>
    </div>
  );
};

export default DiagnosisForm;
