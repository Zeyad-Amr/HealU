import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Slide } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DrugTable from './drug-table/DrugTable';
import SingleTable from './single-table/SingleTable';
import TestsTable from './tests-table/TestsTable';

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

interface IDialogProps {
    handleClose: () => void;
    open: boolean;
    appointment: any;
}

const Divider = () => {
    return (
        <Box
            sx={{
                height: "2px",
                width: "3rem",
                backgroundColor: "primary.main",
                my: "0.5rem"
            }}
        ></Box>
    )
}

export default function CustomizedDialogs({ handleClose, open, appointment }: IDialogProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <BootstrapDialog
                fullScreen={fullScreen}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                TransitionComponent={Transition}
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {appointment?.clinic?.name}
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
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minWidth: '30rem',
                    }}>

                        <Typography variant='h4' color={"text.primary"}>
                            {"Doctor"}
                        </Typography>
                        <Divider />

                        <Typography variant='body1'>
                            {"Dr. " + appointment?.doctor?.name}
                        </Typography>

                        <Typography mt={2} variant='h4' color={"text.primary"}>
                            {"Diagnosis"}
                        </Typography>
                        <Divider />

                        <Typography variant='body1'>
                            {appointment?.prescription?.Diagnosis}
                        </Typography>

                        <Typography mt={2} variant='h4' color={"text.primary"}>
                            {"Vitals"}
                        </Typography>
                        <Divider />
                        {appointment?.medicalRecord?.EyeMeasurement && Object.keys(appointment?.medicalRecord?.EyeMeasurement).length !== 0 ?
                            <Typography variant='body1'>
                                <SingleTable
                                    data={appointment?.medicalRecord?.vitals}
                                    labels={{
                                        BloodPressure: "Blood Pressure",
                                        RespirationRate: "Respiration Rate",
                                        HeartRate: "Heart Rate",
                                        DiabeticTest: "Diabetic Test",
                                        SPO2: "SpO2",
                                    }}
                                />
                            </Typography>
                            :
                            <Typography variant='body1'>
                                No vitals found
                            </Typography>
                        }

                        {appointment?.medicalTests && appointment?.medicalTests.length !== 0 ?

                            <Box>

                                <Typography mt={2} variant='h4' color={"text.primary"}>
                                    {"Medical Tests"}
                                </Typography>
                                <Divider />

                                <Typography variant='body1'>
                                    <TestsTable tests={appointment?.medicalTests} />
                                </Typography>
                            </Box>
                            :
                            null
                        }

                        {appointment?.medicalRecord?.EyeMeasurement && Object.keys(appointment?.medicalRecord?.EyeMeasurement).length !== 0 ?
                            <Box>
                                <Typography mt={2} variant='h4' color={"text.primary"}>
                                    {"Eye Measurements"}
                                </Typography>
                                <Divider />

                                <Typography variant='body1'>
                                    <SingleTable
                                        data={appointment?.medicalRecord?.EyeMeasurement}
                                        tableCellProps={{ align: "center" }}
                                        labels={{
                                            LeftEye: "Left eye",
                                            RightEye: "Right eye"
                                        }}
                                    />
                                </Typography>
                            </Box>
                            :
                            null
                        }
                        {appointment?.medicalRecord?.Nutrition && Object.keys(appointment?.medicalRecord?.Nutrition).length !== 0 ?
                            <Box>
                                <Typography mt={2} variant='h4' color={"text.primary"}>
                                    {"Nutrition"}
                                </Typography>
                                <Divider />

                                <Typography variant='body1'>
                                    <SingleTable
                                        data={appointment?.medicalRecord?.Nutrition}
                                        tableCellProps={{ width: "50%" }}
                                        labels={{
                                            DietPlan: "Diet Plan",
                                            Inbody: "InBody Test"
                                        }}
                                    />
                                </Typography>
                            </Box>
                            :
                            null
                        }


                        <Typography mt={2} variant='h4' color={"text.primary"}>
                            {"Drugs"}
                        </Typography>
                        <Divider />

                        <Typography variant='body1'>
                            <DrugTable drugs={appointment?.prescription?.drug} />
                        </Typography>

                    </Box>
                </DialogContent>

            </BootstrapDialog>
        </>
    );
}
