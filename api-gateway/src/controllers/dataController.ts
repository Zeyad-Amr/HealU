import axios from 'axios';
import { Request, Response } from 'express';
import { errorHandler } from '../services';


export const get_appointment_data = async (req: Request, res: Response) => {
    try {
        const { appointmentId } = req.params

        const appointment = (await axios.get(`${process.env.Appointment_URL}/appointments/${appointmentId}`)).data

        let errors: any[] = []
        const [doctorRes, patientRes, recordRes, medicalHistoryRes] = await Promise.allSettled([
            axios.get(`${process.env.Registration_URL}/staff/${appointment.doctorId}`),
            axios.get(`${process.env.Registration_URL}/patient/${appointment.patientId}`),
            axios.get(`${process.env.EMR_URL}/record/patient/${appointment.patientId}`),
            axios.get(`${process.env.EMR_URL}/medical-history/${appointment.patientId}`),
        ])

        let doctorData = {};
        if (doctorRes.status === 'fulfilled') {
            doctorData = doctorRes.value.data.data
        } else {
            errors.push(doctorRes.reason)
        }
        let patientData = {};
        if (patientRes.status === 'fulfilled') {
            patientData = patientRes.value.data.data
        } else {
            errors.push(patientRes.reason)
        }
        let patientRecord = {};
        if (recordRes.status === 'fulfilled') {
            patientRecord = recordRes.value.data
        } else {
            errors.push(recordRes.reason)
        }
        let medicalHistory = {};
        if (medicalHistoryRes.status === 'fulfilled') {
            medicalHistory = medicalHistoryRes.value.data[0]
        } else {
            errors.push(medicalHistoryRes.reason)
        }

        return res.status(200).json({
            doctor: doctorData,
            patient: patientData,
            patientRecord,
            medicalHistory,
            errors
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
        // get the completed appointments only 
        appointments = appointments.filter((item) => {
            return item.status === 2
        })

        const appointmentIds = appointments.map((item) => item._id)
        function filterByAppointmentId(item: any) {
            return appointmentIds.includes(item.AppointmentID)
        }
        let prescriptions = prescriptionsRes.data
        // get prescriptions assigned to these appointments
        prescriptions = prescriptionsRes.data.filter(filterByAppointmentId)

        const clinicIds = appointments.map((appointment: any) => (appointment.clinicId))
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
            const prescription = prescriptions.find((pres: any) => pres.AppointmentID === appointment._id)

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
                prescription
            }
        })

        return res.status(200).json({
            appointments,
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

        const errors = []
        const clinic = (await axios.get(`${process.env.Admin_URL}/api/v1/clinic/${clinicIds[0]}`)).data.data.clinic
        for await (const doctorId of new Set(doctorIds)) {
            const [doctorRes] = await Promise.allSettled([
                axios.get(`${process.env.Registration_URL}/staff/${doctorId}`)
            ])
            let doctor;
            if (doctorRes.status === 'fulfilled') {
                doctor = doctorRes.value.data.data
            } else {
                errors.push(doctorRes.reason)
            }

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

        return res.status(200).json({
            slots: slotsWithDates,
            errors
        })

    } catch (error: any) {
        const err = errorHandler(error)

        res.status(err?.statusCode ?? 500).json(err)
    }
}


export const post_examination = async (req: Request, res: Response) => {
    try {

        const data = req.body

        const prescriptions = data.prescription

        let prescriptionResponse: any[] = []
        for await (const prescription of prescriptions) {
            let prescriptionData = {
                AppointmentID: data.appointmentId,
                Diagnosis: data.Diagnosis,
                ExtraNotes: prescription.ExtraNotes,
                DoctorName: "",
                Drugs: [
                    {
                        DrugName: prescription.DrugName,
                        DrugDuration: prescription.DrugDuration,
                        DrugDose: prescription.DrugDose
                    }
                ]
            }
            const newPrescription = (await axios.post(`${process.env.EMR_URL}/prescription`, prescriptionData)).data
            prescriptionResponse.push(newPrescription)
        }

        const recordData = {
            AppointmentID: data.appointmentId,
            Weight: data.weight,
            Length: data.height,
            MedicalTests: data.MedicalTests,
            Vital: data.Vitals,
            Vaccines: data.Vaccines,
            EyeMeasurements: data.EyeMeasurements,
            NutritionData: data.NutritionData,
            ServicesDescription: "",
            RecommendedActionDescription: "",
        }

        const newRecord = (await axios.post(`${process.env.EMR_URL}/record`, recordData)).data

        console.log({
            recordResponse: newRecord,
            prescriptionResponse
        });

        return res.status(200).json({
            status: 'success',
            msg: 'examination added successfully'
        })

    } catch (error: any) {
        const err = errorHandler(error)

        res.status(err?.statusCode ?? 500).json(err)
    }
}

/*
appt
cardData

create appt
create invoice
amount-> bill
create bill
    success: Done
    Fail: delete appt
        delete invoice
*/

/*
{
    appointment:{
        slotId: number,
        date:"YYYY-MM-dd",
        patientId: number
    },
    bill:{
        "invoiceId": 5, //int
        "paymentMethod": "card", //could be card, paypal, or offline
        "paymentSource":  //payment method details
        {
            "card": {
                "number": "4111111111111111",
                "expiry": "2027-02",
                "name": "John Doe",
                "cvv": 111
            }
        }
    }
}
*/

export const book_appt = async (req: Request, res: Response) => {
    try {
        const { appointment, bill } = req.body

        // create appointment 
        const appt = await axios.post(`${process.env.Appointment_URL}`)
        // const invoice/



        return res.status(200).json({

        })

    } catch (error: any) {
        const err = errorHandler(error)

        res.status(err?.statusCode ?? 500).json(err)
    }
}



/*
    POST book appointment
    POST add examination

    GET previous appts
    GET upcoming appts
    GET user data with photo
 */