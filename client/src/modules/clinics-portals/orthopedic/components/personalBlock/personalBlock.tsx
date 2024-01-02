// PersonalDataBlock.tsx
import React from "react";
import classes from "./personalBlock.module.css";

interface PersonalDataBlockProps {
  headerContent: string;
}

const PersonalDataBlock: React.FC<PersonalDataBlockProps> = ({ headerContent }) => {
  return (
    <div>
      <h2 style={{fontSize:"32px"}}>{headerContent}</h2>
      <div>
        <label className={classes.label}>Name:</label>
      </div>
      <div>
        <label className={classes.label}>Weight:</label>
      </div>
      <div>
        <label className={classes.label}>Height:</label>
      </div>
      <div>
        <label className={classes.label}>Age:</label>
      </div>
    </div>
  );
};

export default PersonalDataBlock;
