import React from "react";
import { styled, Theme } from "@mui/material/styles";
import { Typography } from "@mui/material";

const Container = styled("div")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "500px",
  margin: "0 auto",
  padding: theme.spacing(2),
  boxSizing: "border-box",
}));

const Card = styled("div")(({ theme }: { theme: Theme }) => ({
  backgroundColor: "#ffffff",
  marginLeft: "40px",
  marginTop: "-24px",
  //   borderRadius: "5px",
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
  padding: "-60px",
  boxSizing: "border-box",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  width: "424px",
  //   display: "flex-horizontal",
}));

const Title = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333333",
  marginBottom: theme.spacing(1),
  marginLeft: "7px",
  marginTop: "20px",
}));

const Content = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: "16px",
  color: "#333333",
  marginBottom: theme.spacing(2),
  marginLeft: "10px",
}));

const InstructionText = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: "14px",
  color: "#333333",
  margin: 0,
  marginLeft: "10px",
  marginBottom: "10px",
}));

const ListPrescription: React.FC = () => {
  return (
    <Container>
      <Card>
        <Title>Vitamin D3 </Title>
        <Content>250 mcg</Content>

        <InstructionText>Once A Week</InstructionText>
      </Card>
    </Container>
  );
};

export default ListPrescription;
