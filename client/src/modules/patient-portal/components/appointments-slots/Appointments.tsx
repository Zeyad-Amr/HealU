import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import axios from "../../../../core/api/api";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CustomHeader from "../../../../core/components/CustomHeader";
import AppointmentsFilterResults from "./appointments-results/AppointmentsFilterResults";
import AppointmentsBill from "./appointments-bill/AppointmentsBill";

const api_URL = "https://healu-api-gateway.onrender.com";

const Appointments = () => {
  const today = dayjs();
  const dateAfterWeek = today.add(7, "day");
  const [selectedFromDate, setSelectedFromDate] = useState(today);
  const [selectedToDate, setSelectedToDate] = useState(dateAfterWeek);
  const [allClinicsData, setAllClinicsData] = useState<any>([]);
  const [allDoctorsData, setAllDoctorsData] = useState<any>([]);
  const [filterResults, setFilterResults] = useState<any>([]);
  const [clinicIdData, setClinicIdData] = useState<any>(1);
  const [doctorIdData, setDoctorIdData] = useState<any>(0);

  // useRef

  useEffect(() => {
    loadAllClinics();
  }, []);

  const loadAllClinics = () => {
    axios
      .get(`/admin/clinic`)
      .then((res: any) => {
        console.log(res);

        setAllClinicsData(res.data.data.clinics);
        setClinicIdData(res.data.data.clinics[0].id);
        loadAllDoctorsByClinicId(res.data.data.clinics[0].id);
        onSearch(doctorIdData, res.data.data.clinics[0].id, selectedFromDate, selectedToDate);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const loadAllDoctorsByClinicId = (clinicId: number) => {
    console.log(clinicId);
    axios
      .get(`/registration/staff/clinic/${clinicId}`)
      .then((res: any) => {
        console.log(res.data.data);
        setAllDoctorsData(res.data.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const onSearch = (
    doctorId: number,
    clinicId: number,
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs
  ) => {
    const formattedStartDate = startDate.format("YYYY-MM-DD");
    const formattedEndDate = endDate.format("YYYY-MM-DD");
    const doctorIdModified = doctorId === 0 ? 0 : doctorId;
    const req = {
      doctorIdModified,
      clinicId,
      formattedStartDate,
      formattedEndDate,
    };
    console.log("onSearch", req);

    axios
      .get(
        `${api_URL}/api/data/slots?clinicId=${clinicId}&doctorId=${doctorIdModified}&reqStartDate=${formattedStartDate}&reqEndDate=${formattedEndDate}`,
        {
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwMzY2NjAwMX0.nWs6p02Jbm0EDQya2iQht5R129bU2hLIk80A4kdHgDY",
          },
        }
      )
      .then((res: any) => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.slots);
        setFilterResults(res.data.slots);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleFromDateChange = (fromDate: any) => {
    if (selectedToDate.isBefore(fromDate)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date Range",
      });
    } else {
      setSelectedFromDate(fromDate);
      onSearch(
        doctorIdData,
        clinicIdData,
        fromDate,
        selectedToDate
      );
    }
  };

  const handleToDateChange = (toDate: any) => {
    if (toDate.isBefore(selectedFromDate)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date Range",
      });
    } else {
      setSelectedToDate(toDate);
      onSearch(
        doctorIdData,
        clinicIdData,
        selectedFromDate,
        toDate
      );
    }
  };

  const onChangeDoctors = (event: any) => {
    console.log(event.target.value);
    
    setDoctorIdData(event.target.value);
    onSearch(
      event.target.value,
      clinicIdData,
      selectedFromDate,
      selectedToDate
    );
    console.log(event.target.value);
  };

  const onChangeClinics = (event: any) => {
    setClinicIdData(event.target.value);
    loadAllDoctorsByClinicId(event.target.value);
    onSearch(
      doctorIdData,
      event.target.value,
      selectedFromDate,
      selectedToDate
    );
  };

  const onClear = () => {
    setDoctorIdData(0);
    setClinicIdData(allClinicsData[0].id);
    loadAllDoctorsByClinicId(allClinicsData[0].id);
    setSelectedFromDate(today);
    setSelectedToDate(dateAfterWeek);
    onSearch(doctorIdData,clinicIdData,selectedFromDate,selectedToDate)
  };

  console.log(allClinicsData);

  return (
    <>
      <CustomHeader
        separatorColor="primary.main"
        title="Appointments"
        separatorWidth="50px"
      />
      <Box sx={{ marginTop: "1.5rem" }}>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-label">Clinics</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={clinicIdData}
                label="Clinics"
                onChange={onChangeClinics}
              >
                {allClinicsData.map((clinic: any, index: number) => {
                  return (
                    <MenuItem key={index} value={clinic.id}>
                      {clinic.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <FormControl sx={{ width: "100%", height: "5rem" }}>
              <InputLabel id="demo-simple-select-label">Doctors</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={doctorIdData}
                label="Clinics"
                onChange={onChangeDoctors}
              >
                <MenuItem value={doctorIdData}>All Doctors</MenuItem>
                {allDoctorsData.map((doctor: any, index: number) => {
                  return (
                    <MenuItem key={index} value={doctor.userId}>
                      {doctor.firstName + " " + doctor.lastName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%", height: "56px" }}
                label="Start Date"
                value={selectedFromDate}
                onChange={handleFromDateChange}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%", height: "56px" }}
                label="To Date"
                value={selectedToDate}
                onChange={handleToDateChange}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1rem",
          }}
        >
          {/* <Box
            sx={{
              width: "4.5rem",
              backgroundColor: "primary.main",
              color: "#fff",
              padding: "0.4rem",
              cursor: "pointer",
              borderRadius: "6px",
              margin: "0.5rem",
              textAlign: "center",
            }}
            onClick={() => {
              onSearch(
                doctorIdData,
                clinicIdData,
                selectedFromDate,
                selectedToDate
              );
            }}
          >
            Search
          </Box> */}
          <Box
            sx={{
              width: "4.5rem",
              textAlign: "center",
              borderColor: "primary.main",
              borderStyle: "solid",
              borderWidth: "1px",
              backgroundColor: "transparent",
              cursor: "pointer",
              color: "primary.main",
              padding: "0.4rem",
              borderRadius: "6px",
              margin: "0.5rem",
            }}
            onClick={onClear}
          >
            Clear
          </Box>
        </Box>
        <AppointmentsFilterResults resultData={filterResults} />
      </Box>
    </>
  );
};

export default Appointments;
