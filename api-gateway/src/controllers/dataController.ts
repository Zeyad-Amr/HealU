import axios from 'axios';
import { Request, Response } from 'express';
import { errorHandler } from '../services';


export const get_appointment_data = async (req: Request, res: Response) => {
    try {
        const { appointmentId } = req.params

        const appointment = (await axios.get(`${process.env.Appointment_URL}/appointments/${appointmentId}`)).data

        const [doctorRes, patientRes, recordRes, medicalHistoryRes] = await Promise.all([
            axios.get(`${process.env.Registration_URL}/staff/doctor/${appointment.doctorId}`),
            axios.get(`${process.env.Registration_URL}/staff/patient/${appointment.patientId}`),
            axios.get(`${process.env.EMR_URL}/record/patient/${appointment.patientId}`),
            axios.get(`${process.env.EMR_URL}/medical-history/${appointment.patientId}`),
        ])
        const doctorData = doctorRes.data.data
        const patientData = patientRes.data.data
        const patientRecord = recordRes.data[0]
        const medicalHistory = medicalHistoryRes.data[0]

        return res.status(200).json({
            doctor: doctorData,
            patient: patientData,
            patientRecord,
            medicalHistory
        })
    } catch (error: any) {
        const err = errorHandler(error)

        res.status(err?.statusCode ?? 500).json(err)
    }
}

export const get_previous_appointments = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params

        const [appointmentsRes, prescriptionsRes] = await Promise.all([
            axios.get(`${process.env.Appointment_URL}/appointments/patient/${patientId}`),
            axios.get(`${process.env.EMR_URL}/prescription/patient/${patientId}`),
        ])


        let appointments: any[] = appointmentsRes.data
        appointments = appointments.filter((item) => {
            return item.status === 2
        })

        const appointmentIds = appointments.map((item) => { item._id })
        const clinicIds = appointments.map((appointment: any) => (appointment.clinicId))
        const filterByAppointmentId = (item: any) => {
            appointmentIds.includes(item.AppointmentID)
        }
        const prescriptions = prescriptionsRes.data.filter(filterByAppointmentId)

        let clinics = (await axios.get(`${process.env.Admin_URL}/api/v1/clinic`)).data.data.clinics
        clinics = clinics.filter((clinic: any) => {
            return clinicIds.includes(clinic.id)
        })

        const doctorIds = appointments.map((appointment: any) => (appointment.doctorId))
        let doctors: any[] = [];



        for await (const doctorId of new Set(doctorIds)) {
            const doctor = (await axios.get(`${process.env.Registration_URL}/staff/${doctorId}`)).data.data
            doctors.push(doctor)
        }



        appointments = appointments.map((appointment) => {
            const doctor = doctors.find((doctor) => doctor.userId === appointment.doctorId)
            const clinic = clinics.find((clinic: any) => clinic.id === appointment.clinicId)

            return {
                appointmentId: appointment._id,
                doctor: {
                    id: doctor.userId,
                    name: doctor.firstName + " " + doctor.lastName
                },
                clinic: {
                    id: clinic.id,
                    name: clinic.name,
                    description: clinic.description
                },
            }
        })

        return res.status(200).json({
            appointments,
            prescriptions
        })

    } catch (error: any) {
        const err = errorHandler(error)

        res.status(err?.statusCode ?? 500).json(err)
    }
}

