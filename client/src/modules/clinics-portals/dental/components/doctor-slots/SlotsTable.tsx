import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { fetchSlotsForDoctor, deleteSlot } from "../../state/slices/slotsSlice";
import DoctorSlot from "./DoctorSlot";
import { cancelAppointment } from "../../state/slices/appointmentSlice";

const slotsColumn = [
  { key: "time", header: "Time" },
  { key: "weekDay", header: "Week Day" },
  { key: "clinicId", header: "Clinic ID" },
  { key: "patientId", header: "Patient ID" },
];

const SlotsTable = () => {
  const SlotsState = useSelector((state: RootState) => state.slots);
  const dispatch = useDispatch<AppDispatch>();

  const doctorId = 13;
  const date = "2023-12-24";

  useEffect(() => {
    dispatch(fetchSlotsForDoctor({ doctorId, date }));
  }, [dispatch]);

  if (SlotsState.loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              {slotsColumn.map((column, index) => (
                <th key={index}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SlotsState.slots.map((doctorSlot: any, index: number) => {
              return (
                <DoctorSlot
                  slot={doctorSlot.slot}
                  index={index}
                  patientId={doctorSlot.appointmentObject.patientId}
                  onDelete={() => dispatch(deleteSlot(doctorSlot.slot._id))}
                  onCancel={() =>
                    dispatch(
                      cancelAppointment(doctorSlot.appointmentObject._id)
                    )
                  }
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SlotsTable;
