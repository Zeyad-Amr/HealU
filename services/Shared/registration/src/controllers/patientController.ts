import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import hashing from '../Scripts/hashing';
// import * as controller from './patientController';
import * as validate from '../Scripts/validation';
import validation from '../Scripts/validation';
const prisma = new PrismaClient();

//-----------------------Create Patient --------------------------------
export const createPatient = async (req: Request, res: Response) => {
  const patientData = req.body;
  try {
    if(patientData.role!="Patient"){
      throw new Error('Invalid role or unmatched data');
    }
    else if(!patientData.gender || !patientData.firstName||!patientData.lastName||!patientData.email||
      !patientData.phoneNumber||!patientData.role||!patientData.password||!patientData.userName||
      !patientData. insurancePersentage||!patientData.emergencyContactName ||!patientData.emergencyContactNumber) {
      throw new Error('Missing required data');
    }
    else{
      await validation.validateUsertData(patientData);
      const newPatient = await prisma.user.create({
        data: {
          ...patientData,
        },
      });

      res.status(201).json({ data: newPatient });       // successsful response
    } 
  } catch (error:any) {
    validate.handleErrors(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

//-----------------------Update Patient --------------------------------
export const updatePatient = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const patientData = req.body;
  const parsedUserId = parseInt(userId);
  try {
    if (isNaN(parsedUserId)) {
      throw new Error('Invalid userId format. Must be an integer.');
    }
    const patientExists = await prisma.user.findUnique({
      where: {
        userId: parsedUserId,
        role: 'Patient',
      },
    });  
    if (!patientExists) {
      throw new Error('User not found');
    }else{
      await validation.validateUsertData(patientData);
      const updatedPatient = await prisma.user.update({
        where: {
          userId: parsedUserId,
          role: 'Patient',
        },
        data: {
          ...patientData,
          role: 'Patient',
        }
      });
      res.status(200).json({ data: updatedPatient });
    } 
  } catch (error:any) {
    validate.handleErrors(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

//-----------------------Get Patient By ID --------------------------------
export const getPatientById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const parsedUserId = parseInt(userId);
    if (isNaN(parsedUserId)) {
      throw new Error('Invalid userId format. Must be an integer.');
    }
    const patient = await prisma.user.findUnique({
      where: {
        userId: parsedUserId,
        role: 'Patient',
      }
    });

    if (patient) {
      res.status(200).json({ data: patient });
    } else {
      throw new Error('Patient not found');
    }
  } catch (error:any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

//-----------------------Delete Patient --------------------------------
export const deletePatient = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    await prisma.user.delete({
      where: {
        userId: parseInt(userId),
        role: 'Patient',
      },
    });
    
    res.status(204).send();

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};

