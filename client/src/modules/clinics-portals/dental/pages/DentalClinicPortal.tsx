import { useSelector } from "react-redux";
import CustomizedSnackbar from "../components/doctor-slots/CustomizedSnackbar";
import DashBoard from "../components/dashBoard/DashBoard";
import { RootState } from "../../../../core/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AppLayout from "../../../../core/components/AppLayout";

const DentalClinicPortal = () => {
  const SnackbarState = useSelector(
    (state: RootState) => state.snackbarReducer
  );
  return (
    <>
      <AppLayout>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DashBoard />
        </LocalizationProvider>
        <CustomizedSnackbar
          message={SnackbarState.snackbar.message}
          messageType={SnackbarState.snackbar.type}
          open={SnackbarState.snackbarOpen}
        />
      </AppLayout>
    </>
  );
};
export default DentalClinicPortal;
