import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import CustomHeader from '../../../../core/components/CustomHeader';
import PreviousAppointmentsCard from './previous-appointments-card/PreviousAppointmentsCard';


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