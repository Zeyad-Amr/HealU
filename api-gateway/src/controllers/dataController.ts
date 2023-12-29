import axios from 'axios';
import { Request, Response } from 'express';
import { errorHandler } from '../services';


export const get_patient_data = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params

        const [personalData, medicalRecord, medicalHistory] = await Promise.all([
            axios.get(`${process.env.Registration_URL}/patient/${patientId}`),
            axios.get(`${process.env.EMR_URL}/record/patient/${patientId}`),
            axios.get(`${process.env.EMR_URL}/medical-history/${patientId}`),
        ])

        return res.status(200).json({
            personalData: personalData.data,
            medicalRecord: medicalRecord.data,
            medicalHistory: medicalHistory.data
        })

    } catch (error: any) {
        const err = errorHandler(error)

        res.status(err?.statusCode ?? 500).json(err)
    }
}

export const get_previous_appointments = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params

        const [appointmentsRes, medicalRecordRes, medicalHistoryRes, prescriptionsRes] = await Promise.all([
            axios.get(`${process.env.Appointment_URL}/appointments/patient/${patientId}`),
            axios.get(`${process.env.EMR_URL}/record/patient/${patientId}`),
            axios.get(`${process.env.EMR_URL}/medical-history/${patientId}`),
            axios.get(`${process.env.EMR_URL}/prescription/patient/${patientId}`),
        ])

        let appointments: any[] = appointmentsRes.data
        appointments = appointments.filter((item) => {
            return item.status === 'Completed'
        })

        const appointmentIds = appointments.map((item) => { item._id })

        const filterByAppointmentId = (item: any) => {
            appointmentIds.includes(item.AppointmentID)
        }

        let medicalRecord = medicalRecordRes.data.filter(filterByAppointmentId)
        let prescriptions = prescriptionsRes.data.filter(filterByAppointmentId)
        let medicalHistory = medicalHistoryRes.data


        return res.status(200).json({
            appointments,
            medicalHistory,
            medicalRecord,
            prescriptions
        })

    } catch (error: any) {
        const err = errorHandler(error)

        res.status(err?.statusCode ?? 500).json(err)
    }
}

// export const get_all_appointments = async (req: Request, res: Response) => {
//     try {
//         const { patientId } = req.params
//         const slots = [
//             {
//                 "_id": "658e0d3551106d1230ef2275",
//                 "doctorId": 13,
//                 "clinicId": 5,
//                 "time": "13:00",
//                 "weekDay": "Sunday",
//                 "__v": 0
//             },
//             {
//                 "_id": "658e391551106d1230ef25d4",
//                 "doctorId": 13,
//                 "clinicId": 5,
//                 "time": "01:00",
//                 "weekDay": "Sunday",
//                 "__v": 0
//             },
//             {
//                 "_id": "658f1886aadce3fc8458c47a",
//                 "doctorId": 13,
//                 "clinicId": 5,
//                 "time": "11:00",
//                 "weekDay": "Monday",
//                 "__v": 0
//             }
//         ]



//         const [appointmentsRes, clinicRes, doctorRes, prescriptionsRes] = await Promise.all([
//             axios.get(`${process.env.Appointment_URL}/appointments/patient/${patientId}`),
//             axios.get(`${process.env.EMR_URL}/record/patient/${patientId}`),
//             axios.get(`${process.env.EMR_URL}/medical-history/${patientId}`),
//             axios.get(`${process.env.EMR_URL}/prescription/patient/${patientId}`),
//         ])

//         let appointments: any[] = appointmentsRes.data
//         appointments = appointments.filter((item) => {
//             return item.status === 'Completed'
//         })

//         const appointmentIds = appointments.map((item) => { item._id })

//         const filterByAppointmentId = (item: any) => {
//             appointmentIds.includes(item.AppointmentID)
//         }

//         let medicalRecord = medicalRecordRes.data.filter(filterByAppointmentId)
//         let prescriptions = prescriptionsRes.data.filter(filterByAppointmentId)
//         let medicalHistory = medicalHistoryRes.data


//         return res.status(200).json({
//             appointments,
//             medicalHistory,
//             medicalRecord,
//             prescriptions
//         })

//     } catch (error: any) {
//         const err = errorHandler(error)

//         res.status(err?.statusCode ?? 500).json(err)
//     }
// }