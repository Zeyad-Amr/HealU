import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import hashing from '../Hash/hashing';

const prisma = new PrismaClient();
//-----------------------check for unique values in database --------------------------------
export function checkUniqueValues(error:any,res:Response):void{
  if (error.code === 'P2002') {                                   // code for unique value errors
    const targetArray = error.meta?.target as string[]; 
    if (targetArray && targetArray.includes('ssn')) {
      res.status(400).json({ error: 'SSN must be unique' });
    } else if (targetArray && targetArray.includes('userName')) {
      res.status(400).json({ error: 'Username must be unique' });
    }else if (targetArray && targetArray.includes('email')) {
      res.status(400).json({ error: 'email must be unique' });
    } 
     else {                                                      // Handle other Prisma known errors
      res.status(400).json({ error: 'Invalid request to the database' });
    }
}  
}
//-----------------------check for capital letter in password --------------------------------
export function hasCapitalizedCharacter(inputString:string):boolean {
  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === inputString[i].toUpperCase()) {
      return true; // Found a capitalized character
    }
  }
  return false; // No capitalized character found
}
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
    else if(hasCapitalizedCharacter(patientData.password)==false){
      throw new Error(' password must has at least one capital letter');
    }
    else{
      // hashing the password 
      patientData.password = await hashing.hashPassword(patientData.password)
      const newPatient = await prisma.user.create({
        data: {
          ...patientData,
        },
      });

      res.status(201).json({ data: newPatient });       // successsful response
    } 
  } catch (error:any) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      checkUniqueValues(error,res);
    }
    else if (error instanceof Prisma.PrismaClientValidationError) {
      // Handle validation errors
      res.status(422).json({ error: 'Validation error in database request' });
    }
    else if (error.message){
      res.status(400).json({ error: error.message });
    }
    else{
      res.status(500).json({ error: 'Internal Server Error' });
    }
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
      // Check if the request includes a password update
      if (patientData.password) {
        // Hash the new password using your hashPassword function
        patientData.password = await hashing.hashPassword(patientData.password);
      }
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
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      checkUniqueValues(error,res);
    }
    else if (error instanceof Prisma.PrismaClientValidationError) {
      // Handle validation errors
      res.status(422).json({ error: 'Validation error in database request' });
    }
    else if(error.message){
      res.status(400).json({ error: error.message });
    }
    else{
      res.status(500).json({ error: 'Internal Server Error' });
    }
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

