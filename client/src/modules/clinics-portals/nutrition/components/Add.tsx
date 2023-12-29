import React, { useState } from "react";
import { styled, Theme } from "@mui/material/styles";
import { Typography, Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PrescriptionModal from "./modal";

interface AddProps {
  title: string;
}

const Container = styled("div")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "500px",
  marginLeft: "38px",
  boxSizing: "border-box",
}));

const Card = styled("div")(({ theme }: { theme: Theme }) => ({
  backgroundColor: "#BDBDBD",
  borderRadius: "10px",
  padding: theme.spacing(1),
  boxSizing: "border-box",
  width: "424px",
}));

const Title = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333333",
  marginBottom: theme.spacing(1),
  width: "50%",
}));

const Add: React.FC<AddProps> = ({ title }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Container>
      <Card>
        <Grid item>
          <Title>{title}</Title>
        </Grid>
        <Grid item>
          {/* <Icon
            sx={{
              fontSize: 30,
              color: "#BDBDBD",
              backgroundColor: "#000",
              borderRadius: "50%",
              marginLeft: "8px",
            }}
          >
            add_circle
          </Icon> */}
          <IconButton sx={{ color: "black" }} onClick={handleOpenModal}>
            <AddIcon />
          </IconButton>
          {openModal && <PrescriptionModal onClose={handleCloseModal} />}
        </Grid>
      </Card>
    </Container>
  );
};

export default Add;
