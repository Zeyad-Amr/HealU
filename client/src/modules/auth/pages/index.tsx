import { Box, Button, Typography } from "@mui/material";
import React, { useRef } from "react";
import CustomTextField from "../../../core/components/CustomTextField";
import { Formik } from "formik";
import * as Yup from "yup";
import PrimaaryBtn from "../../../core/components/PrimaaryBtn";
import { useAppDispatch } from "../../../core/store";
import { useSelector } from "react-redux";
import { AuthState, login } from "../slices/auth-slice";
import authModel from "../models/auth-model";

const Login = () => {
  const dispatch = useAppDispatch();
  const authState: AuthState = useSelector((state: any) => state.auth);

  const formSubmit = useRef<any>();

  const handleFormSchema = Yup.object({
    username: Yup.string().required("Username Should be entered"),
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
              initialValues={authState.auth}
              validationSchema={handleFormSchema}
              onSubmit={(values: authModel) => {
                console.log(values);
                dispatch(login(values));
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
                    name="username"
                    label="Usersame"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.username}
                    touched={touched.username}
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
          <PrimaaryBtn
            title="log in"
            Func={() => formSubmit.current.click()}
            sx={{ width: "70%", margin: "0 auto 1rem" }}
          />
          <Typography
            sx={{ width: "100%", textAlign: "center", cursor: "pointer" }}
          >
            Don't have an account?
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Login;
