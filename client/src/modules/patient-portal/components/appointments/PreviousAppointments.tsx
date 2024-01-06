import * as React from "react";
import CustomHeader from "../../../../core/components/CustomHeader";
import PreviousAppointmentsCard from "./previous-appointments-card/PreviousAppointmentsCard";
import { useEffect, useState } from "react";
import axios from "../../../../core/api/api";

const PreviousAppointmentsComponent = () => {
  const [previousData, setPreviousData] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    axios
      .get(`/data/previous-appointments/${userId}`)
      .then((res: any) => {
        console.log(res.data);
        console.log(res.data.appointments);
        setPreviousData(res.data.appointments);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <CustomHeader
        separatorColor="primary.main"
        title="Pervious Appointments"
        separatorWidth="50px"
      />
      <PreviousAppointmentsCard resultData={previousData} />

      {/* <DataTable /> */}
    </>
  );
};

export default PreviousAppointmentsComponent;
