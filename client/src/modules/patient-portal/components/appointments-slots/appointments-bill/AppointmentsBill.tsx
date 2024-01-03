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
import axios from "../../../../../core/api/api"

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
      .post(`/data/book-appointment`, {
        bodyReq
      })
      .then((res: any) => {
        console.log(res.data);
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
    >
      <Box sx={{ display: "flex", flexDirection: "column", margin: "1rem" }}>
        <CustomHeader title="Payment" />
        <Box sx={{ marginBottom: "1.2rem" }}>
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
                  <Grid item lg={8} md={8} sm={8} xs={12}>
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
                  <Grid item lg={4} md={4} sm={4} xs={12}>
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
                      maxLength={4}
                      width="100%"
                      props={{
                        type: "text",
                        placeholder: "MM/YY",
                      }}
                    />
                  </Grid>
                  <Grid item lg={8} md={8} sm={8} xs={12}>
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
                <Button type="submit">Done</Button>
              </Box>
            )}
          </Formik>
        </Box>
      </Box>
    </BootstrapDialog>
  );
};

export default AppointmentsBill;