export const get_all_slots = async (req: Request, res: Response) => {
    try {
        let { reqStartDate, reqEndDate, doctorId, clinicId } = req.query

        function getDatesInRange(startDate: Date, endDate: Date): Date[] {
            const dates: Date[] = [];
            const current = new Date(startDate);
            while (current <= endDate) {
                dates.push(new Date(current));
                current.setDate(current.getDate() + 1);
            }
            return dates;
        }

        // get all slots and Appointments from Appointment Service
        let getSlotsURL = `${process.env.Appointment_URL}/slots`
        let getAppointmentsURL = `${process.env.Appointment_URL}/appointments`
        if (parseInt(clinicId as string)) {
            getSlotsURL = `${process.env.Appointment_URL}/slots/clinic/${clinicId}/?unscheduled=false`
            getAppointmentsURL = `${process.env.Appointment_URL}/appointments/clinic/${clinicId}/?unscheduled=false`
        }
        if (parseInt(doctorId as string)) {
            getSlotsURL = `${process.env.Appointment_URL}/slots/doctor/${doctorId}/?unscheduled=false`
            getAppointmentsURL = `${process.env.Appointment_URL}/appointments/doctor/${doctorId}/?unscheduled=false`
        }
        let slots: any[] = (await axios.get(getSlotsURL)).data
        const appointments = (await axios.get(getAppointmentsURL)).data

        if (slots.length === 0) return res.status(200).send(slots);

        // generate array of dates in provided date range
        if (!reqEndDate && !reqStartDate) {
            throw { statusCode: 400, msg: "please provide start and end date" }
        }
        const startDate: Date = new Date(reqStartDate as string);
        const endDate: Date = new Date(reqEndDate as string);

        let slotsWithDates = [];

        for (const slot of slots) {
            const weekdays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const slotDates = getDatesInRange(startDate, endDate)
                .filter(date => date.getDay() === weekdays.indexOf(slot.weekDay))
                .map(date => {
                    const time = slot.time.split(':');
                    const slotWithDate = {
                        ...slot,
                        date: new Date(date)
                    };
                    slotWithDate.date.setHours(Number(time[0]), Number(time[1]));
                    return slotWithDate;
                });

            slotsWithDates.push(...slotDates);
        }

        slotsWithDates = slotsWithDates.filter((slot: any) => {
            return !appointments.some(
                (appointment: any) => appointment.date == slot.date
            );
        });

        console.log(slotsWithDates);



        /* 
        get clinic ids from slots
        get doctor ids from slots
        */
        const clinicIds = slotsWithDates.map((slot: any) => (slot.clinicId))
        const doctorIds = slotsWithDates.map((slot: any) => (slot.doctorId))
        let doctors: any[] = [];

        const clinic = (await axios.get(`${process.env.Admin_URL}/api/v1/clinic/${clinicIds[0]}`)).data.data.clinic
        for await (const doctorId of new Set(doctorIds)) {
            const doctor = (await axios.get(`${process.env.Registration_URL}/staff/${doctorId}`)).data.data
            doctors.push(doctor)
        }

        slotsWithDates = slotsWithDates.map((slot) => {
            const doctor = doctors.find((doctor) => doctor.userId === slot.doctorId)

            return {
                slotId: slot._id,
                doctor: {
                    id: doctor.userId,
                    name: doctor.firstName + " " + doctor.lastName
                },
                clinic: {
                    id: clinic.id,
                    name: clinic.name,
                    description: clinic.description
                },
                time: slot.time,
                weekDay: slot.weekDay,
                date: slot.date,
            }
        })

        console.log(slotsWithDates);


        /*
        {
            slotId: '658f1886aadce3fc8458c47a',
            doctor: {
                id:13,
                name:'Zeyad Amr'
            },
            clinic: {
                id:5,
                name:'Dental clinic'
            },
            time: '11:00',
            weekDay: 'Monday',
            booked: true,
            __v: 0,
            date: 2023-12-18T11:00:00.000Z,
        }

          */

        return res.status(200).json({
            slots: slotsWithDates,
        })

    } catch (error: any) {
        const err = errorHandler(error)

        res.status(err?.statusCode ?? 500).json(err)
    }
}


export const post_examination = async (req: Request, res: Response) => {
    try {
        const data = req.body



        return res.status(200).json({

        })

    } catch (error: any) {
        const err = errorHandler(error)

        res.status(err?.statusCode ?? 500).json(err)
    }
}
