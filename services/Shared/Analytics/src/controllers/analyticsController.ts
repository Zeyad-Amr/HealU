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
            s: getNumberOfClinics(allClinicsRes?.data.clinics ?? []),
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
                        "id": "Dental",
                        "name": "Orthopedic",
                        "numberOfDoctors": 12
                    },
                    {
                        "id": "Nutrition",
                        "name": "Nutrition",
                        "numberOfDoctors": 10
                    },
                    {
                        "id": "Dermatology",
                        "name": "Paediatric",
                        "numberOfDoctors": 14
                    },
                    {
                        "id": "Ophthalmology",
                        "name": "Ophthalmology",
                        "numberOfDoctors": 10
                    },
                    {
                        "id": "Orthopedic",
                        "name": "Dental",
                        "numberOfDoctors": 12
                    },
                    {
                        "id": "Pediatric",
                        "name": "Dermatology",
                        "numberOfDoctors": 10
                    }
                ]
            },
            "analytics": {
                "numberOfActivePatients": 5000,
                "numberOfNewPatients": 535.83,
                "billing": {
                    "totalRevenue": {
                        "Dental": 8532,
                        "Nutrition": 7221,
                        "Dermatology": 5899,
                        "Ophthalmology": 6764,
                        "Orthopedic": 5987,
                        "Pediatric": 6189,
                        "Average": 6500.33,
                        "Total": 40592
                    },
                    "billsAdded": {
                        "Dental": 612,
                        "Nutrition": 728,
                        "Dermatology": 545,
                        "Ophthalmology": 601,
                        "Orthopedic": 568,
                        "Pediatric": 589,
                        "Average": 608.17,
                        "Total": 3643
                    },
                    "invoicesAdded": {
                        "Dental": 617,
                        "Nutrition": 732,
                        "Dermatology": 559,
                        "Ophthalmology": 609,
                        "Orthopedic": 575,
                        "Pediatric": 595,
                        "Average": 608.17,
                        "Total": 3687
                    }
                },
                "medicalRecords": {
                    "recordsAdded": {
                        "Dental": 152,
                        "Nutrition": 189,
                        "Dermatology": 161,
                        "Ophthalmology": 156,
                        "Orthopedic": 164,
                        "Pediatric": 157,
                        "Average": 165.17,
                        "Total": 979
                    },
                    "prescriptionsAdded": {
                        "Dental": 97,
                        "Nutrition": 118,
                        "Dermatology": 112,
                        "Ophthalmology": 111,
                        "Orthopedic": 109,
                        "Pediatric": 114,
                        "Average": 111.83,
                        "Total": 661
                    },
                    "medicalHistoryAdded": {
                        "Dental": 51,
                        "Nutrition": 61,
                        "Dermatology": 53,
                        "Ophthalmology": 49,
                        "Orthopedic": 55,
                        "Pediatric": 52,
                        "Average": 53.50,
                        "Total": 321
                    }
                },
                "patientDemographics": {
                    "ageDistribution": {
                        "Dental": {
                            "0-18": 25,
                            "19-35": 30,
                            "36-50": 22,
                            "50+": 23
                        },
                        "Nutrition": {
                            "0-18": 23,
                            "19-35": 32,
                            "36-50": 25,
                            "50+": 20
                        },
                        "Dermatology": {
                            "0-18": 20,
                            "19-35": 28,
                            "36-50": 26,
                            "50+": 26
                        },
                        "Ophthalmology": {
                            "0-18": 28,
                            "19-35": 25,
                            "36-50": 23,
                            "50+": 24
                        },
                        "Orthopedic": {
                            "0-18": 24,
                            "19-35": 28,
                            "36-50": 24,
                            "50+": 24
                        },
                        "Pediatric": {
                            "0-18": 22,
                            "19-35": 30,
                            "36-50": 25,
                            "50+": 23
                        },
                        "Average": {
                            "0-18": 24,
                            "19-35": 29,
                            "36-50": 24,
                            "50+": 23
                        },
                        "Total": {
                            "0-18": 142,
                            "19-35": 173,
                            "36-50": 145,
                            "50+": 140
                        }
                    },
                    "genderDistribution": {
                        "Dental": {
                            "male": 48,
                            "female": 52
                        },
                        "Nutrition": {
                            "male": 47,
                            "female": 53
                        },
                        "Dermatology": {
                            "male": 49,
                            "female": 51
                        },
                        "Ophthalmology": {
                            "male": 50,
                            "female": 50
                        },
                        "Orthopedic": {
                            "male": 49,
                            "female": 51
                        },
                        "Pediatric": {
                            "male": 50,
                            "female": 50
                        },
                        "Average": {
                            "male": 50,
                            "female": 51
                        },
                        "Total": {
                            "male": 245,
                            "female": 240
                        }
                    }
                },
                "percentageOfScheduledSlots": {
                    "Dental": "45%",
                    "Nutrition": "65%",
                    "Dermatology": "55%",
                    "Ophthalmology": "60%",
                    "Orthopedic": "50%",
                    "Pediatric": "55%",
                    "Average": "55%"
                },
                "numberOfAppointments": {
                    "Dental": 820,
                    "Nutrition": 1025,
                    "Dermatology": 720,
                    "Ophthalmology": 900,
                    "Orthopedic": 800,
                    "Pediatric": 850,
                    "Average": 850,
                    "Total": 5115
                },
                "numberOfServicesUsed": {
                    "Dental": 315,
                    "Nutrition": 360,
                    "Dermatology": 290,
                    "Ophthalmology": 320,
                    "Orthopedic": 300,
                    "Pediatric": 310,
                    "Average": 310,
                    "Total": 1895
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
                        "id": "Dental",
                        "name": "Orthopedic",
                        "numberOfDoctors": 5
                    },
                    {
                        "id": "Nutrition",
                        "name": "Nutrition",
                        "numberOfDoctors": 4
                    },
                    {
                        "id": "Dermatology",
                        "name": "Paediatric",
                        "numberOfDoctors": 6
                    },
                    {
                        "id": "Ophthalmology",
                        "name": "Ophthalmology",
                        "numberOfDoctors": 4
                    },
                    {
                        "id": "Orthopedic",
                        "name": "Dental",
                        "numberOfDoctors": 5
                    },
                    {
                        "id": "Pediatric",
                        "name": "Dermatology",
                        "numberOfDoctors": 4
                    }
                ]
            },
            "analytics": {
                "numberOfActivePatients": 3750,
                "numberOfNewPatients": 400,
                "billing": {
                    "totalRevenue": {
                        "Dental": 21330,
                        "Nutrition": 18080,
                        "Dermatology": 14730,
                        "Ophthalmology": 16980,
                        "Orthopedic": 14970,
                        "Pediatric": 15570,
                        "Average": 16271.67,
                        "Total": 97660
                    },
                    "billsAdded": {
                        "Dental": 1530,
                        "Nutrition": 1820,
                        "Dermatology": 1365,
                        "Ophthalmology": 1505,
                        "Orthopedic": 1420,
                        "Pediatric": 1475,
                        "Average": 1520.83,
                        "Total": 9125
                    },
                    "invoicesAdded": {
                        "Dental": 1540,
                        "Nutrition": 1830,
                        "Dermatology": 1395,
                        "Ophthalmology": 1515,
                        "Orthopedic": 1425,
                        "Pediatric": 1485,
                        "Average": 1525,
                        "Total": 9150
                    }
                },
                "medicalRecords": {
                    "recordsAdded": {
                        "Dental": 152,
                        "Nutrition": 189,
                        "Dermatology": 161,
                        "Ophthalmology": 156,
                        "Orthopedic": 164,
                        "Pediatric": 157,
                        "Average": 165.17,
                        "Total": 979
                    },
                    "prescriptionsAdded": {
                        "Dental": 97,
                        "Nutrition": 118,
                        "Dermatology": 112,
                        "Ophthalmology": 111,
                        "Orthopedic": 109,
                        "Pediatric": 114,
                        "Average": 111.83,
                        "Total": 661
                    },
                    "medicalHistoryAdded": {
                        "Dental": 51,
                        "Nutrition": 61,
                        "Dermatology": 53,
                        "Ophthalmology": 49,
                        "Orthopedic": 55,
                        "Pediatric": 52,
                        "Average": 53.50,
                        "Total": 321
                    }
                },
                "patientDemographics": {
                    "ageDistribution": {
                        "Dental": {
                            "0-18": 25,
                            "19-35": 30,
                            "36-50": 22,
                            "50+": 23
                        },
                        "Nutrition": {
                            "0-18": 23,
                            "19-35": 32,
                            "36-50": 25,
                            "50+": 20
                        },
                        "Dermatology": {
                            "0-18": 20,
                            "19-35": 28,
                            "36-50": 26,
                            "50+": 26
                        },
                        "Ophthalmology": {
                            "0-18": 28,
                            "19-35": 25,
                            "36-50": 23,
                            "50+": 24
                        },
                        "Orthopedic": {
                            "0-18": 24,
                            "19-35": 28,
                            "36-50": 24,
                            "50+": 24
                        },
                        "Pediatric": {
                            "0-18": 22,
                            "19-35": 30,
                            "36-50": 25,
                            "50+": 23
                        },
                        "Average": {
                            "0-18": 24,
                            "19-35": 29,
                            "36-50": 24,
                            "50+": 23
                        },
                        "Total": {
                            "0-18": 142,
                            "19-35": 173,
                            "36-50": 145,
                            "50+": 140
                        }
                    },
                    "genderDistribution": {
                        "Dental": {
                            "male": 48,
                            "female": 52
                        },
                        "Nutrition": {
                            "male": 47,
                            "female": 53
                        },
                        "Dermatology": {
                            "male": 49,
                            "female": 51
                        },
                        "Ophthalmology": {
                            "male": 50,
                            "female": 50
                        },
                        "Orthopedic": {
                            "male": 49,
                            "female": 51
                        },
                        "Pediatric": {
                            "male": 50,
                            "female": 50
                        },
                        "Average": {
                            "male": 50,
                            "female": 51
                        },
                        "Total": {
                            "male": 245,
                            "female": 240
                        }
                    }
                },
                "percentageOfScheduledSlots": {
                    "Dental": "45%",
                    "Nutrition": "65%",
                    "Dermatology": "55%",
                    "Ophthalmology": "60%",
                    "Orthopedic": "50%",
                    "Pediatric": "55%",
                    "Average": "55%"
                },
                "numberOfAppointments": {
                    "Dental": 820,
                    "Nutrition": 1025,
                    "Dermatology": 720,
                    "Ophthalmology": 900,
                    "Orthopedic": 800,
                    "Pediatric": 850,
                    "Average": 850,
                    "Total": 5115
                },
                "numberOfServicesUsed": {
                    "Dental": 315,
                    "Nutrition": 360,
                    "Dermatology": 290,
                    "Ophthalmology": 320,
                    "Orthopedic": 300,
                    "Pediatric": 310,
                    "Average": 310,
                    "Total": 1895
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
                        "id": "Dental",
                        "name": "Orthopedic",
                        "numberOfDoctors": 18
                    },
                    {
                        "id": "Nutrition",
                        "name": "Nutrition",
                        "numberOfDoctors": 15
                    },
                    {
                        "id": "Dermatology",
                        "name": "Paediatric",
                        "numberOfDoctors": 20
                    },
                    {
                        "id": "Ophthalmology",
                        "name": "Ophthalmology",
                        "numberOfDoctors": 15
                    },
                    {
                        "id": "Orthopedic",
                        "name": "Dental",
                        "numberOfDoctors": 18
                    },
                    {
                        "id": "Pediatric",
                        "name": "Dermatology",
                        "numberOfDoctors": 15
                    }
                ]
            },
            "analytics": {
                "numberOfActivePatients": 15000,
                "numberOfNewPatients": 1600,
                "billing": {
                    "totalRevenue": {
                        "Dental": 85320,
                        "Nutrition": 72210,
                        "Dermatology": 58990,
                        "Ophthalmology": 67640,
                        "Orthopedic": 59870,
                        "Pediatric": 61890,
                        "Average": 65003.33,
                        "Total": 405920
                    },
                    "billsAdded": {
                        "Dental": 6120,
                        "Nutrition": 7280,
                        "Dermatology": 5450,
                        "Ophthalmology": 6010,
                        "Orthopedic": 5680,
                        "Pediatric": 5890,
                        "Average": 6081.67,
                        "Total": 36430
                    },
                    "invoicesAdded": {
                        "Dental": 6170,
                        "Nutrition": 7320,
                        "Dermatology": 5590,
                        "Ophthalmology": 6090,
                        "Orthopedic": 5750,
                        "Pediatric": 5950,
                        "Average": 6081.67,
                        "Total": 36870
                    }
                },
                "medicalRecords": {
                    "recordsAdded": {
                        "Dental": 1520,
                        "Nutrition": 1890,
                        "Dermatology": 1610,
                        "Ophthalmology": 1560,
                        "Orthopedic": 1640,
                        "Pediatric": 1570,
                        "Average": 1651.67,
                        "Total": 9790
                    },
                    "prescriptionsAdded": {
                        "Dental": 970,
                        "Nutrition": 1180,
                        "Dermatology": 1120,
                        "Ophthalmology": 1110,
                        "Orthopedic": 1090,
                        "Pediatric": 1140,
                        "Average": 1118.33,
                        "Total": 6610
                    },
                    "medicalHistoryAdded": {
                        "Dental": 510,
                        "Nutrition": 610,
                        "Dermatology": 530,
                        "Ophthalmology": 490,
                        "Orthopedic": 550,
                        "Pediatric": 520,
                        "Average": 535,
                        "Total": 3210
                    }
                },
                "patientDemographics": {
                    "ageDistribution": {
                        "Dental": {
                            "0-18": 250,
                            "19-35": 300,
                            "36-50": 220,
                            "50+": 230
                        },
                        "Nutrition": {
                            "0-18": 230,
                            "19-35": 320,
                            "36-50": 250,
                            "50+": 200
                        },
                        "Dermatology": {
                            "0-18": 200,
                            "19-35": 280,
                            "36-50": 260,
                            "50+": 260
                        },
                        "Ophthalmology": {
                            "0-18": 280,
                            "19-35": 250,
                            "36-50": 230,
                            "50+": 240
                        },
                        "Orthopedic": {
                            "0-18": 240,
                            "19-35": 280,
                            "36-50": 240,
                            "50+": 240
                        },
                        "Pediatric": {
                            "0-18": 220,
                            "19-35": 300,
                            "36-50": 250,
                            "50+": 230
                        },
                        "Average": {
                            "0-18": 240,
                            "19-35": 290,
                            "36-50": 240,
                            "50+": 230
                        },
                        "Total": {
                            "0-18": 1420,
                            "19-35": 1730,
                            "36-50": 1450,
                            "50+": 1400
                        }
                    },
                    "genderDistribution": {
                        "Dental": {
                            "male": 480,
                            "female": 520
                        },
                        "Nutrition": {
                            "male": 470,
                            "female": 530
                        },
                        "Dermatology": {
                            "male": 490,
                            "female": 510
                        },
                        "Ophthalmology": {
                            "male": 500,
                            "female": 500
                        },
                        "Orthopedic": {
                            "male": 490,
                            "female": 510
                        },
                        "Pediatric": {
                            "male": 500,
                            "female": 500
                        },
                        "Average": {
                            "male": 500,
                            "female": 510
                        },
                        "Total": {
                            "male": 2450,
                            "female": 2400
                        }
                    }
                },
                "percentageOfScheduledSlots": {
                    "Dental": "45%",
                    "Nutrition": "65%",
                    "Dermatology": "55%",
                    "Ophthalmology": "60%",
                    "Orthopedic": "50%",
                    "Pediatric": "55%",
                    "Average": "55%"
                },
                "numberOfAppointments": {
                    "Dental": 8200,
                    "Nutrition": 10250,
                    "Dermatology": 7200,
                    "Ophthalmology": 9000,
                    "Orthopedic": 8000,
                    "Pediatric": 8500,
                    "Average": 8500,
                    "Total": 51150
                },
                "numberOfServicesUsed": {
                    "Dental": 3150,
                    "Nutrition": 3600,
                    "Dermatology": 2900,
                    "Ophthalmology": 3200,
                    "Orthopedic": 3000,
                    "Pediatric": 3100,
                    "Average": 3100,
                    "Total": 18950
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
                        "id": "Dental",
                        "name": "Orthopedic",
                        "numberOfDoctors": 25
                    },
                    {
                        "id": "Nutrition",
                        "name": "Nutrition",
                        "numberOfDoctors": 20
                    },
                    {
                        "id": "Dermatology",
                        "name": "Paediatric",
                        "numberOfDoctors": 30
                    },
                    {
                        "id": "Ophthalmology",
                        "name": "Ophthalmology",
                        "numberOfDoctors": 20
                    },
                    {
                        "id": "Orthopedic",
                        "name": "Dental",
                        "numberOfDoctors": 25
                    },
                    {
                        "id": "Pediatric",
                        "name": "Dermatology",
                        "numberOfDoctors": 30
                    }
                ]
            },
            "analytics": {
                "numberOfActivePatients": 30000,
                "numberOfNewPatients": 3500,
                "billing": {
                    "totalRevenue": {
                        "Dental": 152560,
                        "Nutrition": 130600,
                        "Dermatology": 105500,
                        "Ophthalmology": 122160,
                        "Orthopedic": 107100,
                        "Pediatric": 111480,
                        "Average": 116983.33,
                        "Total": 701000
                    },
                    "billsAdded": {
                        "Dental": 10700,
                        "Nutrition": 12750,
                        "Dermatology": 9590,
                        "Ophthalmology": 10530,
                        "Orthopedic": 9950,
                        "Pediatric": 10310,
                        "Average": 10680.83,
                        "Total": 64030
                    },
                    "invoicesAdded": {
                        "Dental": 10780,
                        "Nutrition": 12780,
                        "Dermatology": 9655,
                        "Ophthalmology": 10525,
                        "Orthopedic": 9905,
                        "Pediatric": 10335,
                        "Average": 10755.83,
                        "Total": 64580
                    }
                },
                "medicalRecords": {
                    "recordsAdded": {
                        "Dental": 1520,
                        "Nutrition": 1890,
                        "Dermatology": 1610,
                        "Ophthalmology": 1560,
                        "Orthopedic": 1640,
                        "Pediatric": 1570,
                        "Average": 1651.67,
                        "Total": 9900
                    },
                    "prescriptionsAdded": {
                        "Dental": 970,
                        "Nutrition": 1180,
                        "Dermatology": 1120,
                        "Ophthalmology": 1110,
                        "Orthopedic": 1090,
                        "Pediatric": 1140,
                        "Average": 1118.33,
                        "Total": 6710
                    },
                    "medicalHistoryAdded": {
                        "Dental": 510,
                        "Nutrition": 610,
                        "Dermatology": 530,
                        "Ophthalmology": 490,
                        "Orthopedic": 550,
                        "Pediatric": 520,
                        "Average": 535,
                        "Total": 3210
                    }
                },
                "patientDemographics": {
                    "ageDistribution": {
                        "Dental": {
                            "0-18": 250,
                            "19-35": 300,
                            "36-50": 220,
                            "50+": 230
                        },
                        "Nutrition": {
                            "0-18": 230,
                            "19-35": 320,
                            "36-50": 250,
                            "50+": 200
                        },
                        "Dermatology": {
                            "0-18": 200,
                            "19-35": 280,
                            "36-50": 260,
                            "50+": 260
                        },
                        "Ophthalmology": {
                            "0-18": 280,
                            "19-35": 250,
                            "36-50": 230,
                            "50+": 240
                        },
                        "Orthopedic": {
                            "0-18": 240,
                            "19-35": 280,
                            "36-50": 240,
                            "50+": 240
                        },
                        "Pediatric": {
                            "0-18": 220,
                            "19-35": 300,
                            "36-50": 250,
                            "50+": 230
                        },
                        "Average": {
                            "0-18": 240,
                            "19-35": 290,
                            "36-50": 240,
                            "50+": 230
                        },
                        "Total": {
                            "0-18": 1440,
                            "19-35": 1740,
                            "36-50": 1450,
                            "50+": 1400
                        }
                    },
                    "genderDistribution": {
                        "Dental": {
                            "male": 480,
                            "female": 520
                        },
                        "Nutrition": {
                            "male": 470,
                            "female": 530
                        },
                        "Dermatology": {
                            "male": 490,
                            "female": 510
                        },
                        "Ophthalmology": {
                            "male": 500,
                            "female": 500
                        },
                        "Orthopedic": {
                            "male": 490,
                            "female": 510
                        },
                        "Pediatric": {
                            "male": 500,
                            "female": 500
                        },
                        "Average": {
                            "male": 500,
                            "female": 510
                        },
                        "Total": {
                            "male": 2450,
                            "female": 2400
                        }
                    }
                },
                "percentageOfScheduledSlots": {
                    "Dental": "45%",
                    "Nutrition": "65%",
                    "Dermatology": "55%",
                    "Ophthalmology": "60%",
                    "Orthopedic": "50%",
                    "Pediatric": "55%",
                    "Average": "55%"
                },
                "numberOfAppointments": {
                    "Dental": 8200,
                    "Nutrition": 10250,
                    "Dermatology": 7200,
                    "Ophthalmology": 9000,
                    "Orthopedic": 8000,
                    "Pediatric": 8500,
                    "Average": 8500,
                    "Total": 51150
                },
                "numberOfServicesUsed": {
                    "Dental": 3150,
                    "Nutrition": 3600,
                    "Dermatology": 2900,
                    "Ophthalmology": 3200,
                    "Orthopedic": 3000,
                    "Pediatric": 3100,
                    "Average": 3100,
                    "Total": 18950
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
