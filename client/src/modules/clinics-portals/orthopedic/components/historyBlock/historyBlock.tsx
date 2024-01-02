import React from "react";
import classes from "./history.module.css";
import { auto } from "@popperjs/core";
import UnorderedList from "../unorderedList/unorderedList";

interface HistoryBlockProbs {
  headerContent: string;
  classStyle: string;
  id: number| undefined
}

const dummyList: string[] = ["Item 1", "Item 2", "Item 3"];

const HistoryBlock: React.FC<HistoryBlockProbs> = ({
  headerContent,
  classStyle,
  id
}) => {
  return (
    <div className={classes[classStyle as string]}>
      <h2 style={{ fontSize: "32px" }}>{headerContent}</h2>
      
      <div className={classes.innerContainer}>
        <div className={classes.customDiv}>
          <h2 style={{ marginBottom: "0px" }}>Drugs</h2>
          <UnorderedList list={dummyList} />
        </div>
        <div className={classes.customDiv}>
          <h2 style={{ marginBottom: "0px" }}>Illnesses</h2>
          <UnorderedList list={dummyList} />
        </div>
        <div className={classes.customDiv}>
          <h2 style={{ marginBottom: "0px" }}>Operations and Tests</h2>
          <UnorderedList list={dummyList} />
        </div>
      </div>
    </div>
  );
};

export default HistoryBlock;
