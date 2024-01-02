import React, { useState } from "react";
import { styled, Theme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
// import PrescriptionModal from "./modal";

const Container = styled("div")(({ visible }: { visible: boolean }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "500px",
  margin: "0 auto",
  boxSizing: "border-box",
}));
const IconButton = styled("div")({
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  marginLeft: "390px",
  marginTop: "10px",
});

const Card = styled("div")(({ theme }: { theme: Theme }) => ({
  backgroundColor: "#ffffff",
  marginLeft: "40px",
  marginTop: "-24px",
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
  padding: "-60px",
  boxSizing: "border-box",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  width: "424px",
}));

const Title = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333333",
  marginBottom: theme.spacing(1),
  marginLeft: "27px",
  marginTop: "-10px",
}));

const Content = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: "16px",
  color: "#333333",
  marginBottom: theme.spacing(2),
  marginLeft: "27px",
}));

const ListPrescription: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleShowCard = () => {
    setCardVisible(true);
  };

  return (
    <>
      {cardVisible && (
        <Container visible={cardVisible}>
          <Card>
            <IconButton aria-label="edit" onClick={handleOpenModal}>
              <EditIcon fontSize="medium" />
            </IconButton>
            {/* {openModal && (
              <PrescriptionModal
                onClose={handleCloseModal}
                handleShowCard={handleShowCard}
              />
            )} */}
            <Title>Vitamin D3 </Title>
            <Content>250 mcg</Content>
            <Content>Once A Week</Content>
          </Card>
        </Container>
      )}
    </>
  );
};

export default ListPrescription;
