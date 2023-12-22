import React from "react";
import { useEffect } from "react";
import { useState } from "react";


const HistoryInfo = (props: any) => { 
    return (
        <>
           <h1>
            {props.drugs}
            </h1>
            <h1>
            {props.illnesses}
            </h1>
            <h1>
            {props.tests}
            </h1>
            <h1>
            {props.operation}
            </h1>
        </>
    )
};
export default HistoryInfo;