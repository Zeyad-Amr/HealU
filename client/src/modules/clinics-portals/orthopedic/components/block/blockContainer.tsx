// BlockContainer.tsx
import React from "react";
import classes from "./block.module.css";
// import BlockComponent1 from '../block';
// import BlockComponent2 from '../block2';

const BlockContainer = ({
  headerContent,
  content,
  classStyle,
}: {
  headerContent: string;
  content: string;
  classStyle: string;
}) => {
  return (
    <div className={classes[classStyle as string]}>
      <h2>{headerContent}</h2>
      <p>{content}</p>
    </div>
    // <div style={{ display: 'flex' }}>
    //   {/* <BlockComponent1 />
    //   <BlockComponent2 /> */}
    // </div>
  );
};

export default BlockContainer;
