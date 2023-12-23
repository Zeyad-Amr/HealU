import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { AppDispatch, RootState } from "../../state/store";
import { fetchSlotsForDoctor, deleteSlot } from "../../state/slices/slotsSlice";

const Slots = () => {
    const slots = useSelector((state: RootState) => state.slots.slots);
    const dispatch = useDispatch<AppDispatch>();

    const doctorId = 5;
    const date = "2023-12-18";

    useEffect(() => {
        dispatch(fetchSlotsForDoctor({ doctorId, date }));
    }, []);

    return (
        <>
            {slots.map((doctorSlot: any) => {
                return (
                    <div key={doctorSlot.slot._id}>
                        <div>
                            <span> {doctorSlot.slot.time} </span>
                            <span> {doctorSlot.slot.weekDay} </span>
                            <span>
                                {doctorSlot.appointmentObject.patientId}
                            </span>
                            <span>Clinic Id: {doctorSlot.slot.clinicId}</span>
                        </div>
                        <button
                            onClick={() =>
                                dispatch(deleteSlot(doctorSlot.slot._id))
                            }
                        >
                            Delete slot
                        </button>

                        <hr></hr>
                    </div>
                );
            })}
        </>
    );
};

export default Slots;
