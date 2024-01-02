import React, { useEffect } from "react";
import { useLoading } from "../services/loading-service";
import { Box, Typography } from "@mui/material";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import api from "../api/api";
const LoadingOverlay = () => {
  const { loading, setLoadingState } = useLoading();

  useEffect(() => {
    const requestInterceptorCustomAxios = api.interceptors.request.use(
      (config) => {
        setLoadingState(true);
        const token: string =
          localStorage.getItem("token") ??
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwMzY2NjAwMX0.nWs6p02Jbm0EDQya2iQht5R129bU2hLIk80A4kdHgDY";

        if (token.length > 0) {
          config.headers["auth-token"] = token;
        }

        return config;
      },
      (error) => {
        setLoadingState(false);
        return Promise.reject(error);
      }
    );
    const responseInterceptorCustomAxios = api.interceptors.response.use(
      (response: any) => {
        setLoadingState(false);
        return response;
      },
      (error: any) => {
        setLoadingState(false);
        return Promise.reject(error);
      }
    );

    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        setLoadingState(true);
        return config;
      },
      (error) => {
        setLoadingState(false);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response: any) => {
        setLoadingState(false);
        return response;
      },
      (error: any) => {
        setLoadingState(false);
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptorCustomAxios);
      api.interceptors.response.eject(responseInterceptorCustomAxios);
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [setLoadingState]);

  return loading ? (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "3rem",
            color: "#fff",
          }}
        >
          Heal
        </Typography>
        <Typography
          sx={{ fontWeight: "600", fontSize: "3rem", color: "primary.main" }}
        >
          U
        </Typography>
      </Box>
      <PulseLoader color={"#13D2DE"} loading={true} size={10} />
    </Box>
  ) : null;
};

export default LoadingOverlay;
