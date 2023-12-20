import { createTheme, Theme } from "@mui/material/styles";
import * as colors from "@mui/material/colors";
import { ThemeOptions } from "@mui/material/styles";
// mui theme settings
export const themeSettings = (): ThemeOptions => {
  return {
    palette: {
      primary: {
        dark: "#01B6B6",
        main: "#13D2DE",
      },
      secondary: {
        dark: "#002426",
        main: "#006D6D",
      },
      background: {
        default: colors.common.white,
      },
      grey: {
        100: "#F5F5F5",
        200: "#EEEEEE",
        300: "#E0E0E0",
        400: "#BDBDBD",
        500: "#9E9E9E",
        600: "#757575",
        700: "#616161",
        800: "#424242",
        900: "#212121",
      },
      error: {
        main: "#B80202",
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
              backgroundColor: "#13D2DE",
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
