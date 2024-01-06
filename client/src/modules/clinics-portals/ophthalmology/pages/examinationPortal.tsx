import OphthalmologyForm from "../components/examinationScreen/examinationScreen";
import * as React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
const ExaminationPortal = () => {
  return (
    <>
      <React.StrictMode>
        <StyledEngineProvider injectFirst>
          <OphthalmologyForm />
        </StyledEngineProvider>
      </React.StrictMode>
    </>
  );
};
export default ExaminationPortal;
