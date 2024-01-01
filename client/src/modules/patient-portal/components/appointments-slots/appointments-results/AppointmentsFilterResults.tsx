import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

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
    <Box sx={{ overflowY: "auto" }}>
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
                  title={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1px",
                        cursor: "pointer",
                      }}
                    >
                      <span>{slot.doctor.name}</span>
                      <AddBoxRoundedIcon
                        sx={{ color: "secondary.main", fontSize: "1.8rem" }}
                      />
                    </div>
                  }
                  subheader={
                    <>
                      {formatDate(slot.date)[0]} <br></br>
                      {formatDate(slot.date)[1]}
                    </>
                  }
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
