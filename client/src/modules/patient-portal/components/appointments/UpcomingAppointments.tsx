import api from '../../../../core/api/api';
import CustomHeader from '../../../../core/components/CustomHeader';
import UpcomingAppointmentsCard from './upcoming-appointments-card/UpcomingApptCard';


const UpcomingAppointmentsComponent = () => {
    // const appt = await api.get("/upcoming-appoint")
    return (
        <>
            <CustomHeader separatorColor="primary.main" title="Pervious Appointments" separatorWidth="50px" />
            <UpcomingAppointmentsCard resultData={[]} />

            {/* <DataTable /> */}

        </>
    )
}

export default UpcomingAppointmentsComponent