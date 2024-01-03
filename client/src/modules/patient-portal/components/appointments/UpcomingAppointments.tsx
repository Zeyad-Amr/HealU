import api from '../../../../core/api/api';
import CustomHeader from '../../../../core/components/CustomHeader';
import UpcomingAppointmentsCard from './upcoming-appointments-card/UpcomingApptCard';
import { useEffect, useState } from "react";
import axios from "../../../../core/api/api";


const UpcomingAppointmentsComponent = () => {
    // const appt = await api.get("/upcoming-appoint")

    const [upcomingData , setUpcomingData] = useState([])

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    axios
      .get(`/data/upcoming-appointments/${userId}`)
      .then((res: any) => {
        console.log(res.data);
        console.log(res.data.appointments);
        setUpcomingData(res.data.appointments);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

    return (
        <>
            <CustomHeader separatorColor="primary.main" title="Upcoming Appointments" separatorWidth="50px" />
            <UpcomingAppointmentsCard resultData={upcomingData} />

            {/* <DataTable /> */}

        </>
    )
}

export default UpcomingAppointmentsComponent