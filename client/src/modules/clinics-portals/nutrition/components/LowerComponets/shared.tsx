import {styled, Theme} from "@mui/material/styles";
import {Button, TextField, Typography} from "@mui/material";

const InputWrapper = styled(TextField)(({theme}: { theme: Theme }) => ({
    marginTop: "5px",
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "none",
        },
    },
    backgroundColor: "#F5F5F5",
    borderRadius: "10px",
}));

const StyledButton = styled(Button)(({theme}: { theme: Theme }) => ({
    alignSelf: "center",
    marginTop: "20px",
    marginBottom: "5px",
    width: "150px",
    fontFamily: theme.typography.fontFamily,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    backgroundImage:
        "linear-gradient(90deg, hsla(183, 85%, 47%, 1) 0%, hsla(180, 99%, 36%, 1) 100%)",
    border: "none",
    borderRadius: "10px",
    padding: "12px 24px",
    cursor: "pointer",
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
    "&:hover": {
        backgroundColor: "#0056b3",
    },
    "&:active": {
        backgroundColor: "#004085",
        transform: "translateY(4px)",
    },
}));



const LabelWrapper = styled("label")(({theme}: { theme: Theme }) => ({
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
    color: "#757575",
}));

const Title = styled(Typography)(({theme}: { theme: Theme }) => ({
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333333",
    marginBottom: theme.spacing(1),
    width: "50%",
    paddingX: "1rem",
}));

const Content = styled(Typography)(({ theme }: { theme: Theme }) => ({
    fontSize: "16px",
    color: "#333333",
    marginBottom: theme.spacing(1),
}));

export {InputWrapper, StyledButton, LabelWrapper, Title, Content};
