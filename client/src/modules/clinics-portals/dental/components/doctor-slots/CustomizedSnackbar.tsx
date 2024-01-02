import { Snackbar, Alert, AlertColor } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { closeSnackbar } from "../../state/slices/snackbarSlice";
import { useAppDispatch } from "../../../../../core/store";

export default function CustomizedSnackbar(props: {
  message: string;
  messageType: AlertColor;
  open: boolean;
}) {
  const dispatch = useAppDispatch();

  return (
    <Snackbar
      open={props.open}
      autoHideDuration={4000}
      onClose={() => dispatch(closeSnackbar())}
    >
      <Alert
        icon={props.messageType === "error" ? <Delete /> : null}
        onClose={() => dispatch(closeSnackbar())}
        variant="filled"
        severity={props.messageType}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
}
