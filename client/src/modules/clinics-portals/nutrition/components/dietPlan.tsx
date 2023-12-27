import React from "react";
import { styled, Theme } from "@mui/material/styles";
import { Grid, CardContent, Typography, TextField } from "@mui/material";

interface DietPlanProps {}

const ContainerWrapper = styled("div")(({ theme }: { theme: Theme }) => ({
  marginTop: "-100px",
  backgroundColor: "#fff",
  marginBottom: 16,
  marginLeft: 60,
  borderRadius: "10px",
  padding: "16px",
  width: "1373px",
  color: "#fff",
  fontFamily: "Arial, sans-serif",
  border: `1px solid #13D2DE`,
  display: "flex",
  justifyContent: "center",
}));

const GreyContainer = styled("div")(({ theme }: { theme: Theme }) => ({
  backgroundColor: "#E0E0E0",
  padding: "16px",
  borderRadius: "4px",
  width: "250px",
  height: "45px",
}));

const CustomCard = styled("div")(({ theme }: { theme: Theme }) => ({
  minHeight: "200px",
  backgroundColor: "#fff",
  marginBottom: "10px",
  color: "#212121",
}));

const CardTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: "25px",
  fontWeight: "bold",
  marginBottom: "10px",
  color: "#9E9E9E",
}));

const FieldTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontWeight: "bold",
}));

const DietPlan: React.FC<DietPlanProps> = () => {
  return (
    <ContainerWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CustomCard>
            <CardContent>
              <CardTitle>Inbody Score & Weight Control</CardTitle>
              <Grid container spacing={13}>
                <Grid item>
                  <FieldTitle>Inbody Score</FieldTitle>
                  <GreyContainer>80/100</GreyContainer>

                  <FieldTitle>Target Weight</FieldTitle>
                  <GreyContainer>75 KG</GreyContainer>
                  <FieldTitle>Weight Control</FieldTitle>
                  <GreyContainer>+5.0 KG</GreyContainer>
                </Grid>
                <Grid item>
                  <FieldTitle>Fat Control</FieldTitle>
                  <GreyContainer>-3.5 KG</GreyContainer>
                  <FieldTitle>Muscle Control</FieldTitle>
                  <GreyContainer>+6.5 KG</GreyContainer>
                </Grid>
              </Grid>
            </CardContent>
          </CustomCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomCard>
            <CardContent>
              <CardTitle>Inbody & Diet Plans</CardTitle>
              {/* Add your implementation for title and photo upload here */}
            </CardContent>
          </CustomCard>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
};

export default DietPlan;
