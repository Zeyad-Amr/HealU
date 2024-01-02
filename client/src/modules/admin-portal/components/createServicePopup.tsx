import {
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";

interface CreateServicePopupProps {
  isAddDialogOpen: boolean;
  handleCloseDialogs: () => void;
}
const auth_token = process.env.REACT_APP_GATEWAY_TOKEN;
const CreateServicePopup: React.FC<CreateServicePopupProps> = ({
  isAddDialogOpen,
  handleCloseDialogs,
}) => {
  const [formData, setFormData] = useState({
    name: "Vision Test",
    clinic: "Ophthalmology",
    description: "Vision test including eye measurements",
    price: 100,
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    axios
      .post(
        "https://healu-api-gateway.onrender.com/api/admin/clinic-service",
        {
          name: formData["name"],
          clinicId: 1,
          description: formData["description"],
          price: formData["price"],
        },
        {
          headers: {
            "auth-token": auth_token,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={isAddDialogOpen}
        onClose={handleCloseDialogs}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              align="center"
            >
              Create New Service
            </Typography>
            <IconButton aria-label="close" onClick={handleCloseDialogs}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              label="Name"
              name="name"
              defaultValue="Vision Test"
              variant="filled"
              size="small"
              margin="dense"
              onChange={handleChange}
            />
            <TextField
              label="Clinic"
              name="clinic"
              defaultValue="Ophthalmology"
              variant="filled"
              margin="dense"
              size="small"
              onChange={handleChange}
            />
            <TextField
              label="Description"
              name="description"
              defaultValue="Vision test including eye measurements"
              variant="filled"
              margin="dense"
              size="small"
              multiline
              onChange={handleChange}
            />
            <TextField
              label="Price"
              type="number"
              name="price"
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">EGP</InputAdornment>
                ),
              }}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="primary" type="submit" onClick={handleSubmit}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateServicePopup;
