import React from "react";
import { AddDevice } from "./../../slices/pediatric-slice";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useAppDispatch } from "../../../../../core/store/index";
import { useState } from "react";
import Item from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import "./clincMange.css";
const AddDeviceForm = (props: any) => {
  const dispatch = useAppDispatch();
  const [DateOfPurchase, setDateOfPurchase] = React.useState<Dayjs | null>(
    null
  );
  const [DateOfExpiry, setDateOfExpiry] = React.useState<Dayjs | null>(null);
  const [DeviceState, setDeviceState] = useState<string>("");
  const [DeviceName, setDeviceName] = useState<string>("");
  const [DeviceType, setDeviceType] = useState<string>("");
  const [DeviceManufacturer, setDeviceManufacturer] = useState<string>("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setDeviceName(value);
  };
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setDeviceType(value);
  };
  const handleManufacturerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = event.target;
    setDeviceManufacturer(value);
  };
  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setDeviceState(value);
  };

  const handelSubmit = () => {
    dispatch(
      AddDevice({
        Devices: [
          {
            DeviceName: DeviceName,
            DeviceType: DeviceType,
            DeviceManufacturer: DeviceManufacturer,
            PurchaseDate: DateOfPurchase?.format("YYYY-MM-DD"),
            ExpiryDate: DateOfExpiry?.format("YYYY-MM-DD"),
            DeviceStatus: DeviceState,
          },
        ],
      })
    );
    props.closeModal();
  };

  return (
    <>
      <Grid container spacing={2} columns={8}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Name"
            id="DeviceName"
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Type"
            id="DeviceType"
            onChange={handleTypeChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Manufacturer"
            id="DeviceManufacturer"
            onChange={handleManufacturerChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Purchase"
                className="date-picker"
                value={DateOfPurchase}
                onChange={(newValue) => setDateOfPurchase(newValue)}
              />
            </LocalizationProvider>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of expiry"
                className="date-picker"
                value={DateOfExpiry}
                onChange={(newValue) => setDateOfExpiry(newValue)}
              />
            </LocalizationProvider>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Status"
            id="DeviceStatus"
            onChange={handleStateChange}
          />
        </Grid>
      </Grid>
      <div className="Controls">
        <Button variant="contained" onClick={handelSubmit}>
          Save
        </Button>
      </div>
    </>
  );
};

export default AddDeviceForm;
