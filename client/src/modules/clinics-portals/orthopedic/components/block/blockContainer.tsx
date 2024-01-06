// BlockContainer.tsx
import React from "react";
import classes from "./block.module.css";
import PersonalDataBlock from "../personalBlock/personalBlock";
import HistoryBlock from "../historyBlock/historyBlock";

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
      {
        headerContent === "Personal Data" ? (
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
