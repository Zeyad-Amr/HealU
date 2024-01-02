import { useSelector } from "react-redux";
import NavBar from "../components/navBar/NavBar";
import CustomizedSnackbar from "../components/doctor-slots/CustomizedSnackbar";
import DashBoard from "../components/dashBoard/DashBoard";
import { RootState } from "../../../../core/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DentalClinicPortal = () => {
    const SnackbarState = useSelector(
        (state: RootState) => state.snackbarReducer
    );
    return (
        <>
            <NavBar />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DashBoard />
            </LocalizationProvider>
            <CustomizedSnackbar
                message={SnackbarState.snackbar.message}
                messageType={SnackbarState.snackbar.type}
                open={SnackbarState.snackbarOpen}
            />
        </>
    );
};
export default DentalClinicPortal;
