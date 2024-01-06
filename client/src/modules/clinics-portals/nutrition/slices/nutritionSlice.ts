import { createSlice } from "@reduxjs/toolkit";

interface NutritionState {
    appointments: any[];
    currentPatient: any;
}

const initialState: NutritionState = {
    appointments: [
        {
            "patientName": "Ibrahim Mohamed",
            "patientId": "1",
            "time": "10:00 AM",
        }, {
            "patientName": "Ahmed Mohamed",
            "patientId": "2",
            "time": "10:30 AM",
        }, {
            "patientName": "",
            "patientId": "",
            "time": "11:00 AM",
        }, {
            "patientName": "Ali Mohamed",
            "patientId": "4",
            "time": "11:30 AM",
        }, {
            "patientName": "Mahmoud Mohamed",
            "patientId": "5",
            "time": "12:00 PM",
        }, {
            "patientName": "Hassan Mohamed",
            "patientId": "6",
            "time": "12:30 PM",
        }, {
            "patientName": "Khaled Mohamed",
            "patientId": "7",
            "time": "1:00 PM",
        }, {
            "patientName": "Omar Mohamed",
            "patientId": "8",
            "time": "1:30 PM",
        }, {
            "patientName": "Amr Mohamed",
            "patientId": "9",
            "time": "2:00 PM",
        }, {
            "patientName": "Tarek Mohamed",
            "patientId": "10",
            "time": "2:30 PM",
        }, {
            "patientName": "Ibrahim Mohamed",
            "patientId": "",
            "time": "3:00 PM",
        }, {
            "patientName": "",
            "patientId": "12",
            "time": "3:30 PM",
        }, {
            "patientName": "Mohamed Mohamed",
            "patientId": "13",
            "time": "4:00 PM",
        }, {
            "patientName": "Ali Mohamed",
            "patientId": "14",
            "time": "4:30 PM",
        }, {
            "patientName": "Mahmoud Mohamed",
            "patientId": "15",
            "time": "5:00 PM",
        }, {
            "patientName": "Hassan Mohamed",
            "patientId": "16",
            "time": "5:30 PM",
        }, {
            "patientName": "Khaled Mohamed",
            "patientId": "17",
            "time": "6:00 PM",
        },
    ],

    currentPatient: {
        personalInfo: {
            name: "Ibrahim Mohamed",
            weight: 70,
            height: 193,
            age: 22
        },

        history: {
            drugs: [
                "Vitamin D3 250 mcg",
                "Centrum Multi-Vitamin"
            ],
            illnesses: [
                "Estbe7s",
                "High Blood Pressure mn El HIS"
            ],
            tests: [
                "Vitamin D Test",
                "CBC Test"
            ],
            allergies: [
                "Peanuts",
                "Dust"
            ],
        },
        inBody: {
            score: 10,
            weight: 70,
            weightControl: 5,
            targetWeight: 65,
            fat: -3.5,
            muscle: 6.5,
        },
        inBodyFiles: [
            { name: "InBody 1", url: "http://example.com/file1.pdf" },
            { name: "InBody 2", url: "http://example.com/file2.pdf" },
            { name: "InBody 3", url: "http://example.com/file3.pdf" },
            { name: "InBody 4", url: "http://example.com/file4.pdf" },
        ],
        dietPlanFiles: [
            { name: "Diet Plan 1", url: "http://example.com/fileA.pdf" },
            { name: "Diet Plan 2", url: "http://example.com/fileB.pdf" },
            { name: "Diet Plan 3", url: "http://example.com/fileC.pdf" },
            { name: "Diet Plan 4", url: "http://example.com/fileD.pdf" },
        ],

        prescriptions: [
            {
                id: 1,
                name: "Vitamin D3 250 mcg",
                dosage: "1 pill per day",
                time: "1 month",
                notes: "Take after breakfast",
            },
            {
                id: 2,
                name: "Centrum Multi-Vitamin",
                dosage: "1 pill per day",
                time: "1 month",
                notes: "Take after breakfast",
            }
        ],

        tests: [
            {
                id: 1,
                name: "CBC",
                results: "Vitamin D deficiency",
                notes: "Take Vitamin D3 250 mcg",
            },
            {
                id: 2,
                name: "Vitamin D Test",
                results: "Vitamin D deficiency",
                notes: "Take Vitamin D3 250 mcg",
            }
        ],

        dietPlans: [
            {
                id: 1,
                title: "Diet Plan 1",
                breakfast: "2 eggs, 1 cup of milk, 1 cup of orange juice",
                lunch: "1 cup of rice, 1 cup of chicken, 1 cup of vegetables",
                dinner: "1 cup of rice, 1 cup of chicken, 1 cup of vegetables",
                snacks: "1 cup of fruits",
            }, {
                id: 2,
                title: "Diet Plan 2",
                breakfast: "2 eggs, 1 cup of milk, 1 cup of orange juice",
                lunch: "1 cup of rice, 1 cup of chicken, 1 cup of vegetables",
                dinner: "1 cup of rice, 1 cup of chicken, 1 cup of vegetables",
                snacks: "1 cup of fruits",
            }
        ],

        services: [
            {
                id: 1,
                name: "Diet Plan",
                price: 100,
                description: "Diet Plan for 1 month",
            }, {
                id: 2,
                name: "InBody",
                price: 50,
                description: "InBody Test",
            }
        ],
    }
}

