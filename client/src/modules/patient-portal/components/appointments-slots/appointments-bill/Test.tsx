import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid } from "@mui/material";
import CustomTextField from "../../../../../core/components/CustomTextField";

const Test = () => {
  const [state, setState] = useState<any>({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const initialValues = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  };

  const handleFormSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    number: Yup.string().required("Number is required"),
    expiry: Yup.string().required("Expiry is required"),
    cvc: Yup.string().required("CVC is required"),
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setState((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e: any) => {
    setState((prev: any) => ({ ...prev, focus: e.target.name }));
  };
  const handleSubmit = (values : any) => {
    console.log(state);
    console.log(values);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "1rem" }}>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={handleFormSchema}
        onSubmit={(values) => {
            handleSubmit(values)
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
                  name="number"
                  label="Number"
                  value={values.number}
                  onChange={(e) => {
                    handleChange(e);
                    handleInputChange(e);
                  }}
                  onBlur={handleBlur}
                  error={errors.number}
                  touched={touched.number}
                  onFocus={handleInputFocus}
                  width="100%"
                  props={{
                    type: "number",
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <CustomTextField
                  enable={true}
                  isRequired
                  name="expiry"
                  label="Expiry"
                  value={values.expiry}
                  onChange={(e) => {
                    handleChange(e);
                    handleInputChange(e);
                  }}
                  onBlur={handleBlur}
                  error={errors.expiry}
                  touched={touched.expiry}
                  onFocus={handleInputFocus}
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
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={(e) => {
                    handleChange(e);
                    handleInputChange(e);
                  }}
                  onBlur={handleBlur}
                  error={errors.name}
                  touched={touched.name}
                  onFocus={handleInputFocus}
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
                  name="cvc"
                  label="CVC"
                  value={values.cvc}
                  onChange={(e) => {
                    handleChange(e);
                    handleInputChange(e);
                  }}
                  onBlur={handleBlur}
                  error={errors.cvc}
                  touched={touched.cvc}
                  onFocus={handleInputFocus}
                  width="100%"
                  props={{
                    type: "number",
                  }}
                />
              </Grid>
            </Grid>
            <Button type="submit">
              Done
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Test;
