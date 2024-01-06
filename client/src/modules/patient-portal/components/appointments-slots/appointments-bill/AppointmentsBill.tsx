import React, { Dispatch, SetStateAction, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { TransitionProps } from "@mui/material/transitions";
import { Box, Slide, Button, Grid } from "@mui/material";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomTextField from "../../../../../core/components/CustomTextField";
import CustomHeader from "../../../../../core/components/CustomHeader";
import axios from "../../../../../core/api/api";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface AppointmentsBillPropsI {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  slotData: any;
}

interface CreditCardValues {
  number: number | string;
  name: string;
  cvc: number | string;
  expiry: number | string;
  amount: number | string;
}

const AppointmentsBill = ({
  open,
  setOpen,
  slotData,
}: AppointmentsBillPropsI) => {
  const [state, setState] = useState<any>({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const initialValues: CreditCardValues = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    amount: "",
  };

  const onClear = () => {

  }
  const handleFormSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    // .matches(/^[A-Za-z]+$/, "Name must be string"),
    number: Yup.string()
      .required("Number is required")
      .matches(/^\+?[0-9\(\)]+$/, "Invalid Card Number")
      .max(16,"Must be exactly 16 numbers"),
    expiry: Yup.string()
      .required("Expiry is required")
      .matches(/^\+?[0-9\(\)]+$/, "Invalid Expiry Date")
      .max(4,"Must be exactly 4 numbers"),
    cvc: Yup.string()
      .required("CVV is required")
      .matches(/^\+?[0-9\(\)]+$/, "Invalid CVV")
      .max(3,"Must be exactly 3 numbers"),
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setState((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e: any) => {
    setState((prev: any) => ({ ...prev, focus: e.target.name }));
  };
  const handleSubmit = (values: CreditCardValues) => {
    const datePartFormatted = slotData?.date.split("T")[0];
    const month = String(values.expiry).slice(0, 2);
    const year = `20${String(values.expiry).slice(2)}`;
    const formattedExpiryDate = `${year}-${month}`;
    // post req
    const bodyReq = {
      appointment: {
        slotId: slotData?.slotId,
        date: datePartFormatted,
      },
      card: {
        number: String(values.number),
        expiry: formattedExpiryDate,
        name: values.name,
        cvv: values.cvc,
      },
    };
    console.log(bodyReq);
    axios
      .post(`/data/book-appointment`, bodyReq)
      .then((res: any) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setState({
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      focus: "",
    });
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      TransitionComponent={Transition}
      open={open}
      sx={{ borderRadius: "15px !important" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "1rem",
          padding: "0.5rem",
          borderRadius: "15px !important",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CustomHeader title="Payment" />
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              // position: "absolute",
              // right: 8,
              // top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ marginBottom: "1.2rem", marginTop: "1rem" }}>
          <Cards
            number={state.number}
            expiry={state.expiry}
            cvc={state.cvc}
            name={state.name}
            focused={state.focus}
          />
        </Box>
        <Box>
          <Formik
            initialValues={initialValues}
            validationSchema={handleFormSchema}
            onSubmit={(values) => {
              handleSubmit(values);
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
                      label="Card Number"
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
                  <Grid item lg={3} md={3} sm={3} xs={12}>
                    <CustomTextField
                      enable={true}
                      isRequired
                      name="expiry"
                      label="Expiry Date"
                      value={values.expiry}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(e);
                      }}
                      onBlur={handleBlur}
                      error={errors.expiry}
                      touched={touched.expiry}
                      onFocus={handleInputFocus}
                      maxLength={4}
                      width="100%"
                      props={{
                        type: "text",
                        placeholder: "MM/YY",
                      }}
                    />
                  </Grid>
                  <Grid item lg={3} md={3} sm={3} xs={12}>
                    <CustomTextField
                      enable={false}
                      isRequired
                      name="amount"
                      label="Amount"
                      value={slotData?.clinic.defaultService.price}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(e);
                      }}
                      onBlur={handleBlur}
                      error={errors.amount}
                      touched={touched.amount}
                      onFocus={handleInputFocus}
                      width="100%"
                      props={{
                        type: "number",
                      }}
                      sx={{ color: "red" }}
                    />
                  </Grid>
                  <Grid item lg={8} md={8} sm={8} xs={12}>
                    <CustomTextField
                      enable={true}
                      isRequired
                      name="name"
                      label="Name On Card"
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
                  <Grid item lg={4} md={4} sm={4} xs={12}>
                    <CustomTextField
                      enable={true}
                      isRequired
                      name="cvc"
                      label="CVV"
                      value={values.cvc}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(e);
                      }}
                      maxLength={3}
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
                <Box>
                  <Button
                    type="submit"
                    sx={{
                      width: "4.5rem",
                      backgroundColor: "primary.main",
                      color: "#fff",
                      padding: "0.4rem",
                      cursor: "pointer",
                      borderRadius: "6px",
                      margin: "0.5rem 0rem 0.5rem 0rem",
                      textAlign: "center",
                    }}
                  >
                    Search
                  </Button>
                  {/* <Button
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
                  </Button> */}
                </Box>
              </Box>
            )}
          </Formik>
        </Box>
      </Box>
    </BootstrapDialog>
  );
};

export default AppointmentsBill;
