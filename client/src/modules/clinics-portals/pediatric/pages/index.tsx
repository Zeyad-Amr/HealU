import React from 'react';
import ClinicTitle from '../components/title/title';
import ScheduleTable from '../components/table/table';
import { useState } from 'react';

const PediatricClinic = () => {
  const Data  =
        [
            {
                "id": 1,
                "name": "pedro",
                "lastName": "Perez",
                "age": 22,
                "email": "dummy@gmail.com"
            },
            {
                "id": 2,
                "name": "abram",
                "lastName": "gad",
                "age": 22,
                "email": "beboabram@gmail.com"
            },
            {
                "id": 3,
                "name": "naira",
                "lastName": "youssif",
                "age": 22,
                "email": "Nairayoussif@gamil.com"
            },
            {
                "id": 4,
                "name": "mayar",
                "lastName": "fayez",
                "age": 22,
                "email": "mayarfayez@gamil.com"
            },
    ]
  const [showData, setShowData] = useState(false);
  const fetchData = () => { 
    setShowData(true);
  };

  return (
    <>
      <button type="button" onClick={fetchData}>fetch</button>
      <ClinicTitle />
      {showData && <ScheduleTable data={Data} />}
    
    </>
   
  );
}
export default PediatricClinic;