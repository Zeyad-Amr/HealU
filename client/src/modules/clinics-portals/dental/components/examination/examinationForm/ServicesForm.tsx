// services.tsx
import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import styles from "../examination.module.css";
import SubmitButton from "../elements/SubmitButton";
import CustomMultiSelect from "../elements/CustomMultiSelect";

let Services: { ServicesDescription: string }[] = [
  { ServicesDescription: "Service1" },
];

const dentalServices = [
  { label: "Teeth Whitening", value: "Teeth Whitening" },
  { label: "Teeth Cleaning", value: "Teeth Cleaning" },
  { label: "Teeth Extraction", value: "Teeth Extraction" },
  { label: "Veneers", value: "Veneers" },
  { label: "Fillings", value: "Fillings" },
  { label: "Crowns", value: "Crowns" },
  { label: "Root Canal", value: "Root Canal" },
  { label: "Braces", value: "Braces" },
  { label: "Bonding", value: "Bonding" },
  { label: "Dentures", value: "Dentures" },
];

interface ServicesFormProps {
    onClose: () => void;
    // Add any other props needed for ServicesForm
  }
const ServicesForm = ({onClose}:any) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [services, setServices] = useState<{ ServicesDescription: string }[]>([
    { ServicesDescription: "Service1" },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const handleServiceChange = (event: any) => {
    const selectedValues = event.target.value as string[];
    setSelectedServices(selectedValues);
  };

  const updateServiceList = () => {
    setServices((prevServices) => [
      ...prevServices,
      ...selectedServices.map((service) => ({ ServicesDescription: service })),
    ]);
  };

  const handleSubmitService = () => {
    updateServiceList();
    // handleClose();
    onClose();
  };

  const handleClose = () => {
    // Close the popup by updating the state
    setIsPopupOpen(false);
  };

  return (
    <div>
      {isPopupOpen && (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          <Box gridColumn="span 12" className={styles.input}>
            <h2>Services</h2>
            <CustomMultiSelect
              label="Select Service"
              options={dentalServices}
              selectedValues={selectedServices}
              onChange={handleServiceChange}
            ></CustomMultiSelect>
          </Box>
          <Box gridColumn="span 6" className={styles.input}>
            <SubmitButton label="Save" onClick={handleSubmitService} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default ServicesForm;
