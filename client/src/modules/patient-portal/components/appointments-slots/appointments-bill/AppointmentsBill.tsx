import React , { Dispatch , SetStateAction } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { Box, DialogContentText, Slide } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface AppointmentsBillPropsI {
    open : boolean;
    setOpen : Dispatch<SetStateAction<boolean>>;
}

const AppointmentsBill = ({ open , setOpen } : AppointmentsBillPropsI) => {
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
      <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                TransitionComponent={Transition}
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Test
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers >

                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending
                        anonymous location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>

            </BootstrapDialog>
  );
};

export default AppointmentsBill;
