import SlotsTable from "./components/doctor-slots/SlotsTable";
import CreateSlotForm from "./components/doctor-slots/CreateSlotForm";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CustomizedSnackbar from "./components/doctor-slots/CustomizedSnackbar";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";

let doctorId: number = 13,
    clinicId: number = 5;

function App() {
    const SnackbarState = useSelector((state: RootState) => state.snackbar);
    return (
        <>
            <h1>Doctor Slots</h1>
            <SlotsTable doctorId={doctorId} clinicId={clinicId} />
            <br></br>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CreateSlotForm doctorId={doctorId} clinicId={clinicId} />
            </LocalizationProvider>
            <CustomizedSnackbar
                message={SnackbarState.snackbar.message}
                messageType={SnackbarState.snackbar.type}
                open={SnackbarState.snackbarOpen}
            />
        </>
    );
}

export default App;
