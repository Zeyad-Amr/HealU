import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./patientInfo.css";
const PresonalInfo = (props: any) => {
  return (
    <>
      <div>
        <h1 className="label">Name : </h1>
        <p className="data"> {props.name}</p>
      </div>
      <div>
        <h1 className="label">Weight : </h1>
        <p className="data"> {props.weight}</p>
      </div>
      <div>
        <h1 className="label">height : </h1>
        <p className="data"> {props.height}</p>
      </div>
      <div>
        <h1 className="label">age :</h1> <p className="data"> {props.age}</p>
      </div>
    </>
  );
};
export default PresonalInfo;
