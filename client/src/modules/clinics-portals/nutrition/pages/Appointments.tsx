import Box from "@mui/material/Box";
import {Button, Card, Grid} from "@mui/material";
import AppointmentsHeader from "../components/Appointments/AppointmentsHeader";
import AppointmentsBody from "../components/Appointments/AppointmentsBody";

const Appointments = () => {
    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                paddingX: "5rem",
            }}
        >
            <Grid
                sx={{
                    backgroundColor: "white",
                    padding: "1rem",
                    borderRadius: "1rem 1rem 0 0",
                    height: "100%",
                }}
            >

                <Grid item>
                    <AppointmentsHeader/>
                </Grid>

                <Grid item sx={{
                    marginTop: "3rem",
                }}>
                    <AppointmentsBody/>
                </Grid>
            </Grid>

        </Box>
    );
};

export default Appointments;
