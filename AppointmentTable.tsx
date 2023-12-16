import React from 'react';


const OphthalmologyScheduleTable= () => {
  const Patients  =
        [
            {
                "PatientID": 1,
                "DoctorID" :1,
                "Name": "Mariam Mounier",                
                "age": 22,
                "Date": "1/1/2023",
                "Time":"11:30 AM"
            },
            {
                "PatientID": 2,
                "DoctorID" :1,
                "Name": "Hanya Ahmed",                
                "age": 22,
                "Date": "2/1/2023",
                "Time":"10:00 AM"
            },
            {
                "PatientID": 3,
                "DoctorID" :3,
                "Name": "Nourhan Sayed",                
                "age": 22,
                "Date": "5/2/2023",
                "Time":"12:30 AM"
            },
            {
                "PatientID": 4,
                "DoctorID" :5,
                "Name": "bassma alaa",                
                "age": 22,
                "Date": "6/3/2023",
                "Time":"8:30 AM"
            },
        ]

  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Patient ID</th>
          <th scope="col">Doctor ID</th>
          <th scope="col">Name</th>
          <th scope="col">Age</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        {Patients.map((item :any) => (
          <tr key={item.patientId}>
            <td>{item.PatientID}</td>
            <td>{item.DoctorID}</td>
            <td>{item.Name} </td>
            <td>{item.age}</td>
            <td>{item.Date}</td>
            <td>{item.Time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OphthalmologyScheduleTable;
