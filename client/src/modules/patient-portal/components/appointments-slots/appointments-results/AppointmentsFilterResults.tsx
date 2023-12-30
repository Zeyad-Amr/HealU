import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import moment from "moment";
import "moment-timezone";

interface AppointmentsFilterResultsPropsI {
  resultData?: any[];
}

const AppointmentsFilterResults = ({
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
    } while (color === "#FFFFFF" || color === "#EEEAFF"); // Exclude specific colors

    return color;
  }

  //   const formatDate = (dateString : string) => {
  //     const formattedDate = moment(dateString).format('MMMM DD, YYYY hh:mm a');
  //     return formattedDate;
  //   };

  const formatDate = (dateString : string) => {
    const date = new Date(dateString);
    
    // Subtract two hours
    date.setHours(date.getHours() - 2);
    
    const options : any = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric' 
    };
    
    const formattedDate = date.toLocaleString('en-US', options)
      .replace(' at ', ' '); 
    return formattedDate;
  };

  const slotsData = [
    {
      slotId: "659078d8700d89f2bf445d1b",
      doctor: {
        id: 1,
        name: "Ali Mahmoud",
      },
      clinic: {
        id: 4,
        name: "NutriWellness Center",
        description: "Promoting wellness through nutrition",
      },
      time: "08:00",
      weekDay: "Monday",
      date: "2024-01-01T05:00:00.000Z",
    },
    {
      slotId: "659078e2700d89f2bf445d1e",
      doctor: {
        id: 1,
        name: "Moamen Mohamed",
      },
      clinic: {
        id: 4,
        name: "OrthoCare Specialists",
        description: "Dedicated to bone and joint health",
      },
      time: "08:00",
      weekDay: "Sunday",
      date: "2023-12-31T08:00:00.000Z",
    },
    {
      slotId: "659078e2700d89f2bf445d1e",
      doctor: {
        id: 1,
        name: "Moamen Mohamed",
      },
      clinic: {
        id: 4,
        name: "OrthoCare Specialists",
        description: "Dedicated to bone and joint health",
      },
      time: "08:00",
      weekDay: "Sunday",
      date: "2023-12-31T08:00:00.000Z",
    },
    {
      slotId: "659078e2700d89f2bf445d1e",
      doctor: {
        id: 1,
        name: "Moamen Mohamed",
      },
      clinic: {
        id: 4,
        name: "OrthoCare Specialists",
        description: "Dedicated to bone and joint health",
      },
      time: "08:00",
      weekDay: "Sunday",
      date: "2023-12-31T08:00:00.000Z",
    },
    {
      slotId: "659078e2700d89f2bf445d1e",
      doctor: {
        id: 1,
        name: "Moamen Mohamed",
      },
      clinic: {
        id: 4,
        name: "OrthoCare Specialists",
        description: "Dedicated to bone and joint health",
      },
      time: "08:00",
      weekDay: "Sunday",
      date: "2023-12-31T08:00:00.000Z",
    },
    {
      slotId: "659078e2700d89f2bf445d1e",
      doctor: {
        id: 1,
        name: "Moamen Mohamed",
      },
      clinic: {
        id: 4,
        name: "OrthoCare Specialists",
        description: "Dedicated to bone and joint health",
      },
      time: "08:00",
      weekDay: "Sunday",
      date: "2023-12-31T08:00:00.000Z",
    },
    {
      slotId: "659078e2700d89f2bf445d1e",
      doctor: {
        id: 1,
        name: "Moamen Mohamed",
      },
      clinic: {
        id: 4,
        name: "OrthoCare Specialists",
        description: "Dedicated to bone and joint health",
      },
      time: "08:00",
      weekDay: "Sunday",
      date: "2023-12-31T08:00:00.000Z",
    },
    {
      slotId: "659078e2700d89f2bf445d1e",
      doctor: {
        id: 1,
        name: "Moamen Mohamed",
      },
      clinic: {
        id: 4,
        name: "OrthoCare Specialists",
        description: "Dedicated to bone and joint health",
      },
      time: "08:00",
      weekDay: "Sunday",
      date: "2023-12-31T08:00:00.000Z",
    },
    {
      slotId: "659078e2700d89f2bf445d1e",
      doctor: {
        id: 1,
        name: "Moamen Mohamed",
      },
      clinic: {
        id: 4,
        name: "OrthoCare Specialists",
        description: "Dedicated to bone and joint health",
      },
      time: "08:00",
      weekDay: "Sunday",
      date: "2023-12-31T08:00:00.000Z",
    },
    {
      slotId: "659078e2700d89f2bf445d1e",
      doctor: {
        id: 1,
        name: "Moamen Mohamed",
      },
      clinic: {
        id: 4,
        name: "OrthoCare Specialists",
        description: "Dedicated to bone and joint health",
      },
      time: "08:00",
      weekDay: "Sunday",
      date: "2023-12-31T08:00:00.000Z",
    },
  ];

  return (
    <Box sx={{ overflowY : "auto" }}>
      <Grid container spacing={2}>
        {slotsData.map((slot: any, index: number) => {
          return (
            <Grid key={index} item lg={3} md={3} sm={6} xs={12}>
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
                      {getInitials(slot.doctor.name)}
                    </Avatar>
                  }
                  title={slot.doctor.name}
                  subheader={formatDate(slot.date)}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#00000080" }}>
                    {slot.clinic.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {slot.clinic.description}
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

export default AppointmentsFilterResults;