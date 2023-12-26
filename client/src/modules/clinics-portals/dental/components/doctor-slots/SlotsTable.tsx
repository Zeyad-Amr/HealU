import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import { deleteSlot, fetchSlots } from "../../state/slices/slotsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect } from "react";

function SlotsTable() {
    const SlotsState = useSelector((state: RootState) => state.slots);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchSlots());
    }, [dispatch]);

    const headers: string[] = [
        "Doctor ID",
        "Clinic ID",
        "Week Day",
        "Time",
        "",
    ];

    return (
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
                    {SlotsState.slots.map((slot) => (
                        <TableRow key={slot._id}>
                            <TableCell>{slot.doctorId}</TableCell>
                            <TableCell>{slot.clinicId}</TableCell>
                            <TableCell>{slot.weekDay}</TableCell>
                            <TableCell>{slot.time}</TableCell>
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
    );
}

export default SlotsTable;
