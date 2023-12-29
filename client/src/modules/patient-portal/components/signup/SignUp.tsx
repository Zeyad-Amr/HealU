import { Box, Button, Grid, Typography } from "@mui/material";
import { useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomTextField from "../../../../core/components/CustomTextField";
import PatientDataHeader from "../patient-profile/PatientDataHeader";
import PrimaaryBtn from "../../../../core/components/PrimaaryBtn";
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
    gender: Yup.string().required(),
    DOB: Yup.string().required(),
    SSN: Yup.number().required(),
    email: Yup.string().required(),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required()
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
        background: " linear-gradient(285deg, #01B6B6 10.66%, #13D2DE 102.7%)",
      }}
    >
      <Box
        sx={{
          height: "95vh",
          width: "90vw",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "3rem",
          overflowY: "auto",
          boxShadow: "0 0 10px #00000080",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            padding: "0 3rem",
            marginBottom: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: "600",
              width: "100%",
              textAlign: "center",
            }}
          >
            Sign Up
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
                <Grid item lg={4} md={4} sm={6} xs={12}>
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
                <Grid item lg={4} md={4} sm={6} xs={12}>
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
                <Grid item lg={2} md={2} sm={6} xs={12}>
                  <CustomTextField
                    enable={true}
                    isRequired
                    name="gender"
                    label="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.gender}
                    touched={touched.gender}
                    width="100%"
                    props={{
                      type: "text",
                    }}
                  />
                </Grid>
                <Grid item lg={2} md={2} sm={6} xs={12}>
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
                      type: "text",
                    }}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={6} xs={12}>
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
                <Grid item lg={4} md={4} sm={6} xs={12}>
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
                <Grid item lg={2} md={2} sm={6} xs={12}>
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
                <Grid item lg={2} md={2} sm={6} xs={12}>
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
                      type: "text",
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
        <PrimaaryBtn title="Sign Up" Func={() => handleSubmit()} />
      </Box>
    </Box>
  );
};

export default Signup;
