// controllers/patientController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';;

const prisma = new PrismaClient();

//-----------------------Create Patient --------------------------------

export const createPatient = async (req: Request, res: Response) => {
  const patientData = req.body;
  try {
    const newPatient = await prisma.user.create({
      data: {
        ...patientData,
        Role: 'Patient',
      },
    });

    res.status(201).json({ data: newPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};

//-----------------------Update Patient --------------------------------

export const updatePatient = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const patientData = req.body;

  try {
    const updatedPatient = await prisma.user.update({
      where: {
        UserID: parseInt(userID),
      },
      data: {
        ...patientData,
        Role: 'Patient',
      },
      include: {
        Patient: true,
      },
    });

    res.status(200).json({ data: updatedPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};

//-----------------------Get Patient By ID --------------------------------

export const getPatientById = async (req: Request, res: Response) => {
  const { userID } = req.params;
  console.log("pppppppppppppppp");
  console.log(userID);
  try {
    const patient = await prisma.user.findUnique({
      where: {
        UserID: parseInt(userID),
        Role: 'Patient',
      },
      include: {
        Patient: true,
      },
    });

    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
    } else {
      res.status(200).json({ data: patient });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};


//-----------------------Delete Patient --------------------------------

export const deletePatient = async (req: Request, res: Response) => {
  const { userID } = req.params;

  try {
    await prisma.user.delete({
      where: {
        UserID: parseInt(userID),
        Role: 'Patient',
      },include: {
        Patient: true,
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

