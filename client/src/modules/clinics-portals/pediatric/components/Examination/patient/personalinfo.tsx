import React from "react";
import { useEffect } from "react";
import { useState } from "react";



const PresonalInfo = (props: any) => { 
    return (
        <>
            <h1>
                {props.name}
            </h1>
            <h1>
                {props.weight}
            </h1>
            <h1>
                {props.height}
            </h1>
            <h1>
                {props.age}
            </h1>
            
        </>
    )
};
export default PresonalInfo;