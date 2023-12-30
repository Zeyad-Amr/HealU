import { Box, Button, Typography } from "@mui/material";
import React, { useRef } from "react";
import CustomTextField from "../../../core/components/CustomTextField";
import { Formik } from "formik";
import * as Yup from "yup";
import PrimaaryBtn from "../../../core/components/PrimaaryBtn";

const Login = () => {
  const initialValues = {
    userName: "",
    password: "",
  };

  const formSubmit = useRef<any>();

  const handleFormSchema = Yup.object({
    userName: Yup.string().required("Username Should be entered"),
    password: Yup.string().required("Password Should be entered"),
  });
  return (
    <>
      <Box sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            overflow: "hidden",
            width: "100vw",
            height: "100vh",
            background:
              " linear-gradient(285deg, #01B6B6 10.66%, #13D2DE 102.7%)",
            borderTopLeftRadius: "100rem",
            borderTopRightRadius: "100rem",
            transform: "translateY(50%)",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          width: "25rem",
          height: "30rem",
          backgroundColor: "white",
          filter: "drop-shadow(0 0 3px #00000080)",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "15px",
        }}
      >
        <Box sx={{ padding: "2rem 2rem" }}>
          <Typography
            sx={{
              minWidth: "100%",
              fontSize: "1.5rem",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Log In
          </Typography>
          <Box sx={{ padding: "3rem 0" }}>
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
                  <CustomTextField
                    enable={true}
                    isRequired
                    name="userName"
                    label="Usersame"
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
                  <Button
                    type="submit"
                    sx={{ display: "none" }}
                    ref={formSubmit}
                  >
                    done
                  </Button>
                </Box>
              )}
            </Formik>
          </Box>
          <PrimaaryBtn title="log in" Func={() => formSubmit.current.click()} />
        </Box>
      </Box>
    </>
  );
};

export default Login;
