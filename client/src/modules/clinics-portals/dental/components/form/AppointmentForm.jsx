import { useState } from "react";
import styles from "./form.module.css";

import CustomTextField from "./elements/CustomTextFiled";
import CustomTextArea from "./elements/CustomTextArea";
import CustomSelect from "./elements/CustomSelect";
import CustomMultiSelect from "./elements/CustomMultiSelect";

const AppointmentForm = () => {
  const DiseaseOptions = [
    { label: "Diabase", value: 1 },
    { label: "high pressure", value: 2 },
    { label: "heart disease", value: 3 },
  ];

  const genderOptions = [
    { label: "Male", value: 1 },
    { label: "Female", value: 0 },
  ];

  // function needs for multiple select you need to make this for each multiple select
  const [selectedDisease, setSelectedDisease] = useState([]);
  const handleDiseaseChange = (event) => {
    setSelectedDisease(event.target.value);
  };

  return (
    <>
      <div className={styles.form}>
        <div>
          <CustomTextField label="Name" required />
        </div>

        <div>
          <CustomTextField label="age" />
        </div>

        <div>
          <CustomTextField label="Phone" />
        </div>

        <div>
          <CustomTextField label="Email" />
        </div>

        <div>
          <CustomSelect label="Gender" options={genderOptions} />
        </div>

        <div>
          <CustomMultiSelect
            label="Disease"
            options={DiseaseOptions}
            selectedValues={selectedDisease}
            onChange={handleDiseaseChange}
          />
        </div>

        <div>
          <CustomTextArea label="Notes" />
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;
