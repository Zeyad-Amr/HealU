import React, { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { Box, Button, Grid } from "@mui/material";
import CustomTextField from "../../../../core/components/CustomTextField";
import PatientDataHeader from "./PatientDataHeader";
import PrimaaryBtn from "../../../../core/components/PrimaaryBtn";
import CustomHeader from "../../../../core/components/CustomHeader";

const PatientProfile = () => {
  const submitMedicalForm = useRef<any>();
  const submitOperationForm = useRef<any>();
  const submitDrugForm = useRef<any>();

  const handleMultiValues = (data: string, key: string) => {
    const arr: { IllnessDescription: string }[] = [];
    if (data !== "") {
      let names = data.split(",");

      names.forEach((name: string) => {
        response.current[key].push(
          key === "Illnesses"
            ? { IllnessDescription: name.trim() }
            : { ComplaintDescription: name.trim() }
        );
      });
      return arr;
    }
  };

  const response = useRef<any>({
    PatientID: 10,
    Illnesses: [
      {
        IllnessDescription: "Romatoid",
      },
    ],
    Operations: [
      {
        OperationName: "BrainAttachmment",
        OperationDate: "15/10/2015",
      },
    ],
    MedicalTests: [],
    Complaints: [
      {
        ComplaintDescription: "Bonesache",
      },
    ],
    Drugs: [
      {
        DName: "Flumox",
        DDuration: "5 days",
        DDose: "8.3 mm",
      },
      {
        DName: "Derosiev",
        DDuration: "2 weeks",
        DDose: "100 mm",
      },
    ],
  });

  const handleMedicalSubmit = () => {
    console.log(response.current);
  };

  const handleOperations = (obj: {}, key: string) => {
    response.current[key].push(obj);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////

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

  const [historyMode, setHistoryMode] = useState<boolean>(false);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginBottom: "1rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#fff",
            position: "absolute",
            left: "50%",
            top: "-1.5rem",
            transform: "translate(-50%, -50%)",
            padding: "0 2rem",
            borderRadius: "10px",
            boxShadow: "0px 8px 30px #006D6D30",
          }}
        >
          <Box
            sx={{
              marginRight: "1rem",
              padding: "1rem 0",
              borderBottom: `${
                !historyMode ? "2px solid #006D6D" : "2px solid #fff"
              }`,
              color: `${!historyMode ? "#000" : "#999"}`,
              transition: "0.2s",
              cursor: `${!historyMode ? "default" : "pointer"}`,
            }}
            onClick={() => setHistoryMode(false)}
          >
            Personal Data
          </Box>
          <Box
            sx={{
              padding: "1rem 0",
              borderBottom: `${
                historyMode ? "2px solid #006D6D" : "2px solid #fff"
              }`,
              color: `${historyMode ? "#000" : "#999"}`,
              transition: "0.2s",
              cursor: `${historyMode ? "default" : "pointer"}`,
            }}
            onClick={() => setHistoryMode(true)}
          >
            Medical Data
          </Box>
        </Box>

        {historyMode ? (
          //////////////////////////////////////
          <Box
            sx={{
              width: "100%",
              maxHeight: "calc(100% - 4rem)",
              overflowY: "auto",
            }}
          >
            <CustomHeader title="Medical Data" />
            <Box sx={{ marginTop: "1rem" }}>
              <Formik
                initialValues={{ illnesses: "", Complaints: "" }}
                onSubmit={(values) => {
                  handleMultiValues(values.illnesses, "Illnesses");
                  handleMultiValues(values.Complaints, "Complaints");

                  handleMedicalSubmit();
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
                    <Grid container spacing={2}>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <CustomTextField
                          enable={true}
                          isRequired
                          name="illnesses"
                          label="illnesses"
                          value={values.illnesses}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.illnesses}
                          touched={touched.illnesses}
                          width="100%"
                          props={{
                            type: "text",
                          }}
                        />
                        <Box
                          sx={{
                            marginTop: ".5rem",
                            minHeight: "2rem",
                            width: "100%",
                            backgroundColor: "#ddd",
                            borderRadius: "5px",
                            padding: "0rem  0.5rem 0.5rem",
                            display: "flex",
                            flexWrap: "wrap",
                          }}
                        >
                          {response.current.Illnesses.length !== 0 ? (
                            response.current.Illnesses.map((item: any) => (
                              <Box
                                sx={{
                                  backgroundColor: "#F4F4F4",
                                  borderRadius: "5px",
                                  height: "100%",
                                  width: "fit-content",
                                  color: "#444",
                                  padding: "0.5rem",
                                  fontSize: "1rem",
                                  marginRight: "0.5rem",
                                  marginTop: "0.5rem",
                                }}
                              >
                                {item.IllnessDescription}
                              </Box>
                            ))
                          ) : (
                            <Box
                              sx={{
                                backgroundColor: "#ddd",
                                borderRadius: "5px",
                                height: "100%",
                                width: "fit-content",
                                color: "#444",
                                padding: "0.5rem",
                                fontSize: "1rem",
                                marginRight: "0.5rem",
                                marginTop: "0.5rem",
                              }}
                            >
                              There is no Illnesses
                            </Box>
                          )}
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <CustomTextField
                          enable={true}
                          isRequired
                          name="Complaints"
                          label="Complaints"
                          value={values.Complaints}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.Complaints}
                          touched={touched.Complaints}
                          width="100%"
                          props={{
                            type: "text",
                          }}
                        />
                        <Box
                          sx={{
                            marginTop: ".5rem",
                            minHeight: "2rem",
                            width: "100%",
                            backgroundColor: "#ddd",
                            borderRadius: "5px",
                            padding: "0rem  0.5rem 0.5rem",
                            display: "flex",
                            flexWrap: "wrap",
                          }}
                        >
                          {response.current.Complaints.length !== 0 ? (
                            response.current.Complaints.map((item: any) => (
                              <Box
                                sx={{
                                  backgroundColor: "#F4F4F4",
                                  borderRadius: "5px",
                                  height: "100%",
                                  width: "fit-content",
                                  color: "#444",
                                  padding: "0.5rem",
                                  fontSize: "1rem",
                                  marginRight: "0.5rem",
                                  marginTop: "0.5rem",
                                }}
                              >
                                {item.ComplaintDescription}
                              </Box>
                            ))
                          ) : (
                            <Box
                              sx={{
                                backgroundColor: "#ddd",
                                borderRadius: "5px",
                                height: "100%",
                                width: "fit-content",
                                color: "#444",
                                padding: "0.5rem",
                                fontSize: "1rem",
                                marginRight: "0.5rem",
                                marginTop: "0.5rem",
                              }}
                            >
                              There is no Complaints
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      sx={{ display: "none" }}
                      ref={submitMedicalForm}
                    >
                      Done
                    </Button>
                  </Box>
                )}
              </Formik>
              <PatientDataHeader title="Operations" />

              <Formik
                initialValues={{ OperationName: "", OperationDate: "" }}
                onSubmit={(values, { resetForm }) => {
                  handleOperations(values, "Operations");
                  resetForm();
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
                    <Grid container spacing={2} sx={{ alignItems: "flex-end" }}>
                      <Grid item lg={5} md={5} sm={5} xs={12}>
                        <CustomTextField
                          enable={true}
                          isRequired
                          name="OperationName"
                          label="Operation Name"
                          value={values.OperationName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.OperationName}
                          touched={touched.OperationName}
                          width="100%"
                          props={{
                            type: "text",
                          }}
                        />
                      </Grid>
                      <Grid item lg={5} md={5} sm={5} xs={12}>
                        <CustomTextField
                          enable={true}
                          isRequired
                          name="OperationDate"
                          label="Operation Date"
                          value={values.OperationDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.OperationDate}
                          touched={touched.OperationDate}
                          width="100%"
                          props={{
                            type: "date",
                          }}
                        />
                      </Grid>
                      <Grid item lg={2} md={2} sm={2} xs={12}>
                        <PrimaaryBtn
                          title="add"
                          Func={() => submitOperationForm.current.click()}
                          sx={{ marginBottom: "0.5rem" }}
                        />
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={7}>
                        <Box
                          sx={{
                            marginTop: "-.5rem",
                            minHeight: "2rem",
                            width: "100%",
                            backgroundColor: "#ddd",
                            borderRadius: "5px",
                            padding: "0rem  0.5rem 0.5rem",
                            display: "flex",
                            flexWrap: "wrap",
                          }}
                        >
                          {response.current.Operations.length !== 0 ? (
                            response.current.Operations.map((item: any) => (
                              <Box
                                sx={{
                                  backgroundColor: "#F4F4F4",
                                  borderRadius: "5px",
                                  height: "100%",
                                  width: "fit-content",
                                  color: "#444",
                                  padding: "0.5rem",
                                  fontSize: "1rem",
                                  marginRight: "0.5rem",
                                  marginTop: "0.5rem",
                                }}
                              >
                                {item.OperationName} at {item.OperationDate}
                              </Box>
                            ))
                          ) : (
                            <Box
                              sx={{
                                backgroundColor: "#ddd",
                                borderRadius: "5px",
                                height: "100%",
                                width: "fit-content",
                                color: "#444",
                                padding: "0.5rem",
                                fontSize: "1rem",
                                marginRight: "0.5rem",
                                marginTop: "0.5rem",
                              }}
                            >
                              There is no Opperations
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      sx={{ display: "none" }}
                      ref={submitOperationForm}
                    >
                      Done
                    </Button>
                  </Box>
                )}
              </Formik>
              <PatientDataHeader title="Drugs" />

              <Formik
                initialValues={{ DName: "", DDuration: "", DDose: "" }}
                onSubmit={(values, { resetForm }) => {
                  handleOperations(values, "Drugs");
                  resetForm();
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
                    <Grid container spacing={2} sx={{ alignItems: "flex-end" }}>
                      <Grid item lg={4} md={4} sm={4} xs={12}>
                        <CustomTextField
                          enable={true}
                          isRequired
                          name="DName"
                          label="Drug Name"
                          value={values.DName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.DName}
                          touched={touched.DName}
                          width="100%"
                          props={{
                            type: "text",
                          }}
                        />
                      </Grid>
                      <Grid item lg={3} md={3} sm={3} xs={12}>
                        <CustomTextField
                          enable={true}
                          isRequired
                          name="DDuration"
                          label="Drug Duration"
                          value={values.DDuration}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.DDuration}
                          touched={touched.DDuration}
                          width="100%"
                          props={{
                            type: "text",
                          }}
                        />
                      </Grid>
                      <Grid item lg={3} md={3} sm={3} xs={12}>
                        <CustomTextField
                          enable={true}
                          isRequired
                          name="DDose"
                          label="Drug Dose"
                          value={values.DDose}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.DDose}
                          touched={touched.DDose}
                          width="100%"
                          props={{
                            type: "text",
                          }}
                        />
                      </Grid>
                      <Grid item lg={2} md={2} sm={2} xs={12}>
                        <PrimaaryBtn
                          title="add"
                          Func={() => submitDrugForm.current.click()}
                          sx={{ marginBottom: "0.5rem" }}
                        />
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={7}>
                        <Box
                          sx={{
                            marginTop: "-.5rem",
                            minHeight: "2rem",
                            width: "100%",
                            backgroundColor: "#ddd",
                            borderRadius: "5px",
                            padding: "0rem  0.5rem 0.5rem",
                            display: "flex",
                            flexWrap: "wrap",
                          }}
                        >
                          {response.current.Drugs.length !== 0 ? (
                            response.current.Drugs.map((item: any) => (
                              <Box
                                sx={{
                                  backgroundColor: "#F4F4F4",
                                  borderRadius: "5px",
                                  height: "100%",
                                  width: "fit-content",
                                  color: "#444",
                                  padding: "0.5rem",
                                  fontSize: "1rem",
                                  marginRight: "0.5rem",
                                  marginTop: "0.5rem",
                                }}
                              >
                                {item.DDose} of {item.DName} for{" "}
                                {item.DDuration}
                              </Box>
                            ))
                          ) : (
                            <Box
                              sx={{
                                backgroundColor: "#ddd",
                                borderRadius: "5px",
                                height: "100%",
                                width: "fit-content",
                                color: "#444",
                                padding: "0.5rem",
                                fontSize: "1rem",
                                marginRight: "0.5rem",
                                marginTop: "0.5rem",
                              }}
                            >
                              There is no Drugs
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      sx={{ display: "none" }}
                      ref={submitDrugForm}
                    >
                      Done
                    </Button>
                  </Box>
                )}
              </Formik>
              <Box>
                <PrimaaryBtn
                  title="Done"
                  Func={() => {
                    submitMedicalForm.current.click();
                  }}
                  sx={{ margin: "1rem auto 0", width: "fit-content" }}
                />
              </Box>
            </Box>
          </Box>
        ) : (
          /////////////////////////////////////
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <CustomHeader title="Personal Data" />
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
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PrimaaryBtn
                    title="Update"
                    Func={() => setIsUpdating(true)}
                  />
                </Box>
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
                  <Button
                    type="submit"
                    sx={{ display: "none" }}
                    ref={submitForm}
                  >
                    Done
                  </Button>
                </Box>
              )}
            </Formik>
          </Box>
        )}
      </Box>
    </>
  );
};

export default PatientProfile;
