import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppRoutes from "../../../../core/routes/AppRoutes";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const isLogined = localStorage.getItem("access_token") !== undefined ? true : false;
  console.log(isLogined);
  

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "95%",
        height: "8vh",
        margin: "0 auto 1rem",
        borderBottomRightRadius: "24px",
        borderBottomLeftRadius: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingX: "3rem",
      }}
    >
      <Box
        sx={{ display: "flex", cursor: "pointer" }}
        onClick={() => {
          navigate(AppRoutes.home);
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "1.5rem",
            color: "secondary.dark",
          }}
        >
          Heal
        </Typography>
        <Typography
          sx={{ fontWeight: "600", fontSize: "1.5rem", color: "primary.main" }}
        >
          U
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {isLogined ? (
          <>
            <Box
              sx={{ cursor: "pointer", marginLeft: "1rem" }}
              onClick={() => {
                navigate(AppRoutes.home);
              }}
            >
              Home
            </Box>
            <Box
              sx={{ cursor: "pointer", marginLeft: "1rem" }}
              onClick={() => {
                navigate(AppRoutes.patientPortalAppointments);
              }}
            >
              Appointments
            </Box>
            <Box sx={{ cursor: "pointer", marginLeft: "1rem" }}>About</Box>
            <Box
              sx={{
                cursor: "pointer",
                marginLeft: "1rem",
                background:
                  " linear-gradient(285deg, #01B6B6 10.66%, #13D2DE 102.7%)",
                borderRadius: " 5px",
                color: "white",
                padding: "0.2rem 1.5rem",
              }}
              onClick={() => {
                localStorage.clear()
                navigate(AppRoutes.login);
                window.location.reload()
              }}
            >
              Logout
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                cursor: "pointer",
                marginLeft: "1rem",
                background:
                  " linear-gradient(285deg, #01B6B6 10.66%, #13D2DE 102.7%)",
                borderRadius: " 5px",
                color: "white",
                padding: "0.2rem 1.5rem",
              }}
              onClick={() => {
                navigate(AppRoutes.login);
              }}
            >
              Login
            </Box>
            <Box
              sx={{
                cursor: "pointer",
                marginLeft: "1rem",

                borderRadius: " 5px",
                color: "secondary.main",
              }}
              onClick={() => {
                navigate(AppRoutes.signup);
              }}
            >
              Signup
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default HeaderComponent;
