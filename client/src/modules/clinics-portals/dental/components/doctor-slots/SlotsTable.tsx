import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import {
    Slot,
    deleteSlot,
    fetchSlots,
    fetchSlotsForDoctor,
} from "../../state/slices/slotsSlice";
import WeekDayPicker from "./WeekDayPicker";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import {
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    Paper,
} from "@mui/material";

const weekdaysMap = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const headers: string[] = ["Time", "Patient Name"];

function SlotsTable(props: { doctorId: number; clinicId: number }) {
    const SlotsState = useSelector((state: RootState) => state.slots);
    const dispatch = useDispatch<AppDispatch>();
    const [selectedDay, setSelectedDay] = useState(0);
    const [slotsData, setSlotsData] = useState<Slot[]>(SlotsState.slots);

    useEffect(() => {
        dispatch(
            fetchSlotsForDoctor({
                doctorId: props.doctorId,
                weekDay: selectedDay,
            })
        );
    }, [dispatch, selectedDay]);

    useEffect(() => {
        console.log("SlotsState.slots", SlotsState.slots);
        if (SlotsState.slots) {
            const selectedWeekdayLabel = weekdaysMap[selectedDay];
            setSlotsData(
                SlotsState.slots.filter(
                    (slot) =>
                        slot.doctorId === props.doctorId &&
                        slot.weekDay === selectedWeekdayLabel
                )
            );
        }
    }, [selectedDay, SlotsState.slots, props.doctorId]);

    const handleDayChange = (event: any) => {
        const selectedDayValue = event.target.value as number;
        setSelectedDay(selectedDayValue);
    };

    return (
        <>
            <WeekDayPicker
                handleDayChange={handleDayChange}
                selectedDay={selectedDay}
            />
            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell
                                    key={header}
                                    style={{ fontWeight: "bolder" }}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slotsData.map((slot) => (
                            <TableRow key={slot._id}>
                                <TableCell>{slot.time}</TableCell>
                                <TableCell>
                                    {slot.appointment?.patientId}
                                </TableCell>
                                <TableCell>
                                    <LoadingButton
                                        loading={SlotsState.loading}
                                        loadingPosition="start"
                                        color="error"
                                        onClick={() =>
                                            dispatch(deleteSlot(slot._id ?? ""))
                                        }
                                        startIcon={<DeleteIcon />}
                                    >
                                        Delete
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default SlotsTable;
