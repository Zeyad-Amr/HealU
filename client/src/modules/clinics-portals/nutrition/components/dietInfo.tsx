import React from "react";
import {styled, Theme} from "@mui/material/styles";
import {Grid, CardContent, Typography} from "@mui/material";
import PdfDownloader from "./pdfDownloader";
import {useSelector} from "react-redux";
import {toTitleCase} from "../utils/toProperCase";

interface File {
    name: string;
    url: string;
}

interface DietInfoProps {
}

interface Field {
    title: string;
    value: string;
}

interface Section {
    title: string;
    component: React.ReactNode;
}

const InbodyFiles: File[] = [
    {name: "InBody 1", url: "http://example.com/file1.pdf"},
    {name: "InBody 2", url: "http://example.com/file2.pdf"},
    {name: "InBody 3", url: "http://example.com/file3.pdf"},
    {name: "InBody 4", url: "http://example.com/file4.pdf"},
];

const DietPlans: File[] = [
    {name: "Diet Plan 1", url: "http://example.com/fileA.pdf"},
    {name: "Diet Plan 2", url: "http://example.com/fileB.pdf"},
    {name: "Diet Plan 3", url: "http://example.com/fileC.pdf"},
    {name: "Diet Plan 4", url: "http://example.com/fileD.pdf"},
];


const fields: Field[] = [
    {title: "Inbody Score", value: "80/100"},
    {title: "Current Weight", value: "85 KG"},
    {title: "Weight Control", value: "+5.0 KG"},
    {title: "Target Weight", value: "75 KG"},
    {title: "Fat Control", value: "-3.5 KG"},
    {title: "Muscle Control", value: "+6.5 KG"},
];

const sections: Section[] = [
    {
        title: "Review Inbody",
        component: <PdfDownloader files={InbodyFiles}/>,
    },
    {
        title: "Review Diet Plans",
        component: <PdfDownloader files={DietPlans}/>
        ,
    },
];
const ContainerWrapper = styled("div")(({theme}: { theme: Theme }) => ({
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "16px",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    border: `1px solid #13D2DE`,
    display: "flex",
    justifyContent: "center",
}));

const GreyContainer = styled("div")(({theme}: { theme: Theme }) => ({
    backgroundColor: "#E0E0E0",
    padding: "1rem",
    borderRadius: "4px",
    width: "250px",
    height: "45px",
}));

const CustomCard = styled("div")(({theme}: { theme: Theme }) => ({
    height: "100%",
    color: "#212121",
}));

const CardTitle = styled(Typography)(({theme}: { theme: Theme }) => ({
    fontSize: "25px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#9E9E9E",
}));

const FieldTitle = styled(Typography)(({theme}: { theme: Theme }) => ({
    fontWeight: "bold",
}));

const DietInfo: React.FC<DietInfoProps> = () => {


    const {
        currentPatient: {inBody, inBodyFiles, dietPlanFiles},
    } = useSelector((state: any) => state.nutrition);


    const keys: string[] = Object.keys(inBody);
    const values: string[] = Object.values(inBody);

    return (
        <ContainerWrapper>
            <Grid container spacing={3} sx={{display: "flex"}}>

                <Grid item xs={12} sm={6} sx={{width: "50%"}}>
                    <CustomCard>
                        <CardContent>
                            <CardTitle>Inbody Score & Weight Control</CardTitle>
                            <Grid container spacing={2}>
                                {keys.map((key: string, index: number) => (
                                    <Grid item key={key}>
                                        <FieldTitle>{toTitleCase(key)}</FieldTitle>
                                        <GreyContainer>{values[index]}</GreyContainer>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </CustomCard>
                </Grid>

                <Grid item xs={12} sm={6} sx={{width: "50%"}}>
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

export default DietInfo;
