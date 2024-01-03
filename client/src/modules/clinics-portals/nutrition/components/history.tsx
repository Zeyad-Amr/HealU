import React from "react";
import {styled, Theme} from "@mui/material/styles";
import {Container, Grid, Card, CardContent, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {toTitleCase} from "../utils/toProperCase";

interface HistoryProps {
}

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

const ContainerWrapper = styled(Container)(({theme}: { theme: Theme }) => ({
    backgroundImage:
        "linear-gradient(90deg, hsla(180, 100%, 21%, 1) 0%, hsla(181, 97%, 13%, 1) 100%)",
    borderRadius: "10px",
    color: "#fff",
    height: "100%",
    fontFamily: "Arial, sans-serif",
    padding: "1rem",
}));

const Title = styled(Typography)(({theme}: { theme: Theme }) => ({
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: '1rem'
}));

const CustomCard = styled(Card)(({theme}: { theme: Theme }) => ({
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0)",
    marginBottom: "10px",
    border: `1px solid #13D2DE`,
    color: "#fff",
}));

const CardTitle = styled(Typography)(({theme}: { theme: Theme }) => ({
    fontSize: "18px",
    fontWeight: "bold",
}));

const History: React.FC<HistoryProps> = () => {

    const {
        currentPatient,
    } = useSelector((state: any) => state.nutrition);


    return (
        <ContainerWrapper>
            <Title>History</Title>
            <Grid container spacing={3}>

                {
                    Object.keys(currentPatient.history).map((key) => (
                        <Grid item xs={6} sm={3} key={key}>
                            <CustomCard>
                                <CardContent>
                                    <CardTitle>{toTitleCase(key)}</CardTitle>
                                    {currentPatient.history[key].map((item: string) => (
                                        <Typography key={item}>{`• ${item}`}</Typography>
                                    ))}
                                </CardContent>
                            </CustomCard>
                        </Grid>
                    ))
                }
            </Grid>
        </ContainerWrapper>
    );
};

export default History;
