import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Box } from "@mui/system";
import { FormControl, FormHelperText, Typography } from "@mui/material";
export interface CustomTextFieldProps {
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  error: string | undefined;
  touched: boolean | undefined;
  value: string | number | undefined | null;
  enable: boolean;
  nonEditable?: boolean;
  isRequired?: boolean;
  width?: number | string;
  props?: TextFieldProps;
  sx?: {};
}

const CustomTextField = ({
  onChange,
  onBlur,
  name,
  label,
  error,
  touched,
  value,
  enable,
  nonEditable,
  isRequired = false,
  sx,
  width,
}: CustomTextFieldProps) => {
  return (
    <Box>
      <FormControl
        required={isRequired}
        sx={{ width: { width }, maxWidth: "100%" }}
      >
        <Typography sx={{ paddingLeft: "1rem" }}>
          {label[0].toUpperCase() + label.slice(1)}
        </Typography>

        <TextField
          disabled={nonEditable || !enable}
          required={isRequired}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          value={value}
          variant="outlined"
          sx={{
            boxShadow: "none",
            backgroundColor: nonEditable || !enable ? "#ddd" : "#F4F4F4",
            borderRadius: "5px",
            ".MuiOutlinedInput-notchedOutline": {
              border: !!(error && touched) ? "1px solid #FF5630" : 0,
            },
            "& .MuiTextField-root": {
              maxWidth: "100%",
            },
            margin: "0.3rem 0rem",
            maxWidth: "100%",
            ...sx,
          }}
        />

        <FormHelperText
          sx={{
            color: "#FF5630",
            paddingLeft: "1rem",
          }}
        >
          {error && touched ? error : ""}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default CustomTextField;
