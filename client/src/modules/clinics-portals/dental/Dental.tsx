import CustomizedSnackbar from "./components/doctor-slots/CustomizedSnackbar";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";
import NavBar from "./components/navBar/NavBar";
import DashBoard from "./components/dashBoard/DashBoard";

function App() {
  const SnackbarState = useSelector((state: RootState) => state.snackbar);
  return (
    <>
      <NavBar />
      {/* <PersonCard />
    <Examination /> */}
      <DashBoard />
      <CustomizedSnackbar
        message={SnackbarState.snackbar.message}
        messageType={SnackbarState.snackbar.type}
        open={SnackbarState.snackbarOpen}
      />
    </>
  );
}

export default App;
