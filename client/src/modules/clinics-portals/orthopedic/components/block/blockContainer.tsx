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
      <form >
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="username" name="username" placeholder="Enter your name" />
        </div> 

        <div>
        <label htmlFor="weight">Weight:</label>
        <input type="number" id="weight" name="weight" placeholder="Enter your weight" />
        </div>
        <div>
        <label htmlFor="height">Height:</label>
        <input type="number" id="height" name="height" placeholder="Enter your height" />
        </div>
        <div>

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" placeholder="Enter your age" />
        </div>

        
        
      </form>
    </div>
    // <div style={{ display: 'flex' }}>
    //   {/* <BlockComponent1 />
    //   <BlockComponent2 /> */}
    // </div>
  );
};

export default BlockContainer;
