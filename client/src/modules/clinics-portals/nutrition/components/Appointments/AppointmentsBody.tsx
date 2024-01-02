import Box from "@mui/material/Box";
import AppointmentSlot from "./AppointmentSlot";
import {useState} from "react";


const data = [
    {
        time: "10:00 AM",
        name: "Patient Name",
    },
    {
        time: "01:00 PM",
        name: "Patient Name",
    }, {
        time: "03:00 PM",
        name: "",
    }, {
        time: "05:00 PM",
        name: "Patient Name",
    }
];

const AppointmentsBody = () => {

    const [appointments, setAppointments] = useState(data);

    const handleDeleteSlot = (index: number) => {
        setAppointments(appointments.filter((item, i) => i !== index));
    };

    const handleClearSlot = (index: number) => {
        // clear one slot
        setAppointments(appointments.filter((item, i)=>{
            if(i === index){
                item.name = "";
            }
            return item;
        }));
    }

    return (
        <Box>
            {
                appointments.map((item, index) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                marginBottom: "1rem",
                            }}
                        >
                            <AppointmentSlot
                                time={item.time}
                                name={item.name}
                                onDeleteSlot={() => handleDeleteSlot(index)}
                                onClearSlot={() => handleClearSlot(index)}
                            />
                        </Box>
                    )
                })
            }
        </Box>
    );
};

export default AppointmentsBody;