const nutritionSlice = createSlice({
    name: 'nutrition',
    initialState,
    reducers: {
        setAppointments(state, action) {
            state.appointments = action.payload;
        },
        addAppointment(state, action) {
            state.appointments.push(action.payload);
        },
        removeAppointment(state, action) {
            state.appointments = state.appointments.filter((appointment: any) => appointment.patientId !== action.payload);
        },
        clearAppointment(state, action) {
            // just clear one appointment by time
            state.appointments = state.appointments.map((appointment: any) => {
                if (appointment.time === action.payload) {
                    appointment.patientName = "";
                    appointment.patientId = "";
                }
                return appointment;
            });
        },
        setCurrentPatient(state, action) {
            state.currentPatient = action.payload;
        },
        addPrescription(state, action) {
            state.currentPatient.prescriptions.push(action.payload);
        },
        removePrescription(state, action) {
            state.currentPatient.prescriptions = state.currentPatient.prescriptions.filter((prescription: any) => prescription.id !== action.payload);
        },
        updatePrescription(state, action) {
            state.currentPatient.prescriptions = state.currentPatient.prescriptions.map((prescription: any) => {
                if (prescription.id === action.payload.id) {
                    return action.payload;
                }
                return prescription;
            });
        },
        addTest(state, action) {
            state.currentPatient.tests.push(action.payload);
        },
        removeTest(state, action) {
            state.currentPatient.tests = state.currentPatient.tests.filter((test: any) => test.id !== action.payload);
        },
        addDietPlan(state, action) {
            state.currentPatient.dietPlans.push(action.payload);
        },
        removeDietPlan(state, action) {
            state.currentPatient.dietPlans = state.currentPatient.dietPlans.filter((dietPlan: any) => dietPlan.id !== action.payload);
        },
        addService(state, action) {
            state.currentPatient.services.push(action.payload);
        },
        removeService(state, action) {
            state.currentPatient.services = state.currentPatient.services.filter((service: any) => service.id !== action.payload);
        },
    }
});

export const {
    setAppointments,
    addAppointment,
    removeAppointment,
    clearAppointment,
    setCurrentPatient,
    addPrescription,
    removePrescription,
    updatePrescription,
    addTest,
    removeTest,
    addDietPlan,
    removeDietPlan,
    addService,
    removeService,
} = nutritionSlice.actions;

export default nutritionSlice.reducer;
