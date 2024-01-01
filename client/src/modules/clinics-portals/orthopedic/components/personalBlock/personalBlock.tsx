// PersonalDataBlock.tsx
import React from "react";

interface PersonalDataBlockProps {
  headerContent: string;
}

const PersonalDataBlock: React.FC<PersonalDataBlockProps> = ({ headerContent }) => {
  return (
    <div>
      <h2>{headerContent}</h2>
      <div>
        <label>Name:</label>
      </div>
      <div>
        <label>Weight:</label>
      </div>
      <div>
        <label>Height:</label>
      </div>
      <div>
        <label>Age:</label>
      </div>
    </div>
  );
};

export default PersonalDataBlock;
