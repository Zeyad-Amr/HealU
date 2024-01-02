// BlockContainer.tsx
import React from "react";
import classes from "./block.module.css";
import { TextField } from "@mui/material";
import PersonalDataBlock from "../personalBlock/personalBlock";
import HistoryBlock from "../historyBlock/historyBlock";
import DiagnosisBlock from "../diagnosisBlock/diagnosisBlock";

// import BlockComponent1 from '../block';
// import BlockComponent2 from '../block2';

const BlockContainer = ({
  headerContent,
  classStyle,
  id,
}: {
  headerContent: string;
  classStyle: string;
  id: number | undefined;
}) => {
  return (
    <div className={classes[classStyle as string]}>
      {headerContent === "Personal Data" ? (
        <PersonalDataBlock headerContent={headerContent} id={id} />
      ) : headerContent === "History" ? (
        <HistoryBlock
          classStyle="block2"
          headerContent={headerContent}
          id={id}
        />
      ) : null
      // <DiagnosisBlock headerContent={headerContent} />
      }
    </div>
  );
};

export default BlockContainer;
