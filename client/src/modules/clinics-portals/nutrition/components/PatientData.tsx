import React from "react";
import { styled, Theme } from "@mui/material/styles";
import { theme } from "../../../../core/theme/theme";
import {useSelector} from "react-redux";
import { toTitleCase } from "../utils/toProperCase";

const PersonalDataContainer = styled("div")(({ theme: Theme }) => ({
  backgroundImage:
    "linear-gradient(90deg, hsla(180, 99%, 36%, 1) 0%, hsla(183, 85%, 47%, 1) 100%)",
  borderRadius: "10px",
  padding: "16px",
  color: "#fff",
  fontFamily: "Arial, sans-serif",
  height: "100%",
}));

const Title = styled("h2")(({ theme: Theme }) => ({
  marginTop: 0,
  marginBottom: 8,
  textAlign: "left",
}));

const DataItemContainer = styled("div")(({ theme: Theme }) => ({
  marginBottom: 4,
  textAlign: "left",
  marginTop: "20px",
}));

const DataItemKey = styled("span")(({ theme: Theme }) => ({
  color: "#fff",
}));

const DataItemValue = styled("span")(({ theme: Theme }) => ({
  color: "#006D6D",
  textAlign: "left",
  fontWeight: "bold",
  fontSize: "20px",
}));

const PatientData = () => {
  const currentTheme = theme();

  // use the redux store to get the patient data
  const {
    currentPatient,
  } = useSelector((state : any) => state.nutrition);

  const keys = Object.keys(currentPatient.personalInfo);
  const values: string[] = Object.values(currentPatient.personalInfo);


  return (
    <PersonalDataContainer theme={currentTheme}>
      <Title theme={currentTheme}>Personal Data</Title>
      {keys.map((key: any, index: number) => (
        <DataItemContainer key={key} theme={currentTheme}>
          <DataItemKey theme={currentTheme}>{toTitleCase(key)}</DataItemKey>{": "}
          <DataItemValue theme={currentTheme}>{values[index]}</DataItemValue>
        </DataItemContainer>
      ))}
    </PersonalDataContainer>
  );
};

export default PatientData;
