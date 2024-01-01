import { Request, Response } from 'express';
import axios from 'axios';
import { errorHandler } from '../services/errorHandler';
import { getNumberOfClinics, getNumberOfServices } from '../services/adminService';
import { getNumberOfAppointments } from '../services/appointmentsService';
import { getNumberOfDoctors, getNumberOfPatients } from '../services/registrationService';
import { getNumberOfDocuments } from '../services/storageService';
import { getNumberOfMedicalHistory, getNumberOfMedicalRecords, getNumberOfPrescriptions } from '../services/emrService';
import { fetchData } from '../services/fetchingData';
import { getNumberOfBills, getNumberOfInvoices } from '../services/billingService';
// import { mockDailyAnalytics, mockMonthlyAnalytics, mockWeeklyAnalytics, mockYearlyAnalytics } from '../utils/mock';

const getAnalytics = async (req: Request, res: Response) => {
    try {
        console.log("Analytics service is called");

        //* Fetching Data from services
        const {
            allClinicsRes,
            allServicesRes,
            allAppointments,
            allStaffsRef,
            allUsersRef,
            allImagesRef,
            allFilesRef,
            allPrescriptionsRef,
            allRecordsRef,
            allMedicalHistoryRef,
            allBillsRef,
            allInvoicesRef,
            errors,
        } = await fetchData();

        //* Processing Data
        const processedData = {
            clinics: getNumberOfClinics(allClinicsRes?.data.clinics ?? []),
            services: getNumberOfServices(allServicesRes?.data.clinicServices ?? []),
            appointments: getNumberOfAppointments(allAppointments ?? []),
            doctors: getNumberOfDoctors(allStaffsRef?.data ?? []),
            patients: getNumberOfPatients(allUsersRef?.data ?? []),
            documents: getNumberOfDocuments(
                allImagesRef?.data?.images ?? [],
                allFilesRef?.data?.files ?? []
            ),
            prescriptions: getNumberOfPrescriptions(allPrescriptionsRef ?? []),
            records: getNumberOfMedicalRecords(allRecordsRef ?? []),
            medicalHistory: getNumberOfMedicalHistory(allMedicalHistoryRef ?? []),
            bills: getNumberOfBills(allBillsRef ?? [],),
            invoices: getNumberOfInvoices(allInvoicesRef ?? [],),
            errors: errors,
        };

        //* Sending Response
        return res.status(200).json({
            status: 'success',
            message: 'Analytics data fetched successfully',
            processedData,
        });

    } catch (error: any) {
        const err = errorHandler(error);
        res.status(err?.statusCode ?? 500).json(err);
    }
};

