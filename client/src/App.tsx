import React from "react";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./core/theme/theme";
import Router from "./core/routes/router";
import { Routes } from "react-router-dom";
import { LoadingProvider } from "./core/services/loading-service";
import LoadingOverlay from "./core/components/OverlapLoading";
function App() {
  return (
    <ThemeProvider theme={theme()}>
      <CssBaseline />
      <LoadingProvider>
      <Routes>{Router.getRoutes()}</Routes>
      <LoadingOverlay />
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;