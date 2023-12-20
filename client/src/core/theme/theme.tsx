import { createTheme, Theme } from "@mui/material/styles";
import * as colors from "@mui/material/colors";
import { ThemeOptions } from "@mui/material/styles";
// mui theme settings
export const themeSettings = (): ThemeOptions => {
  return {
    palette: {
      primary: {
        main: "#050A30",
      },
      secondary: {
        main: "#f89c3e",
      },
      background: {
        default: colors.common.white,
      },
    },

    typography: {
      fontFamily: "Roboto",

      h1: {
        fontSize: 40,
      },
      h2: {
        fontSize: 32,
      },
      h3: {
        fontSize: 24,
      },
      h4: {
        fontSize: 20,
      },
      h5: {
        fontSize: 16,
      },
      h6: {
        fontSize: 14,
      },
      subtitle1: {
        fontSize: 12,
      },
      subtitle2: {
        fontSize: 10,
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-root, & .MuiInputLabel-root": {
              fontSize: "0.8rem",
            },
            "& .MuiInputLabel-root.MuiInputLabel-shrink": {},
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontSize: "0.8rem",
            "&:hover": {
              backgroundColor: "#f89c3e",
              color: "#fff",
            },
          },
        },
      },
    },
  };
};

export const theme = (): Theme => {
  return createTheme(themeSettings());
};
