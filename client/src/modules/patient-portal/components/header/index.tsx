import { Box, Button, Typography } from "@mui/material";

const HeaderComponent = () => {
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
      <Box sx={{ display: "flex" }}>
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
        <Box sx={{ cursor: "pointer", marginLeft: "1rem" }}>Appointments</Box>
        <Box sx={{ cursor: "pointer", marginLeft: "1rem" }}>Yarab</Box>
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
        >
          Login
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderComponent;
