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
import api from "../../../core/api/api";
interface CreateServicePopupProps {
  isAddDialogOpen: boolean;
  handleCloseDialogs: () => void;
}
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
    api
      .post("/admin/clinic-service", {
        name: formData["name"],
        clinicId: 1,
        description: formData["description"],
        price: formData["price"],
      })
      .then((response) => {
        handleCloseDialogs();
        window.location.reload();
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
              defaultValue={formData.name}
              variant="filled"
              size="small"
              margin="dense"
              onChange={handleChange}
            />
            <TextField
              label="Clinic"
              name="clinic"
              defaultValue={formData.clinic}
              variant="filled"
              margin="dense"
              size="small"
              onChange={handleChange}
            />
            <TextField
              label="Description"
              name="description"
              defaultValue={formData.description}
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
              defaultValue={formData.price}
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
