import { Slot } from "../../state/slices/slotsSlice";

const DoctorSlot = ({
  slot,
  index,
  patientId,
  onDelete,
  onCancel
}: {
  slot: Slot;
  index: number;
  patientId: number;
  onDelete: any;
  onCancel: any;
}) => {
  return (
    <tr key={index}>
      <td key={0} style={{ textAlign: "center" }}>
        {slot.time}
      </td>
      <td key={1} style={{ textAlign: "center" }}>
        {" "}
        {slot.weekDay}{" "}
      </td>
      <td key={2} style={{ textAlign: "center" }}>
        {slot.clinicId}
      </td>
      <td key={3} style={{ textAlign: "center" }}>
        {patientId}
      </td>
      <button onClick={onDelete}>Delete slot</button>
      {patientId ? <button onClick={onCancel}>Cancel Appointment</button> : ""}
    </tr>
  );
};

export default DoctorSlot;
