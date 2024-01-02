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
import CustomizedDialogs from "../appointment-detalis-dialog/AppointmentDialog";

interface AppointmentsFilterResultsPropsI {
  resultData?: any[];
}

const appointmentsData = [
  {
    appointmentId: "65907994700d89f2bf445d2a",
    doctor: {
      id: 1,
      name: "Ali Mahmoud"
    },
    clinic: {
      id: 4,
      name: "SkinSolutions Dermatology",
      description: "Expert care for skin health"
    },
    prescription: {
      PrescriptionID: 3,
      PatientID: 2,
      AppointmentID: "65907994700d89f2bf445d2a",
      DoctorName: "Dr. Ahmed",
      Diagnosis: "Cold and have to rest in home",
      ExtraNotes: "",
      CreatedAt: "2023-12-30T22:05:05.000Z",
      drug: [
        {
          DrugID: 7,
          DrugName: "Panadol Extra",
          DrugDuration: "1 Month",
          DrugDose: "3 Times"
        },
        {
          DrugID: 25,
          DrugName: "Fluoride Toothpaste",
          DrugDuration: "Indefinite",
          DrugDose: "As needed for brushing"
        },
        {
          DrugID: 18,
          DrugName: "Ibuprofen",
          DrugDuration: "3 Weeks",
          DrugDose: "2 Times daily"
        },
        {
          DrugID: 7,
          DrugName: "Panadol Extra",
          DrugDuration: "1 Month",
          DrugDose: "3 Times"
        },
        {
          DrugID: 18,
          DrugName: "Ibuprofen",
          DrugDuration: "3 Weeks",
          DrugDose: "2 Times daily"
        },
        {
          DrugID: 7,
          DrugName: "Panadol Extra",
          DrugDuration: "1 Month",
          DrugDose: "3 Times"
        },
      ]
    }
  },
  {
    appointmentId: "1234567890abcdef",
    doctor: {
      id: 2,
      name: "Sarah Johnson"
    },
    clinic: {
      id: 2,
      name: "CardioCare Clinic",
      description: "Specializing in cardiovascular health"
    },
    medicalRecord: {
      vitals: {
        BloodPressure: "60/120",
        RespirationRate: "95",
        HeartRate: "85",
        DiabeticTest: "-ve",
        SPO2: "99"
      }
      ,
      EyeMeasurement:
      {
        LeftEye: "5.95",
        RightEye: "5.2"
      }

    },
    medicalTests: [
      {
        TestID: 19,
        TestDescription: "Virus-C"
      },
      {
        TestID: undefined,
        TestDescription: "Virus-B"
      }
    ],
    prescription: {
      PrescriptionID: 5,
      PatientID: 1,
      AppointmentID: "1234567890abcdef",
      DoctorName: "Dr. Smith",
      Diagnosis: "High blood pressure",
      ExtraNotes: "Monitor blood pressure regularly",
      CreatedAt: "2023-12-31T10:15:30.000Z",
      drug: [
        {
          id: 11,
          DrugName: "Lisinopril",
          DrugDuration: "2 Months",
          DrugDose: "1 Time daily"
        }
      ]
    }
  },
  {
    appointmentId: "a1b2c3d4e5f6",
    doctor: {
      id: 3,
      name: "Emily Rodriguez"
    },
    clinic: {
      id: 5,
      name: "OrthoCare Center",
      description: "Orthopedic specialists for bone and joint health"
    },
    medicalRecord: {
      Nutrition: {
        DietPlan: "Inblanace lorem mal omega mass mass mass mass mass mass mass mass mass mass mass mass mass mass mass mass mass",
        Inbody: "110"
      }
    },
    prescription: {
      PrescriptionID: 8,
      PatientID: 3,
      AppointmentID: "a1b2c3d4e5f6",
      DoctorName: "Dr. Taylor",
      Diagnosis: "Sprained ankle",
      ExtraNotes: "Avoid putting weight on the ankle",
      CreatedAt: "2023-12-31T15:45:20.000Z",
      drug: [
        {
          DrugID: 18,
          DrugName: "Ibuprofen",
          DrugDuration: "3 Weeks",
          DrugDose: "2 Times daily"
        }
      ]
    }
  },
  // Add more records as needed
  // Record 4
  {
    appointmentId: "b4a5b6c7d8e9",
    doctor: {
      id: 4,
      name: "John Anderson"
    },
    clinic: {
      id: 3,
      name: "DentalCare Clinic",
      description: "Comprehensive dental care"
    },
    prescription: {
      PrescriptionID: 12,
      PatientID: 4,
      AppointmentID: "b4a5b6c7d8e9",
      DoctorName: "Dr. Johnson",
      Diagnosis: "Cavity filling needed",
      ExtraNotes: "Avoid eating for 1 hour after the procedure",
      CreatedAt: "2023-12-31T18:30:45.000Z",
      drug: [
        {
          DrugID: 25,
          DrugName: "Fluoride Toothpaste",
          DrugDuration: "Indefinite",
          DrugDose: "As needed for brushing"
        }
      ]
    }
  },
  // Record 5
  {
    appointmentId: "c1d2e3f4g5h6",
    doctor: {
      id: 5,
      name: "Michael Taylor"
    },
    clinic: {
      id: 1,
      name: "VisionCare Optometry",
      description: "Comprehensive eye care services"
    },
    prescription: {
      PrescriptionID: 15,
      PatientID: 5,
      AppointmentID: "c1d2e3f4g5h6",
      DoctorName: "Dr. Davis",
      Diagnosis: "Prescription for new glasses",
      ExtraNotes: "Visit the optical shop for frame selection",
      CreatedAt: "2024-01-01T09:20:15.000Z",
      drug: [
        {
          DrugID: 32,
          DrugName: "Eyeglasses",
          DrugDuration: "Indefinite",
          DrugDose: "Wear as needed"
        }
      ]
    }
  },
  // Add more data objects as needed
]

const PreviousAppointmentsCard = ({
  resultData,
}: AppointmentsFilterResultsPropsI) => {
  const [open, setOpen] = useState(false);
  const [appt, setAppt] = useState<any>(appointmentsData[0]);

  const handleClickOpen = (appt: any) => {
    setAppt(appt);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
                    <IconButton onClick={() => handleClickOpen(appointment)} aria-label="settings">
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
      <CustomizedDialogs handleClose={handleClose} open={open} appointment={appt} />
    </Box>

  );
};

export default PreviousAppointmentsCard;
