import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import CustomHeader from "../../../../core/components/CustomHeader";
import { Formik } from "formik";
import CustomTextField from "../../../../core/components/CustomTextField";
import { useRef } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PrimaaryBtn from "../../../../core/components/PrimaaryBtn";
import PatientDataHeader from "../patient-profile/PatientDataHeader";
import AppRoutes from "../../../../core/routes/AppRoutes";
import { useNavigate } from "react-router-dom";

interface MedicalHistoryProps {
  display: boolean;
}

const MedicalHistory = ({ display }: MedicalHistoryProps) => {
  const navigate = useNavigate();
  const submitMedicalForm = useRef<any>();
  const submitOperationForm = useRef<any>();
  const submitDrugForm = useRef<any>();

  const [dialogShow, setDialogShow] = useState<boolean>(true);
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
    Illnesses: [],
    Operations: [],
    MedicalTests: [],
    Complaints: [],
    Drugs: [],
  });

  const handleMedicalSubmit = () => {
    console.log(response.current);
    setDialogShow(false);
    navigate(AppRoutes.home);
    //TODO: Call API
  };

  const handleOperations = (obj: {}, key: string) => {
    response.current[key].push(obj);
  };

  return (
    <Box
      sx={{
        display: dialogShow && display ? "block" : "none",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#00000080",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "100",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "15px",
          width: "100%",
          height: "100%",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "101",
          padding: "2rem 0",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "2rem",
            right: "3rem",
            cursor: "pointer",
          }}
          onClick={() => {
            setDialogShow(false);
            navigate(AppRoutes.home);
          }}
        >
          <CloseRoundedIcon />
        </Box>
        <Box sx={{ paddingX: "3rem", marginBottom: "1rem" }}>
          <CustomHeader title="Medical History" />
        </Box>
        <Box
          sx={{
            maxHeight: "calc(100% - 4rem)",
            overflowY: "auto",
            paddingX: "3rem",
          }}
        >
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
                            {item.DDose} of {item.DName} for {item.DDuration}
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
    </Box>
  );
};

export default MedicalHistory;
