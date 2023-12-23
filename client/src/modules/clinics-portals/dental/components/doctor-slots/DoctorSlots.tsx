import React, { useEffect, useState } from "react";
import axios from "axios";
import Slots from "./Slots";

const DoctorSlots = () => {
    return (
        <>
            <div>
                <span>DOCTOR SLOTS</span>
            </div>
            <Slots />
        </>
    );
};

export default DoctorSlots;
