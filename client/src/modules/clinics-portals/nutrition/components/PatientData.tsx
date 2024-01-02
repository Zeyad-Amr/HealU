import React from "react";
import { styled, Theme } from "@mui/material/styles";
import { theme } from "../../../../../src/core/theme/theme";

interface PatientDataProps {
  name: string;
  weight: number;
  length: number;
  age: number;
}

interface DataItem {
  key: string;
  value: string | number;
}

const PersonalDataContainer = styled("div")(({ theme: Theme }) => ({
  marginTop: 20,
  marginBottom: 16,
  marginLeft: 60,
  marginRight: -100,
  backgroundImage:
    "linear-gradient(90deg, hsla(180, 99%, 36%, 1) 0%, hsla(183, 85%, 47%, 1) 100%)",
  borderRadius: "10px",
  padding: "16px",
  width: "300px",
  color: "#fff",
  fontFamily: "Arial, sans-serif",
  height: "90%",
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

const PatientData: React.FC<PatientDataProps> = ({
  name,
  weight,
  length,
  age,
}) => {
  const currentTheme = theme();

  const dataItems: DataItem[] = [
    { key: "Name:", value: name },
    { key: "Weight:", value: `${weight} Kg` },
    { key: "Height:", value: `${length} Cm` },
    { key: "Age:", value: age },
  ];

  return (
    <PersonalDataContainer theme={currentTheme}>
      <Title theme={currentTheme}>Personal Data</Title>
      {dataItems.map((item) => (
        <DataItemContainer key={item.key} theme={currentTheme}>
          <DataItemKey theme={currentTheme}>{item.key}</DataItemKey>{" "}
          <DataItemValue theme={currentTheme}>{item.value}</DataItemValue>
        </DataItemContainer>
      ))}
    </PersonalDataContainer>
  );
};

export default PatientData;
