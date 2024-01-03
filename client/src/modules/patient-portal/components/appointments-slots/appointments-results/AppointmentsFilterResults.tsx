import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { useState , useRef } from "react";
import React, { Dispatch, SetStateAction } from 'react';
import AppointmentsBill from "../appointments-bill/AppointmentsBill";

interface AppointmentsFilterResultsPropsI {
  resultData: any[];
}

const AppointmentsFilterResults = ({
  resultData
}: AppointmentsFilterResultsPropsI) => {

  const [open, setOpen] = useState(false);
  const [slotElData, setSlotElData] = useState({});
  const slotData = useRef({});

  function getInitials(name: string) {
    const words = name.split(" ");
    const initials = words.map((word: string) => word.charAt(0).toUpperCase());
    return initials.join("");
  }

  const onOpenDialog = (slot : any) => {
    setSlotElData(slot)
    setOpen(true)    
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

    const dateOptions: any = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    const timeOptions: any = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString("en-US", dateOptions);
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

    return { formattedDate, formattedTime };
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

  // const [searchDay, setSearchDay] = useState(""); 

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchDay(event.target.value); 
  // };

  // const filteredSlots = slotsData.filter((slot: any) =>
  //   slot.weekDay.toLowerCase().includes(searchDay.toLowerCase())
  // );


  return (
    <Box sx={{ overflowY: "auto" }}>
      {/* <input
        type="text"
        placeholder="Search by day..."
        value={searchDay}
        onChange={handleSearchChange}
      /> */}
      <Grid container spacing={2}>
        {resultData?.map((slot: any, index: number) => {
          return (
            <Grid key={index} item lg={3} md={3} sm={6} xs={12} minWidth={270}>
              <Card
                sx={{
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
                  title={'Dr. ' + slot.doctor.name}
                  subheader={slot.clinic.name}

                />
                <CardContent sx={{ paddingBottom: "10px !important", paddingTop: "2px !important" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" color="text.secondary">
                      {formatDate(slot.date).formattedDate}
                      <br />
                      {formatDate(slot.date).formattedTime}
                    </Typography>
                    <Button
                      onClick={() => {
                        onOpenDialog(slot)
                        
                        
                      }}
                      sx={{
                        outline: "none",
                        borderWidth: "1.9px",
                        borderColor: " secondary.main",
                        borderStyle: "solid",
                        borderRadius: "6px",
                        width: "4rem",
                        textAlign: "center",
                        padding: "0.2rem",
                        color: "secondary.main",
                        cursor: "pointer"
                      }}
                    >
                      Book
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <AppointmentsBill slotData={slotElData} open={open} setOpen={setOpen} />
    </Box>
  );
};

export default AppointmentsFilterResults;
