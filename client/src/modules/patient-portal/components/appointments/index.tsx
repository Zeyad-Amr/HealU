import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Stack } from '@mui/material';
import CustomHeader from '../../../../core/components/CustomHeader';
import AppointmentsFilterResults from '../appointments-slots/appointments-results/AppointmentsFilterResults';
import PreviousAppointmentsCard from './previous-appointments-card/PreviousAppointmentsCard';
import CustomizedDialogs from './appointment-detalis-dialog/AppointmentDialog';


interface IAppointment {
    title: string
    date: string
    description: string
}
interface IAppointmentCardProps {
    appointment: IAppointment
}
function AppointmentCard({ appointment }: IAppointmentCardProps) {

    return (
        <Card sx={{ width: "97%", m: 2, bgcolor: "#e0e0e0" }} >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="avatar">
                        {appointment.title.charAt(0)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={appointment.title}
                subheader={appointment.date}
            />
            <CardContent>
                <Typography variant="body2" color="text.primary">
                    {appointment.description}
                </Typography>
            </CardContent>
            {/* <CardActions disableSpacing>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
}
const PreviousAppointmentsComponent = () => {
    return (
        <>
            <CustomHeader separatorColor="primary.main" title="Pervious Appointments" separatorWidth="50px" />


            <PreviousAppointmentsCard />

            {/* <DataTable /> */}

        </>
    )
}

export default PreviousAppointmentsComponent