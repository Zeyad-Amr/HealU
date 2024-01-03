import {
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Typography,
    Grid,
    Box,
    Stack,
    Container,
    IconButton,
    LinearProgress,
} from "@mui/material";
import { Info, InfoOutlined, InfoTwoTone, More, MoreVert, ReadMore } from "@mui/icons-material";
import { useState } from "react";

interface AppointmentsFilterResultsPropsI {
    resultData?: any[];
}

const appointmentsData: any[] = []

const UpcomingAppointmentsCard = ({
    resultData,
}: AppointmentsFilterResultsPropsI) => {

    function getInitials(name: string) {
        const words = name.split(" ");
        const initials = words.map((word: string) => word.charAt(0).toUpperCase());
        return initials.join("");
    }

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        do {
            color = "#";
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
        } while (color === "#FFFFFF" || color === "#EEEAFF");

        return color;
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        date.setHours(date.getHours() - 2);
        const dateOptions: any = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        const timeOptions: any = {
            hour: "numeric",
            minute: "numeric",
        };
        const dateTime = new Date(dateString);
        const formattedDate = dateTime.toLocaleDateString("en-US", dateOptions);
        const formattedTime = dateTime.toLocaleTimeString("en-US", timeOptions);
        return [formattedDate, formattedTime];
    };



    return (
        <Box sx={{ overflowY: "auto", m: 2 }}>
            <Grid container spacing={2}>
                {appointmentsData.map((appointment: any, index: number) => {
                    return (
                        <Grid key={index} item lg={3} md={3} sm={6} xs={12} minWidth={330}>

                            <Card
                                sx={{
                                    maxWidth: 345,
                                    backgroundColor: "#EEEFFF",
                                    boxShadow: "none",
                                    borderRadius: "10px",
                                }}
                            >
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            sx={{ bgcolor: getRandomColor() }}
                                            aria-label="recipe"
                                        >
                                            {getInitials(appointment.doctor.name)}
                                        </Avatar>
                                    }
                                    title={
                                        appointment.doctor.name
                                    }
                                    subheader={
                                        <>
                                            {appointment.clinic.name}
                                        </>
                                    }
                                    action={
                                        <IconButton onClick={() => { }} aria-label="settings">
                                            <InfoOutlined />
                                        </IconButton>
                                    }
                                />
                                <CardContent>
                                    <Typography variant="body2" >
                                        {appointment.prescription.Diagnosis}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        {formatDate(appointment.prescription.CreatedAt)[0] + " " + formatDate(appointment.prescription.CreatedAt)[1]}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>

    );
};

export default UpcomingAppointmentsCard;
