import React, { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { Box, Button, Grid, Typography } from "@mui/material";
import CustomTextField from "../../../../core/components/CustomTextField";
import PatientDataHeader from "./PatientDataHeader";
import PrimaaryBtn from "../../../../core/components/PrimaaryBtn";

const PatientProfile = () => {
  const initialValues = {
    userName: "ahmedsy12",
    password: "",
    firstName: "ahmed",
    secondName: "sayed",
    gender: "male",
    DOB: "12/12/2000",
    SSN: "12312312312322",
    email: "example@example.com",
    phone: "",
    insurancePersentage: "25%",
    emergencyContactName: "Abdelrhman Yaser",
    emergencyContactNumber: "01211035528",
  };
  const submitForm = useRef<any>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const handleFormSchema = Yup.object({
    userName: Yup.string().required("Username Should be entered"),
    newPassword: Yup.string(),
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
    emergencyContactName: Yup.string(),
    emergencyContactNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required()
      .max(11, "phone number should be 11 number")
      .min(11, "phone number should be 11 number"),
  });

  const handleSubmit = () => {
    submitForm.current.click();
  };

  return (
    <>
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
        <Typography sx={{ fontSize: "2rem", fontWeight: "600" }}>
          My Data
        </Typography>
        {isUpdating ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PrimaaryBtn title="done" Func={handleSubmit} />
            <Box
              sx={{ cursor: "pointer", marginLeft: "1rem" }}
              onClick={() => setIsUpdating(false)}
            >
              Cancel
            </Box>
          </Box>
        ) : (
          <PrimaaryBtn title="Update" Func={() => setIsUpdating(true)} />
        )}
      </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={handleFormSchema}
        onSubmit={(values) => {
          console.log(values);
          setIsUpdating(false);
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
            <PatientDataHeader title="User Data" />
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <CustomTextField
                  enable={isUpdating}
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
                  enable={isUpdating}
                  isRequired
                  name="password"
                  label="New Password"
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
            <PatientDataHeader title="Personal Data" />
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <CustomTextField
                  enable={isUpdating}
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
                  enable={isUpdating}
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
                  enable={isUpdating}
                  nonEditable
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
                  enable={isUpdating}
                  nonEditable
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
                  enable={isUpdating}
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
                  enable={isUpdating}
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
                  enable={isUpdating}
                  nonEditable
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
              <Grid item lg={1} md={1} sm={6} xs={12}>
                <CustomTextField
                  enable={isUpdating}
                  nonEditable
                  isRequired
                  name="insurancePersentage"
                  label="insurance"
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
            <PatientDataHeader title="Emergency Contact" />
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <CustomTextField
                  enable={isUpdating}
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
                  enable={isUpdating}
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
    </>
  );
};

export default PatientProfile;
