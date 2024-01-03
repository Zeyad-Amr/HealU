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
import { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomTextField from "../../../../core/components/CustomTextField";
import PatientDataHeader from "../../../patient-portal/components/patient-profile/PatientDataHeader";
import PrimaaryBtn from "../../../../core/components/PrimaaryBtn";
import CustomHeader from "../../../../core/components/CustomHeader";
import HeaderComponent from "../../../patient-portal/components/header";
import { useNavigate } from "react-router-dom";
import UserModel from "../../models/user-model";
import { register } from "../../slices/user-slice";
import { useAppDispatch } from "../../../../core/store";
import { login } from "../../../auth/slices/auth-slice";
import MedicalHistory from "../../../patient-portal/components/medical-history/MedicalHistory";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues: UserModel = {
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    ssn: "",
    email: "",
    phoneNumber: "",
    insurancePersentage: 0.0,
    emergencyContactName: "",
    emergencyContactNumber: "",
    clinicId: 0,
  };

  const submitForm = useRef<any>();
  const handleFormSchema = Yup.object({
    userName: Yup.string().required("Username Should be entered"),
    password: Yup.string().required("Password Should be entered"),
    firstName: Yup.string().required("First Name Should be entered"),
    lastName: Yup.string().required("Second Name Should be entered"),
    gender: Yup.string().required("Gender Should be entered"),
    dateOfBirth: Yup.string().required("Date Of Birth Should be entered"),
    ssn: Yup.string()
      .required("ssn Should be entered")
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(14, "SSN should be 14 number")
      .min(14, "SSN should be 14 number"),
    email: Yup.string().required("Email Should be entered"),
    phoneNumber: Yup.string()
      .required("Phone Should be entered")
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(11, "phoneNumber number should be 11 number")
      .min(11, "phoneNumber number should be 11 number"),
    emergencyContactName: Yup.string().required(
      "Emergency Contact Name Should be entered"
    ),
    emergencyContactNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Emergency Contact Number Should be entered")
      .max(11, "phoneNumber number should be 11 number")
      .min(11, "phoneNumber number should be 11 number"),
    insurancePersentage: Yup.number(),
  });

  const handleSubmit = () => {
    submitForm.current.click();
  };
  const [displayHistory, setDisplayHistory] = useState<boolean>(false);

  return (
    <Box sx={{ position: "relative" }}>
      <MedicalHistory display={displayHistory} />
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
            margin: "0 auto",

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
              onClick={() => navigate("/login")}
            >
              Already has an account?
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={handleFormSchema}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              dispatch(register(values)).then((res) => {
                console.log("res", res);
                if (res.payload.data) {
                  dispatch(
                    login({
                      username: values.userName,
                      password: values.password,
                    })
                  );
                  resetForm();
                  setDisplayHistory(true);
                } else {
                  alert(res.payload.response.data.error);
                }
              });
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
                      name="lastName"
                      label="second Name"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.lastName}
                      touched={touched.lastName}
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
                      name="dateOfBirth"
                      label="Date of Birth"
                      value={values.dateOfBirth}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.dateOfBirth}
                      touched={touched.dateOfBirth}
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
                      name="phoneNumber"
                      label="phoneNumber Number"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.phoneNumber}
                      touched={touched.phoneNumber}
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
                      name="ssn"
                      label="National Number"
                      value={values.ssn}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.ssn}
                      touched={touched.ssn}
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
                      label="Insurance Persentage"
                      value={values.insurancePersentage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.insurancePersentage}
                      touched={touched.insurancePersentage}
                      width="100%"
                      props={{
                        type: "number",
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
    </Box>
  );
};

export default Signup;
