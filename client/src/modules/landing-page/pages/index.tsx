/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import api from "../../../core/api/api";

const LandingPage = () => {
  useEffect(() => {
    api.get("/appointment");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <h1
        onClick={() => {
          console.log("clicked");
          api.get("/appointment");
        }}
      >
        Landing Page
      </h1>
    </div>
  );
};

export default LandingPage;