const getAnalyticsMock = async (req: Request, res: Response) => {
    try {

        const mockDailyAnalytics: any = {
            "status": "success",
            "message": "Analytics data fetched successfully",
            "timeframe": "daily",
            "general": {
                "numberOfAllPatients": 10000,
                "numberOfDoctors": 70,
                "numberOfClinics": 6,
                "clinics": [
                    {
                        "id": "0",
                        "name": "Orthopedic Clinic",
                        "numberOfDoctors": 12
                    },
                    {
                        "id": "1",
                        "name": "Nutrition Clinic",
                        "numberOfDoctors": 10
                    },
                    {
                        "id": "2",
                        "name": "Paediatric Clinic",
                        "numberOfDoctors": 14
                    },
                    {
                        "id": "3",
                        "name": "Ophthalmology Clinic",
                        "numberOfDoctors": 10
                    },
                    {
                        "id": "4",
                        "name": "Dental Clinic",
                        "numberOfDoctors": 12
                    },
                    {
                        "id": "5",
                        "name": "Dermatology Clinic",
                        "numberOfDoctors": 10
                    }
                ]
            },
            "analytics": {
                "numberOfActivePatients": 5000,
                "numberOfNewPatients": 535.83,
                "billing": {
                    "totalRevenue": {
                        "0": 8532,
                        "1": 7221,
                        "2": 5899,
                        "3": 6764,
                        "4": 5987,
                        "5": 6189,
                        "averageAllClinics": 6500.33,
                        "total": 40592
                    },
                    "billsAdded": {
                        "0": 612,
                        "1": 728,
                        "2": 545,
                        "3": 601,
                        "4": 568,
                        "5": 589,
                        "averageAllClinics": 608.17,
                        "total": 3643
                    },
                    "invoicesAdded": {
                        "0": 617,
                        "1": 732,
                        "2": 559,
                        "3": 609,
                        "4": 575,
                        "5": 595,
                        "averageAllClinics": 608.17,
                        "total": 3687
                    }
                },
                "medicalRecords": {
                    "recordsAdded": {
                        "0": 152,
                        "1": 189,
                        "2": 161,
                        "3": 156,
                        "4": 164,
                        "5": 157,
                        "averageAllClinics": 165.17,
                        "total": 979
                    },
                    "prescriptionsAdded": {
                        "0": 97,
                        "1": 118,
                        "2": 112,
                        "3": 111,
                        "4": 109,
                        "5": 114,
                        "averageAllClinics": 111.83,
                        "total": 661
                    },
                    "medicalHistoryAdded": {
                        "0": 51,
                        "1": 61,
                        "2": 53,
                        "3": 49,
                        "4": 55,
                        "5": 52,
                        "averageAllClinics": 53.50,
                        "total": 321
                    }
                },
                "patientDemographics": {
                    "ageDistribution": {
                        "0": {
                            "0-18": 25,
                            "19-35": 30,
                            "36-50": 22,
                            "50+": 23
                        },
                        "1": {
                            "0-18": 23,
                            "19-35": 32,
                            "36-50": 25,
                            "50+": 20
                        },
                        "2": {
                            "0-18": 20,
                            "19-35": 28,
                            "36-50": 26,
                            "50+": 26
                        },
                        "3": {
                            "0-18": 28,
                            "19-35": 25,
                            "36-50": 23,
                            "50+": 24
                        },
                        "4": {
                            "0-18": 24,
                            "19-35": 28,
                            "36-50": 24,
                            "50+": 24
                        },
                        "5": {
                            "0-18": 22,
                            "19-35": 30,
                            "36-50": 25,
                            "50+": 23
                        },
                        "averageAllClinics": {
                            "0-18": 24,
                            "19-35": 29,
                            "36-50": 24,
                            "50+": 23
                        },
                        "total": {
                            "0-18": 142,
                            "19-35": 173,
                            "36-50": 145,
                            "50+": 140
                        }
                    },
                    "genderDistribution": {
                        "0": {
                            "male": 48,
                            "female": 52
                        },
                        "1": {
                            "male": 47,
                            "female": 53
                        },
                        "2": {
                            "male": 49,
                            "female": 51
                        },
                        "3": {
                            "male": 50,
                            "female": 50
                        },
                        "4": {
                            "male": 49,
                            "female": 51
                        },
                        "5": {
                            "male": 50,
                            "female": 50
                        },
                        "averageAllClinics": {
                            "male": 50,
                            "female": 51
                        },
                        "total": {
                            "male": 245,
                            "female": 240
                        }
                    }
                },
                "percentageOfScheduledSlots": {
                    "0": "45%",
                    "1": "65%",
                    "2": "55%",
                    "3": "60%",
                    "4": "50%",
                    "5": "55%",
                    "averageAllClinics": "55%"
                },
                "numberOfAppointments": {
                    "0": 820,
                    "1": 1025,
                    "2": 720,
                    "3": 900,
                    "4": 800,
                    "5": 850,
                    "averageAllClinics": 850,
                    "total": 5115
                },
                "numberOfServicesUsed": {
                    "0": 315,
                    "1": 360,
                    "2": 290,
                    "3": 320,
                    "4": 300,
                    "5": 310,
                    "averageAllClinics": 310,
                    "total": 1895
                }
            }
        };

        const mockWeeklyAnalytics = {
            "status": "success",
            "message": "Analytics data fetched successfully",
            "timeframe": "weekly",
            "general": {
                "numberOfAllPatients": 7500,
                "numberOfDoctors": 20,
                "numberOfClinics": 6,
                "clinics": [
                    {
                        "id": "0",
                        "name": "Orthopedic Clinic",
                        "numberOfDoctors": 5
                    },
                    {
                        "id": "1",
                        "name": "Nutrition Clinic",
                        "numberOfDoctors": 4
                    },
                    {
                        "id": "2",
                        "name": "Paediatric Clinic",
                        "numberOfDoctors": 6
                    },
                    {
                        "id": "3",
                        "name": "Ophthalmology Clinic",
                        "numberOfDoctors": 4
                    },
                    {
                        "id": "4",
                        "name": "Dental Clinic",
                        "numberOfDoctors": 5
                    },
                    {
                        "id": "5",
                        "name": "Dermatology Clinic",
                        "numberOfDoctors": 4
                    }
                ]
            },
            "analytics": {
                "numberOfActivePatients": 3750,
                "numberOfNewPatients": 400,
                "billing": {
                    "totalRevenue": {
                        "0": 21330,
                        "1": 18080,
                        "2": 14730,
                        "3": 16980,
                        "4": 14970,
                        "5": 15570,
                        "averageAllClinics": 16271.67,
                        "total": 97660
                    },
                    "billsAdded": {
                        "0": 1530,
                        "1": 1820,
                        "2": 1365,
                        "3": 1505,
                        "4": 1420,
                        "5": 1475,
                        "averageAllClinics": 1520.83,
                        "total": 9125
                    },
                    "invoicesAdded": {
                        "0": 1540,
                        "1": 1830,
                        "2": 1395,
                        "3": 1515,
                        "4": 1425,
                        "5": 1485,
                        "averageAllClinics": 1525,
                        "total": 9150
                    }
                },
                "medicalRecords": {
                    "recordsAdded": {
                        "0": 152,
                        "1": 189,
                        "2": 161,
                        "3": 156,
                        "4": 164,
                        "5": 157,
                        "averageAllClinics": 165.17,
                        "total": 979
                    },
                    "prescriptionsAdded": {
                        "0": 97,
                        "1": 118,
                        "2": 112,
                        "3": 111,
                        "4": 109,
                        "5": 114,
                        "averageAllClinics": 111.83,
                        "total": 661
                    },
                    "medicalHistoryAdded": {
                        "0": 51,
                        "1": 61,
                        "2": 53,
                        "3": 49,
                        "4": 55,
                        "5": 52,
                        "averageAllClinics": 53.50,
                        "total": 321
                    }
                },
                "patientDemographics": {
                    "ageDistribution": {
                        "0": {
                            "0-18": 25,
                            "19-35": 30,
                            "36-50": 22,
                            "50+": 23
                        },
                        "1": {
                            "0-18": 23,
                            "19-35": 32,
                            "36-50": 25,
                            "50+": 20
                        },
                        "2": {
                            "0-18": 20,
                            "19-35": 28,
                            "36-50": 26,
                            "50+": 26
                        },
                        "3": {
                            "0-18": 28,
                            "19-35": 25,
                            "36-50": 23,
                            "50+": 24
                        },
                        "4": {
                            "0-18": 24,
                            "19-35": 28,
                            "36-50": 24,
                            "50+": 24
                        },
                        "5": {
                            "0-18": 22,
                            "19-35": 30,
                            "36-50": 25,
                            "50+": 23
                        },
                        "averageAllClinics": {
                            "0-18": 24,
                            "19-35": 29,
                            "36-50": 24,
                            "50+": 23
                        },
                        "total": {
                            "0-18": 142,
                            "19-35": 173,
                            "36-50": 145,
                            "50+": 140
                        }
                    },
                    "genderDistribution": {
                        "0": {
                            "male": 48,
                            "female": 52
                        },
                        "1": {
                            "male": 47,
                            "female": 53
                        },
                        "2": {
                            "male": 49,
                            "female": 51
                        },
                        "3": {
                            "male": 50,
                            "female": 50
                        },
                        "4": {
                            "male": 49,
                            "female": 51
                        },
                        "5": {
                            "male": 50,
                            "female": 50
                        },
                        "averageAllClinics": {
                            "male": 50,
                            "female": 51
                        },
                        "total": {
                            "male": 245,
                            "female": 240
                        }
                    }
                },
                "percentageOfScheduledSlots": {
                    "0": "45%",
                    "1": "65%",
                    "2": "55%",
                    "3": "60%",
                    "4": "50%",
                    "5": "55%",
                    "averageAllClinics": "55%"
                },
                "numberOfAppointments": {
                    "0": 820,
                    "1": 1025,
                    "2": 720,
                    "3": 900,
                    "4": 800,
                    "5": 850,
                    "averageAllClinics": 850,
                    "total": 5115
                },
                "numberOfServicesUsed": {
                    "0": 315,
                    "1": 360,
                    "2": 290,
                    "3": 320,
                    "4": 300,
                    "5": 310,
                    "averageAllClinics": 310,
                    "total": 1895
                }
            }
        };



        const mockMonthlyAnalytics = {
            "status": "success",
            "message": "Analytics data fetched successfully",
            "timeframe": "monthly",
            "general": {
                "numberOfAllPatients": 30000,
                "numberOfDoctors": 80,
                "numberOfClinics": 6,
                "clinics": [
                    {
                        "id": "0",
                        "name": "Orthopedic Clinic",
                        "numberOfDoctors": 18
                    },
                    {
                        "id": "1",
                        "name": "Nutrition Clinic",
                        "numberOfDoctors": 15
                    },
                    {
                        "id": "2",
                        "name": "Paediatric Clinic",
                        "numberOfDoctors": 20
                    },
                    {
                        "id": "3",
                        "name": "Ophthalmology Clinic",
                        "numberOfDoctors": 15
                    },
                    {
                        "id": "4",
                        "name": "Dental Clinic",
                        "numberOfDoctors": 18
                    },
                    {
                        "id": "5",
                        "name": "Dermatology Clinic",
                        "numberOfDoctors": 15
                    }
                ]
            },
            "analytics": {
                "numberOfActivePatients": 15000,
                "numberOfNewPatients": 1600,
                "billing": {
                    "totalRevenue": {
                        "0": 85320,
                        "1": 72210,
                        "2": 58990,
                        "3": 67640,
                        "4": 59870,
                        "5": 61890,
                        "averageAllClinics": 65003.33,
                        "total": 405920
                    },
                    "billsAdded": {
                        "0": 6120,
                        "1": 7280,
                        "2": 5450,
                        "3": 6010,
                        "4": 5680,
                        "5": 5890,
                        "averageAllClinics": 6081.67,
                        "total": 36430
                    },
                    "invoicesAdded": {
                        "0": 6170,
                        "1": 7320,
                        "2": 5590,
                        "3": 6090,
                        "4": 5750,
                        "5": 5950,
                        "averageAllClinics": 6081.67,
                        "total": 36870
                    }
                },
                "medicalRecords": {
                    "recordsAdded": {
                        "0": 1520,
                        "1": 1890,
                        "2": 1610,
                        "3": 1560,
                        "4": 1640,
                        "5": 1570,
                        "averageAllClinics": 1651.67,
                        "total": 9790
                    },
                    "prescriptionsAdded": {
                        "0": 970,
                        "1": 1180,
                        "2": 1120,
                        "3": 1110,
                        "4": 1090,
                        "5": 1140,
                        "averageAllClinics": 1118.33,
                        "total": 6610
                    },
                    "medicalHistoryAdded": {
                        "0": 510,
                        "1": 610,
                        "2": 530,
                        "3": 490,
                        "4": 550,
                        "5": 520,
                        "averageAllClinics": 535,
                        "total": 3210
                    }
                },
                "patientDemographics": {
                    "ageDistribution": {
                        "0": {
                            "0-18": 250,
                            "19-35": 300,
                            "36-50": 220,
                            "50+": 230
                        },
                        "1": {
                            "0-18": 230,
                            "19-35": 320,
                            "36-50": 250,
                            "50+": 200
                        },
                        "2": {
                            "0-18": 200,
                            "19-35": 280,
                            "36-50": 260,
                            "50+": 260
                        },
                        "3": {
                            "0-18": 280,
                            "19-35": 250,
                            "36-50": 230,
                            "50+": 240
                        },
                        "4": {
                            "0-18": 240,
                            "19-35": 280,
                            "36-50": 240,
                            "50+": 240
                        },
                        "5": {
                            "0-18": 220,
                            "19-35": 300,
                            "36-50": 250,
                            "50+": 230
                        },
                        "averageAllClinics": {
                            "0-18": 240,
                            "19-35": 290,
                            "36-50": 240,
                            "50+": 230
                        },
                        "total": {
                            "0-18": 1420,
                            "19-35": 1730,
                            "36-50": 1450,
                            "50+": 1400
                        }
                    },
                    "genderDistribution": {
                        "0": {
                            "male": 480,
                            "female": 520
                        },
                        "1": {
                            "male": 470,
                            "female": 530
                        },
                        "2": {
                            "male": 490,
                            "female": 510
                        },
                        "3": {
                            "male": 500,
                            "female": 500
                        },
                        "4": {
                            "male": 490,
                            "female": 510
                        },
                        "5": {
                            "male": 500,
                            "female": 500
                        },
                        "averageAllClinics": {
                            "male": 500,
                            "female": 510
                        },
                        "total": {
                            "male": 2450,
                            "female": 2400
                        }
                    }
                },
                "percentageOfScheduledSlots": {
                    "0": "45%",
                    "1": "65%",
                    "2": "55%",
                    "3": "60%",
                    "4": "50%",
                    "5": "55%",
                    "averageAllClinics": "55%"
                },
                "numberOfAppointments": {
                    "0": 8200,
                    "1": 10250,
                    "2": 7200,
                    "3": 9000,
                    "4": 8000,
                    "5": 8500,
                    "averageAllClinics": 8500,
                    "total": 51150
                },
                "numberOfServicesUsed": {
                    "0": 3150,
                    "1": 3600,
                    "2": 2900,
                    "3": 3200,
                    "4": 3000,
                    "5": 3100,
                    "averageAllClinics": 3100,
                    "total": 18950
                }
            }
        };


        const mockYearlyAnalytics = {
            "status": "success",
            "message": "Analytics data fetched successfully",
            "timeframe": "yearly",
            "general": {
                "numberOfAllPatients": 60000,
                "numberOfDoctors": 150,
                "numberOfClinics": 6,
                "clinics": [
                    {
                        "id": "0",
                        "name": "Orthopedic Clinic",
                        "numberOfDoctors": 25
                    },
                    {
                        "id": "1",
                        "name": "Nutrition Clinic",
                        "numberOfDoctors": 20
                    },
                    {
                        "id": "2",
                        "name": "Paediatric Clinic",
                        "numberOfDoctors": 30
                    },
                    {
                        "id": "3",
                        "name": "Ophthalmology Clinic",
                        "numberOfDoctors": 20
                    },
                    {
                        "id": "4",
                        "name": "Dental Clinic",
                        "numberOfDoctors": 25
                    },
                    {
                        "id": "5",
                        "name": "Dermatology Clinic",
                        "numberOfDoctors": 30
                    }
                ]
            },
            "analytics": {
                "numberOfActivePatients": 30000,
                "numberOfNewPatients": 3500,
                "billing": {
                    "totalRevenue": {
                        "0": 152560,
                        "1": 130600,
                        "2": 105500,
                        "3": 122160,
                        "4": 107100,
                        "5": 111480,
                        "averageAllClinics": 116983.33,
                        "total": 701000
                    },
                    "billsAdded": {
                        "0": 10700,
                        "1": 12750,
                        "2": 9590,
                        "3": 10530,
                        "4": 9950,
                        "5": 10310,
                        "averageAllClinics": 10680.83,
                        "total": 64030
                    },
                    "invoicesAdded": {
                        "0": 10780,
                        "1": 12780,
                        "2": 9655,
                        "3": 10525,
                        "4": 9905,
                        "5": 10335,
                        "averageAllClinics": 10755.83,
                        "total": 64580
                    }
                },
                "medicalRecords": {
                    "recordsAdded": {
                        "0": 1520,
                        "1": 1890,
                        "2": 1610,
                        "3": 1560,
                        "4": 1640,
                        "5": 1570,
                        "averageAllClinics": 1651.67,
                        "total": 9900
                    },
                    "prescriptionsAdded": {
                        "0": 970,
                        "1": 1180,
                        "2": 1120,
                        "3": 1110,
                        "4": 1090,
                        "5": 1140,
                        "averageAllClinics": 1118.33,
                        "total": 6710
                    },
                    "medicalHistoryAdded": {
                        "0": 510,
                        "1": 610,
                        "2": 530,
                        "3": 490,
                        "4": 550,
                        "5": 520,
                        "averageAllClinics": 535,
                        "total": 3210
                    }
                },
                "patientDemographics": {
                    "ageDistribution": {
                        "0": {
                            "0-18": 250,
                            "19-35": 300,
                            "36-50": 220,
                            "50+": 230
                        },
                        "1": {
                            "0-18": 230,
                            "19-35": 320,
                            "36-50": 250,
                            "50+": 200
                        },
                        "2": {
                            "0-18": 200,
                            "19-35": 280,
                            "36-50": 260,
                            "50+": 260
                        },
                        "3": {
                            "0-18": 280,
                            "19-35": 250,
                            "36-50": 230,
                            "50+": 240
                        },
                        "4": {
                            "0-18": 240,
                            "19-35": 280,
                            "36-50": 240,
                            "50+": 240
                        },
                        "5": {
                            "0-18": 220,
                            "19-35": 300,
                            "36-50": 250,
                            "50+": 230
                        },
                        "averageAllClinics": {
                            "0-18": 240,
                            "19-35": 290,
                            "36-50": 240,
                            "50+": 230
                        },
                        "total": {
                            "0-18": 1440,
                            "19-35": 1740,
                            "36-50": 1450,
                            "50+": 1400
                        }
                    },
                    "genderDistribution": {
                        "0": {
                            "male": 480,
                            "female": 520
                        },
                        "1": {
                            "male": 470,
                            "female": 530
                        },
                        "2": {
                            "male": 490,
                            "female": 510
                        },
                        "3": {
                            "male": 500,
                            "female": 500
                        },
                        "4": {
                            "male": 490,
                            "female": 510
                        },
                        "5": {
                            "male": 500,
                            "female": 500
                        },
                        "averageAllClinics": {
                            "male": 500,
                            "female": 510
                        },
                        "total": {
                            "male": 2450,
                            "female": 2400
                        }
                    }
                },
                "percentageOfScheduledSlots": {
                    "0": "45%",
                    "1": "65%",
                    "2": "55%",
                    "3": "60%",
                    "4": "50%",
                    "5": "55%",
                    "averageAllClinics": "55%"
                },
                "numberOfAppointments": {
                    "0": 8200,
                    "1": 10250,
                    "2": 7200,
                    "3": 9000,
                    "4": 8000,
                    "5": 8500,
                    "averageAllClinics": 8500,
                    "total": 51150
                },
                "numberOfServicesUsed": {
                    "0": 3150,
                    "1": 3600,
                    "2": 2900,
                    "3": 3200,
                    "4": 3000,
                    "5": 3100,
                    "averageAllClinics": 3100,
                    "total": 18950
                }
            }
        };

        //* parameters
        const { timeframe } = req.query;
        console.log(`getAnalyticsMock: ${timeframe}`);
        const data: any =
            timeframe == 'daily'
                ? mockDailyAnalytics
                : timeframe == 'weekly'
                    ? mockWeeklyAnalytics
                    : timeframe == 'monthly'
                        ? mockMonthlyAnalytics
                        : timeframe == 'yearly'
                            ? mockYearlyAnalytics
                            : {
                                status: 'failed',
                                message: 'Invalid timeframe',
                            };

        console.log(data);
        return res.status(200).json(data);
    } catch (error: any) {
        const err = errorHandler(error);
        res.status(err?.statusCode ?? 500).json(err);
    }
};

export {
    getAnalytics,
    getAnalyticsMock
};
