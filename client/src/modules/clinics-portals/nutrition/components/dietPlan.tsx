import React from "react";
import { styled, Theme } from "@mui/material/styles";
import { Grid, CardContent, Typography } from "@mui/material";
import PdfDownloader from "./pdfDownloader";

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

interface Field {
  title: string;
  value: string;
}

const fields: Field[] = [
  { title: "Inbody Score", value: "80/100" },
  { title: "Current Weight", value: "85 KG" },
  { title: "Weight Control", value: "+5.0 KG" },
  { title: "Target Weight", value: "75 KG" },
  { title: "Fat Control", value: "-3.5 KG" },
  { title: "Muscle Control", value: "+6.5 KG" },
];

interface Section {
  title: string;
  component: React.ReactNode;
}

const sections: Section[] = [
  {
    title: "Review Inbody",
    component: <PdfDownloader />,
  },
  {
    title: "Review Diet Plans",
    component: <PdfDownloader />,
  },
];
const DietPlan: React.FC<DietPlanProps> = () => {
  return (
    <ContainerWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CustomCard>
            <CardContent>
              <CardTitle>Inbody Score & Weight Control</CardTitle>
              <Grid container spacing={2}>
                {fields.map((field) => (
                  <Grid item key={field.title}>
                    <FieldTitle>{field.title}</FieldTitle>
                    <GreyContainer>{field.value}</GreyContainer>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </CustomCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomCard>
            <CardContent>
              <Grid container spacing={13}>
                {sections.map((section) => (
                  <Grid item xs={6} key={section.title}>
                    <CustomCard>
                      <CardContent>
                        <CardTitle>{section.title}</CardTitle>
                        <Grid container spacing={2}>
                          <Grid item>{section.component}</Grid>
                        </Grid>
                      </CardContent>
                    </CustomCard>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </CustomCard>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
};

export default DietPlan;
