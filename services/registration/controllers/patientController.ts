import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';;

const prisma = new PrismaClient();
//-----------------------check for unique values in database --------------------------------
export function checkUniqueValues(error:any,res:Response):void{
  if (error.code === 'P2002') {                                   // code for unique value errors
    const targetArray = error.meta?.target as string[]; 
    if (targetArray && targetArray.includes('ssn')) {
      res.status(400).json({ error: 'SSN must be unique' });
    } else if (targetArray && targetArray.includes('userName')) {
      res.status(400).json({ error: 'Username must be unique' });
    } else {                                                      // Handle other Prisma known errors
      res.status(400).json({ error: 'Invalid request to the database' });
    }
}  
}
//-----------------------Create Patient --------------------------------
export const createPatient = async (req: Request, res: Response) => {
  const patientData = req.body;
  try {
    if(patientData.role!="Patient"){
      throw new Error('Invalid role or unmatched data');
    }
    else if(!patientData.gender || !patientData.firstName||!patientData.lastName||
      !patientData.email||!patientData.phoneNumber||!patientData.role||!patientData.password||
      !patientData.userName||!patientData. insurancePersentage||!patientData.emergencyContact) {
      throw new Error('Missing required data');
    }
    else{
      const newPatient = await prisma.user.create({
        data: {
          ...patientData,
        },
      });

      res.status(201).json({ data: newPatient });       // successsful response
    } 
  } catch (error:any) {
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
  if (isNaN(parsedUserId)) {
    throw new Error('Invalid userId format. Must be an integer.');
  }

  try {
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

    // if (updatedPatient) {
    //   res.status(200).json({ data: updatedPatient });
    // } else {
    //   throw new Error('Patient not found');
    // }

    // successsful response
    res.status(200).json({ data: updatedPatient });
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

