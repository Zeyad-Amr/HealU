import React from "react";

interface Prescription {
  drug: string;
  dosage: string;
}

const Prescription: React.FC<{ prescription: Prescription }> = ({
  prescription,
}) => {
  return (
    <div>
      <h2>Prescription</h2>
      <ul>
        <li>Drug: {prescription.drug}</li>
        <li>Dosage: {prescription.dosage}</li>
      </ul>
    </div>
  );
};

export default Prescription;
