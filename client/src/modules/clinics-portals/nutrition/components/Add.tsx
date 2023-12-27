import React from "react";
import { styled, Theme } from "@mui/material/styles";
import { Typography } from "@mui/material";

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
}));

const Add: React.FC<AddProps> = ({ title }) => {
  return (
    <Container>
      <Card>
        <Title>{title}</Title>
      </Card>
    </Container>
  );
};

export default Add;
