import React from "react";
import { styled, Theme } from "@mui/material/styles";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";

interface HistoryProps {}

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
        <Grid item xs={6} sm={3}>
          <CustomCard>
            <CardContent>
              <CardTitle>Drugs</CardTitle>
              <Typography>• Vitamin D3 250 mcg</Typography>
              <Typography>• Centrum Multi-Vitamin</Typography>
            </CardContent>
          </CustomCard>
        </Grid>
        <Grid item xs={6} sm={3}>
          <CustomCard>
            <CardContent>
              <CardTitle>Illnesses</CardTitle>
              <Typography>• Heart Diseases</Typography>
              <Typography>• Chest Diseases</Typography>
            </CardContent>
          </CustomCard>
        </Grid>
        <Grid item xs={6} sm={3}>
          <CustomCard>
            <CardContent>
              <CardTitle>Medical Tests</CardTitle>
              <Typography>• Vitamin D Test</Typography>
              <Typography>• CBC Test</Typography>
            </CardContent>
          </CustomCard>
        </Grid>
        <Grid item xs={6} sm={3}>
          <CustomCard>
            <CardContent>
              <CardTitle>Allergies</CardTitle>
              <Typography>• Nuts Allergy</Typography>
              <Typography>• Lactose Intolerance</Typography>
            </CardContent>
          </CustomCard>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
};

export default History;
