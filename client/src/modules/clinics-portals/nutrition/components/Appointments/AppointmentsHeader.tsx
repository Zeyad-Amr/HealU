import {Button, IconButton, Typography, Box} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AppointmentsHeader = () => {



    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }}>
            <Box>
                <Typography
                    variant={"h4"}
                    sx={{
                        fontWeight: 300,
                        color: "gray"
                    }}
                >{
                    new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                    })
                }</Typography>
            </Box>
            <Box>
                <Button
                    variant={"contained"}
                    color="primary"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                        borderRadius: "0.6rem",
                    }}
                >
                    <IconButton sx={{
                        border: 1,
                        marginRight: "0.5rem",
                        color: "white",
                    }}>
                        <AddIcon fontSize={"small"}/>
                    </IconButton>
                    <Typography>
                        Add Appointment
                    </Typography>
                </Button>
            </Box>
        </Box>
    )
};

export default AppointmentsHeader;
