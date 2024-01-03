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
                        "id": "Dental Clinic",
                        "name": "Orthopedic Clinic",
                        "numberOfDoctors": 12
                    },
                    {
                        "id": "Nutrition Clinic",
                        "name": "Nutrition Clinic",
                        "numberOfDoctors": 10
                    },
                    {
                        "id": "Dermatology Clinic",
                        "name": "Paediatric Clinic",
                        "numberOfDoctors": 14
                    },
                    {
                        "id": "Ophthalmology Clinic",
                        "name": "Ophthalmology Clinic",
                        "numberOfDoctors": 10
                    },
                    {
                        "id": "Orthopedic Clinic",
                        "name": "Dental Clinic",
                        "numberOfDoctors": 12
                    },
                    {
                        "id": "Pediatric Clinic",
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
                        "Dental Clinic": 8532,
                        "Nutrition Clinic": 7221,
                        "Dermatology Clinic": 5899,
                        "Ophthalmology Clinic": 6764,
                        "Orthopedic Clinic": 5987,
                        "Pediatric Clinic": 6189,
                        "averageAllClinics": 6500.33,
                        "total": 40592
                    },
                    "billsAdded": {
                        "Dental Clinic": 612,
                        "Nutrition Clinic": 728,
                        "Dermatology Clinic": 545,
                        "Ophthalmology Clinic": 601,
                        "Orthopedic Clinic": 568,
                        "Pediatric Clinic": 589,
                        "averageAllClinics": 608.17,
                        "total": 3643
                    },
                    "invoicesAdded": {
                        "Dental Clinic": 617,
                        "Nutrition Clinic": 732,
                        "Dermatology Clinic": 559,
                        "Ophthalmology Clinic": 609,
                        "Orthopedic Clinic": 575,
                        "Pediatric Clinic": 595,
                        "averageAllClinics": 608.17,
                        "total": 3687
                    }
                },
                "medicalRecords": {
                    "recordsAdded": {
                        "Dental Clinic": 152,
                        "Nutrition Clinic": 189,
                        "Dermatology Clinic": 161,
                        "Ophthalmology Clinic": 156,
                        "Orthopedic Clinic": 164,
                        "Pediatric Clinic": 157,
                        "averageAllClinics": 165.17,
                        "total": 979
                    },
                    "prescriptionsAdded": {
                        "Dental Clinic": 97,
                        "Nutrition Clinic": 118,
                        "Dermatology Clinic": 112,
                        "Ophthalmology Clinic": 111,
                        "Orthopedic Clinic": 109,
                        "Pediatric Clinic": 114,
                        "averageAllClinics": 111.83,
                        "total": 661
                    },
                    "medicalHistoryAdded": {
                        "Dental Clinic": 51,
                        "Nutrition Clinic": 61,
                        "Dermatology Clinic": 53,
                        "Ophthalmology Clinic": 49,
                        "Orthopedic Clinic": 55,
                        "Pediatric Clinic": 52,
                        "averageAllClinics": 53.50,
                        "total": 321
                    }
                },
                "patientDemographics": {
                    "ageDistribution": {
                        "Dental Clinic": {
                            "0-18": 25,
                            "19-35": 30,
                            "36-50": 22,
                            "50+": 23
                        },
                        "Nutrition Clinic": {
                            "0-18": 23,
                            "19-35": 32,
                            "36-50": 25,
                            "50+": 20
                        },
                        "Dermatology Clinic": {
                            "0-18": 20,
                            "19-35": 28,
                            "36-50": 26,
                            "50+": 26
                        },
                        "Ophthalmology Clinic": {
                            "0-18": 28,
                            "19-35": 25,
                            "36-50": 23,
                            "50+": 24
                        },
                        "Orthopedic Clinic": {
                            "0-18": 24,
                            "19-35": 28,
                            "36-50": 24,
                            "50+": 24
                        },
                        "Pediatric Clinic": {
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
                        "Dental Clinic": {
                            "male": 48,
                            "female": 52
                        },
                        "Nutrition Clinic": {
                            "male": 47,
                            "female": 53
                        },
                        "Dermatology Clinic": {
                            "male": 49,
                            "female": 51
                        },
                        "Ophthalmology Clinic": {
                            "male": 50,
                            "female": 50
                        },
                        "Orthopedic Clinic": {
                            "male": 49,
                            "female": 51
                        },
                        "Pediatric Clinic": {
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
                    "Dental Clinic": "45%",
                    "Nutrition Clinic": "65%",
                    "Dermatology Clinic": "55%",
                    "Ophthalmology Clinic": "60%",
                    "Orthopedic Clinic": "50%",
                    "Pediatric Clinic": "55%",
                    "averageAllClinics": "55%"
                },
                "numberOfAppointments": {
                    "Dental Clinic": 820,
                    "Nutrition Clinic": 1025,
                    "Dermatology Clinic": 720,
                    "Ophthalmology Clinic": 900,
                    "Orthopedic Clinic": 800,
                    "Pediatric Clinic": 850,
                    "averageAllClinics": 850,
                    "total": 5115
                },
                "numberOfServicesUsed": {
                    "Dental Clinic": 315,
                    "Nutrition Clinic": 360,
                    "Dermatology Clinic": 290,
                    "Ophthalmology Clinic": 320,
                    "Orthopedic Clinic": 300,
                    "Pediatric Clinic": 310,
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
                        "id": "Dental Clinic",
                        "name": "Orthopedic Clinic",
                        "numberOfDoctors": 5
                    },
                    {
                        "id": "Nutrition Clinic",
                        "name": "Nutrition Clinic",
                        "numberOfDoctors": 4
                    },
                    {
                        "id": "Dermatology Clinic",
                        "name": "Paediatric Clinic",
                        "numberOfDoctors": 6
                    },
                    {
                        "id": "Ophthalmology Clinic",
                        "name": "Ophthalmology Clinic",
                        "numberOfDoctors": 4
                    },
                    {
                        "id": "Orthopedic Clinic",
                        "name": "Dental Clinic",
                        "numberOfDoctors": 5
                    },
                    {
                        "id": "Pediatric Clinic",
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
                        "Dental Clinic": 21330,
                        "Nutrition Clinic": 18080,
                        "Dermatology Clinic": 14730,
                        "Ophthalmology Clinic": 16980,
                        "Orthopedic Clinic": 14970,
                        "Pediatric Clinic": 15570,
                        "averageAllClinics": 16271.67,
                        "total": 97660
                    },
                    "billsAdded": {
                        "Dental Clinic": 1530,
                        "Nutrition Clinic": 1820,
                        "Dermatology Clinic": 1365,
                        "Ophthalmology Clinic": 1505,
                        "Orthopedic Clinic": 1420,
                        "Pediatric Clinic": 1475,
                        "averageAllClinics": 1520.83,
                        "total": 9125
                    },
                    "invoicesAdded": {
                        "Dental Clinic": 1540,
                        "Nutrition Clinic": 1830,
                        "Dermatology Clinic": 1395,
                        "Ophthalmology Clinic": 1515,
                        "Orthopedic Clinic": 1425,
                        "Pediatric Clinic": 1485,
                        "averageAllClinics": 1525,
                        "total": 9150
                    }
                },
                "medicalRecords": {
                    "recordsAdded": {
                        "Dental Clinic": 152,
                        "Nutrition Clinic": 189,
                        "Dermatology Clinic": 161,
                        "Ophthalmology Clinic": 156,
                        "Orthopedic Clinic": 164,
                        "Pediatric Clinic": 157,
                        "averageAllClinics": 165.17,
                        "total": 979
                    },
                    "prescriptionsAdded": {
                        "Dental Clinic": 97,
                        "Nutrition Clinic": 118,
                        "Dermatology Clinic": 112,
                        "Ophthalmology Clinic": 111,
                        "Orthopedic Clinic": 109,
                        "Pediatric Clinic": 114,
                        "averageAllClinics": 111.83,
                        "total": 661
                    },
                    "medicalHistoryAdded": {
                        "Dental Clinic": 51,
                        "Nutrition Clinic": 61,
                        "Dermatology Clinic": 53,
                        "Ophthalmology Clinic": 49,
                        "Orthopedic Clinic": 55,
                        "Pediatric Clinic": 52,
                        "averageAllClinics": 53.50,
                        "total": 321
                    }
                },
                "patientDemographics": {
                    "ageDistribution": {
                        "Dental Clinic": {
                            "0-18": 25,
                            "19-35": 30,
                            "36-50": 22,
                            "50+": 23
                        },
                        "Nutrition Clinic": {
                            "0-18": 23,
                            "19-35": 32,
                            "36-50": 25,
                            "50+": 20
                        },
                        "Dermatology Clinic": {
                            "0-18": 20,
                            "19-35": 28,
                            "36-50": 26,
                            "50+": 26
                        },
                        "Ophthalmology Clinic": {
                            "0-18": 28,
                            "19-35": 25,
                            "36-50": 23,
                            "50+": 24
                        },
                        "Orthopedic Clinic": {
                            "0-18": 24,
                            "19-35": 28,
                            "36-50": 24,
                            "50+": 24
                        },
                        "Pediatric Clinic": {
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
                        "Dental Clinic": {
                            "male": 48,
                            "female": 52
                        },
                        "Nutrition Clinic": {
                            "male": 47,
                            "female": 53
                        },
                        "Dermatology Clinic": {
                            "male": 49,
                            "female": 51
                        },
                        "Ophthalmology Clinic": {
                            "male": 50,
                            "female": 50
                        },
                        "Orthopedic Clinic": {
                            "male": 49,
                            "female": 51
                        },
                        "Pediatric Clinic": {
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
                    "Dental Clinic": "45%",
                    "Nutrition Clinic": "65%",
                    "Dermatology Clinic": "55%",
                    "Ophthalmology Clinic": "60%",
                    "Orthopedic Clinic": "50%",
                    "Pediatric Clinic": "55%",
                    "averageAllClinics": "55%"
                },
                "numberOfAppointments": {
                    "Dental Clinic": 820,
                    "Nutrition Clinic": 1025,
                    "Dermatology Clinic": 720,
                    "Ophthalmology Clinic": 900,
                    "Orthopedic Clinic": 800,
                    "Pediatric Clinic": 850,
                    "averageAllClinics": 850,
                    "total": 5115
                },
                "numberOfServicesUsed": {
                    "Dental Clinic": 315,
                    "Nutrition Clinic": 360,
                    "Dermatology Clinic": 290,
                    "Ophthalmology Clinic": 320,
                    "Orthopedic Clinic": 300,
                    "Pediatric Clinic": 310,
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
                        "id": "Dental Clinic",
                        "name": "Orthopedic Clinic",
                        "numberOfDoctors": 18
                    },
                    {
                        "id": "Nutrition Clinic",
                        "name": "Nutrition Clinic",
                        "numberOfDoctors": 15
                    },
                    {
                        "id": "Dermatology Clinic",
                        "name": "Paediatric Clinic",
                        "numberOfDoctors": 20
                    },
                    {
                        "id": "Ophthalmology Clinic",
                        "name": "Ophthalmology Clinic",
                        "numberOfDoctors": 15
                    },
                    {
                        "id": "Orthopedic Clinic",
                        "name": "Dental Clinic",
                        "numberOfDoctors": 18
                    },
                    {
                        "id": "Pediatric Clinic",
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
                        "Dental Clinic": 85320,
                        "Nutrition Clinic": 72210,
                        "Dermatology Clinic": 58990,
                        "Ophthalmology Clinic": 67640,
                        "Orthopedic Clinic": 59870,
                        "Pediatric Clinic": 61890,
                        "averageAllClinics": 65003.33,
                        "total": 405920
                    },
                    "billsAdded": {
                        "Dental Clinic": 6120,
                        "Nutrition Clinic": 7280,
                        "Dermatology Clinic": 5450,
                        "Ophthalmology Clinic": 6010,
                        "Orthopedic Clinic": 5680,
                        "Pediatric Clinic": 5890,
                        "averageAllClinics": 6081.67,
                        "total": 36430
                    },
                    "invoicesAdded": {
                        "Dental Clinic": 6170,
                        "Nutrition Clinic": 7320,
                        "Dermatology Clinic": 5590,
                        "Ophthalmology Clinic": 6090,
                        "Orthopedic Clinic": 5750,
                        "Pediatric Clinic": 5950,
                        "averageAllClinics": 6081.67,
                        "total": 36870
                    }
                },
                "medicalRecords": {
                    "recordsAdded": {
                        "Dental Clinic": 1520,
                        "Nutrition Clinic": 1890,
                        "Dermatology Clinic": 1610,
                        "Ophthalmology Clinic": 1560,
                        "Orthopedic Clinic": 1640,
                        "Pediatric Clinic": 1570,
                        "averageAllClinics": 1651.67,
                        "total": 9790
                    },
                    "prescriptionsAdded": {
                        "Dental Clinic": 970,
                        "Nutrition Clinic": 1180,
                        "Dermatology Clinic": 1120,
                        "Ophthalmology Clinic": 1110,
                        "Orthopedic Clinic": 1090,
                        "Pediatric Clinic": 1140,
                        "averageAllClinics": 1118.33,
                        "total": 6610
                    },
                    "medicalHistoryAdded": {
                        "Dental Clinic": 510,
                        "Nutrition Clinic": 610,
                        "Dermatology Clinic": 530,
                        "Ophthalmology Clinic": 490,
                        "Orthopedic Clinic": 550,
                        "Pediatric Clinic": 520,
                        "averageAllClinics": 535,
                        "total": 3210
                    }
                },
                "patientDemographics": {
                    "ageDistribution": {
                        "Dental Clinic": {
                            "0-18": 250,
                            "19-35": 300,
                            "36-50": 220,
                            "50+": 230
                        },
                        "Nutrition Clinic": {
                            "0-18": 230,
                            "19-35": 320,
                            "36-50": 250,
                            "50+": 200
                        },
                        "Dermatology Clinic": {
                            "0-18": 200,
                            "19-35": 280,
                            "36-50": 260,
                            "50+": 260
                        },
                        "Ophthalmology Clinic": {
                            "0-18": 280,
                            "19-35": 250,
                            "36-50": 230,
                            "50+": 240
                        },
                        "Orthopedic Clinic": {
                            "0-18": 240,
                            "19-35": 280,
                            "36-50": 240,
                            "50+": 240
                        },
                        "Pediatric Clinic": {
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
                        "Dental Clinic": {
                            "male": 480,
                            "female": 520
                        },
                        "Nutrition Clinic": {
                            "male": 470,
                            "female": 530
                        },
                        "Dermatology Clinic": {
                            "male": 490,
                            "female": 510
                        },
                        "Ophthalmology Clinic": {
                            "male": 500,
                            "female": 500
                        },
                        "Orthopedic Clinic": {
                            "male": 490,
                            "female": 510
                        },
                        "Pediatric Clinic": {
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
                    "Dental Clinic": "45%",
                    "Nutrition Clinic": "65%",
                    "Dermatology Clinic": "55%",
                    "Ophthalmology Clinic": "60%",
                    "Orthopedic Clinic": "50%",
                    "Pediatric Clinic": "55%",
                    "averageAllClinics": "55%"
                },
                "numberOfAppointments": {
                    "Dental Clinic": 8200,
                    "Nutrition Clinic": 10250,
                    "Dermatology Clinic": 7200,
                    "Ophthalmology Clinic": 9000,
                    "Orthopedic Clinic": 8000,
                    "Pediatric Clinic": 8500,
                    "averageAllClinics": 8500,
                    "total": 51150
                },
                "numberOfServicesUsed": {
                    "Dental Clinic": 3150,
                    "Nutrition Clinic": 3600,
                    "Dermatology Clinic": 2900,
                    "Ophthalmology Clinic": 3200,
                    "Orthopedic Clinic": 3000,
                    "Pediatric Clinic": 3100,
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
                        "id": "Dental Clinic",
                        "name": "Orthopedic Clinic",
                        "numberOfDoctors": 25
                    },
                    {
                        "id": "Nutrition Clinic",
                        "name": "Nutrition Clinic",
                        "numberOfDoctors": 20
                    },
                    {
                        "id": "Dermatology Clinic",
                        "name": "Paediatric Clinic",
                        "numberOfDoctors": 30
                    },
                    {
                        "id": "Ophthalmology Clinic",
                        "name": "Ophthalmology Clinic",
                        "numberOfDoctors": 20
                    },
                    {
                        "id": "Orthopedic Clinic",
                        "name": "Dental Clinic",
                        "numberOfDoctors": 25
                    },
                    {
                        "id": "Pediatric Clinic",
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
                        "Dental Clinic": 152560,
                        "Nutrition Clinic": 130600,
                        "Dermatology Clinic": 105500,
                        "Ophthalmology Clinic": 122160,
                        "Orthopedic Clinic": 107100,
                        "Pediatric Clinic": 111480,
                        "averageAllClinics": 116983.33,
                        "total": 701000
                    },
                    "billsAdded": {
                        "Dental Clinic": 10700,
                        "Nutrition Clinic": 12750,
                        "Dermatology Clinic": 9590,
                        "Ophthalmology Clinic": 10530,
                        "Orthopedic Clinic": 9950,
                        "Pediatric Clinic": 10310,
                        "averageAllClinics": 10680.83,
                        "total": 64030
                    },
                    "invoicesAdded": {
                        "Dental Clinic": 10780,
                        "Nutrition Clinic": 12780,
                        "Dermatology Clinic": 9655,
                        "Ophthalmology Clinic": 10525,
                        "Orthopedic Clinic": 9905,
                        "Pediatric Clinic": 10335,
                        "averageAllClinics": 10755.83,
                        "total": 64580
                    }
                },
                "medicalRecords": {
                    "recordsAdded": {
                        "Dental Clinic": 1520,
                        "Nutrition Clinic": 1890,
                        "Dermatology Clinic": 1610,
                        "Ophthalmology Clinic": 1560,
                        "Orthopedic Clinic": 1640,
                        "Pediatric Clinic": 1570,
                        "averageAllClinics": 1651.67,
                        "total": 9900
                    },
                    "prescriptionsAdded": {
                        "Dental Clinic": 970,
                        "Nutrition Clinic": 1180,
                        "Dermatology Clinic": 1120,
                        "Ophthalmology Clinic": 1110,
                        "Orthopedic Clinic": 1090,
                        "Pediatric Clinic": 1140,
                        "averageAllClinics": 1118.33,
                        "total": 6710
                    },
                    "medicalHistoryAdded": {
                        "Dental Clinic": 510,
                        "Nutrition Clinic": 610,
                        "Dermatology Clinic": 530,
                        "Ophthalmology Clinic": 490,
                        "Orthopedic Clinic": 550,
                        "Pediatric Clinic": 520,
                        "averageAllClinics": 535,
                        "total": 3210
                    }
                },
                "patientDemographics": {
                    "ageDistribution": {
                        "Dental Clinic": {
                            "0-18": 250,
                            "19-35": 300,
                            "36-50": 220,
                            "50+": 230
                        },
                        "Nutrition Clinic": {
                            "0-18": 230,
                            "19-35": 320,
                            "36-50": 250,
                            "50+": 200
                        },
                        "Dermatology Clinic": {
                            "0-18": 200,
                            "19-35": 280,
                            "36-50": 260,
                            "50+": 260
                        },
                        "Ophthalmology Clinic": {
                            "0-18": 280,
                            "19-35": 250,
                            "36-50": 230,
                            "50+": 240
                        },
                        "Orthopedic Clinic": {
                            "0-18": 240,
                            "19-35": 280,
                            "36-50": 240,
                            "50+": 240
                        },
                        "Pediatric Clinic": {
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
                        "Dental Clinic": {
                            "male": 480,
                            "female": 520
                        },
                        "Nutrition Clinic": {
                            "male": 470,
                            "female": 530
                        },
                        "Dermatology Clinic": {
                            "male": 490,
                            "female": 510
                        },
                        "Ophthalmology Clinic": {
                            "male": 500,
                            "female": 500
                        },
                        "Orthopedic Clinic": {
                            "male": 490,
                            "female": 510
                        },
                        "Pediatric Clinic": {
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
                    "Dental Clinic": "45%",
                    "Nutrition Clinic": "65%",
                    "Dermatology Clinic": "55%",
                    "Ophthalmology Clinic": "60%",
                    "Orthopedic Clinic": "50%",
                    "Pediatric Clinic": "55%",
                    "averageAllClinics": "55%"
                },
                "numberOfAppointments": {
                    "Dental Clinic": 8200,
                    "Nutrition Clinic": 10250,
                    "Dermatology Clinic": 7200,
                    "Ophthalmology Clinic": 9000,
                    "Orthopedic Clinic": 8000,
                    "Pediatric Clinic": 8500,
                    "averageAllClinics": 8500,
                    "total": 51150
                },
                "numberOfServicesUsed": {
                    "Dental Clinic": 3150,
                    "Nutrition Clinic": 3600,
                    "Dermatology Clinic": 2900,
                    "Ophthalmology Clinic": 3200,
                    "Orthopedic Clinic": 3000,
                    "Pediatric Clinic": 3100,
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
