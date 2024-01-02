import React from "react";
import { styled, Theme } from "@mui/material/styles";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";

interface HistoryProps {}

const historySections = [
  {
    title: "Drugs",
    items: ["Vitamin D3 250 mcg", "Centrum Multi-Vitamin"],
  },
  {
    title: "Illnesses",
    items: ["Heart Diseases", "Chest Diseases"],
  },
  {
    title: "Medical Tests",
    items: ["Vitamin D Test", "CBC Test"],
  },
  {
    title: "Allergies",
    items: ["Nuts Allergy", "Lactose Intolerance"],
  },
];

const ContainerWrapper = styled(Container)(({ theme }: { theme: Theme }) => ({
  marginTop: "20px",
  backgroundImage:
    "linear-gradient(90deg, hsla(180, 100%, 21%, 1) 0%, hsla(181, 97%, 13%, 1) 100%)",
  marginBottom: 16,
  marginLeft: 20,
  borderRadius: "10px",
  padding: "16px",
  width: "1050px",
  color: "#fff",
  fontFamily: "Arial, sans-serif",
  height: "90%",
}));

const Title = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "10px",
}));

const CustomCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  minHeight: "200px",
  backgroundColor: "rgba(0, 0, 0, 0)",
  marginBottom: "10px",
  border: `1px solid #13D2DE`,
  color: "#fff",
}));

const CardTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "10px",
}));

const History: React.FC<HistoryProps> = () => {
  return (
    <ContainerWrapper>
      <Title>History</Title>
      <Grid container spacing={3}>
        {historySections.map((section) => (
          <Grid item xs={6} sm={3} key={section.title}>
            <CustomCard>
              <CardContent>
                <CardTitle>{section.title}</CardTitle>
                {section.items.map((item) => (
                  <Typography key={item}>{`• ${item}`}</Typography>
                ))}
              </CardContent>
            </CustomCard>
          </Grid>
        ))}
      </Grid>
    </ContainerWrapper>
  );
};

export default History;
