import React from "react";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./core/theme/theme";
import Router from "./core/routes/router";
import { Routes } from "react-router-dom";
function App() {
  return (
    <ThemeProvider theme={theme()}>
      <CssBaseline />
      <Routes>{Router.getRoutes()}</Routes>
    </ThemeProvider>
  );
}

export default App;
