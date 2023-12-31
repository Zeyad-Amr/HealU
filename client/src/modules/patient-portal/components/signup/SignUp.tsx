import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomTextField from "../../../../core/components/CustomTextField";
import PatientDataHeader from "../patient-profile/PatientDataHeader";
import PrimaaryBtn from "../../../../core/components/PrimaaryBtn";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import CustomHeader from "../../../../core/components/CustomHeader";
import HeaderComponent from "../header";
const Signup = () => {
  const initialValues = {
    userName: "",
    password: "",
    firstName: "",
    secondName: "",
    gender: "",
    DOB: "",
    SSN: "",
    email: "",
    phone: "",
    insurancePersentage: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
  };
  const submitForm = useRef<any>();
  const handleFormSchema = Yup.object({
    userName: Yup.string().required("Username Should be entered"),
    password: Yup.string().required("Password Should be entered"),
    firstName: Yup.string().required("First Name Should be entered"),
    secondName: Yup.string().required("Second Name Should be entered"),
    gender: Yup.string().required("Gender Should be entered"),
    DOB: Yup.string().required("Date Of Birth Should be entered"),
    SSN: Yup.string()
      .required("SSN Should be entered")
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(14, "phone number should be 14 number")
      .min(14, "phone number should be 14 number"),
    email: Yup.string().required("Email Should be entered"),
    phone: Yup.string()
      .required("Phone Should be entered")
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(11, "phone number should be 11 number")
      .min(11, "phone number should be 11 number"),
    emergencyContactName: Yup.string().required(
      "Emergency Contact Name Should be entered"
    ),
    emergencyContactNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Emergency Contact Number Should be entered")
      .max(11, "phone number should be 11 number")
      .min(11, "phone number should be 11 number"),
  });

  const handleSubmit = () => {
    submitForm.current.click();
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          width: "100vw",
          height: "100vh",
          background:
            " linear-gradient(285deg, #01B6B6 10.66%, #13D2DE 102.7%)",
          borderTopLeftRadius: "100rem",
          borderTopRightRadius: "100rem",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "-1",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#1f1f1f",
          zIndex: "-2",
        }}
      ></Box>
      <HeaderComponent />
      <Box
        sx={{
          height: "87vh",
          width: "95vw",
          margin:"0 auto",

          backgroundColor: "white",
          borderRadius: "15px",
          padding: "2rem 3rem",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <CustomHeader title="Sign Up" />
          <Typography
            sx={{
              width: "100%",
              textAlign: "right",
              cursor: "pointer",
              color: "secondary.main",
            }}
          >
            Already has an account?
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={handleFormSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <PatientDataHeader title="Personal Data" />
              <Grid container spacing={2}>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <CustomTextField
                    enable={true}
                    isRequired
                    name="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.firstName}
                    touched={touched.firstName}
                    width="100%"
                    props={{
                      type: "text",
                    }}
                  />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <CustomTextField
                    enable={true}
                    isRequired
                    name="secondName"
                    label="second Name"
                    value={values.secondName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.secondName}
                    touched={touched.secondName}
                    width="100%"
                    props={{
                      type: "text",
                    }}
                  />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <CustomTextField
                    enable={true}
                    isRequired
                    name="DOB"
                    label="Date of Birth"
                    value={values.DOB}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.DOB}
                    touched={touched.DOB}
                    width="100%"
                    props={{
                      type: "date",
                    }}
                  />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <FormControl>
                    <Typography>Gender</Typography>
                    <RadioGroup
                      sx={{ height: "4rem" }}
                      row
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio required size="small" />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio required size="small" />}
                        label="Female"
                      />
                    </RadioGroup>
                    <FormHelperText
                      sx={{
                        color: "#FF5630",
                        paddingLeft: "1rem",
                      }}
                    >
                      {handleFormSchema.isValidSync(values) || (
                        <div>{errors.gender}</div>
                      )}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <CustomTextField
                    enable={true}
                    isRequired
                    name="email"
                    label="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    touched={touched.email}
                    width="100%"
                    props={{
                      type: "text",
                    }}
                  />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <CustomTextField
                    enable={true}
                    isRequired
                    name="phone"
                    label="phone Number"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.phone}
                    touched={touched.phone}
                    width="100%"
                    props={{
                      type: "text",
                    }}
                  />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <CustomTextField
                    enable={true}
                    isRequired
                    name="SSN"
                    label="National Number"
                    value={values.SSN}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.SSN}
                    touched={touched.SSN}
                    width="100%"
                    props={{
                      type: "text",
                    }}
                  />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <CustomTextField
                    enable={true}
                    isRequired
                    name="insurancePersentage"
                    label="insurance Number"
                    value={values.insurancePersentage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.insurancePersentage}
                    touched={touched.insurancePersentage}
                    width="100%"
                    props={{
                      type: "text",
                    }}
                  />
                </Grid>
              </Grid>
              <PatientDataHeader title="User Data" />
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    enable={true}
                    isRequired
                    name="userName"
                    label="Username"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.userName}
                    touched={touched.userName}
                    width="100%"
                    props={{
                      type: "text",
                    }}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    enable={true}
                    isRequired
                    name="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                    touched={touched.password}
                    width="100%"
                    props={{
                      type: "password",
                    }}
                  />
                </Grid>
              </Grid>
              <PatientDataHeader title="Emergency Contact" />
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    enable={true}
                    isRequired
                    name="emergencyContactName"
                    label="Emergency Contact Name"
                    value={values.emergencyContactName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.emergencyContactName}
                    touched={touched.emergencyContactName}
                    width="100%"
                    props={{
                      type: "text",
                    }}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    enable={true}
                    isRequired
                    name="emergencyContactNumber"
                    label="Emergency Contact Number"
                    value={values.emergencyContactNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.emergencyContactNumber}
                    touched={touched.emergencyContactNumber}
                    width="100%"
                    props={{
                      type: "text",
                    }}
                  />
                </Grid>
              </Grid>
              <Button type="submit" sx={{ display: "none" }} ref={submitForm}>
                Done
              </Button>
            </Box>
          )}
        </Formik>
        <PrimaaryBtn
          title="Sign Up"
          Func={() => handleSubmit()}
          sx={{ width: "15rem", margin: "1rem auto 0" }}
        />
      </Box>
    </Box>
  );
};

export default Signup;
