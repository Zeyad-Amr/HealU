import { Prisma } from '@prisma/client';
import { error } from 'console';
import { Request, Response } from 'express';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import * as validate from '../Scripts/validation';
import validation from '../Scripts/validation';
import hashing from '../Scripts/hashing'

//-------------------Get All staff -----------------------
export const getAllstaff = async (req: Request, res: Response) => {
  try {
    const roleMembers = await prisma.user.findMany({
      where: {
        OR: [
          { role: "Doctor" },
          { role: "Admin" }
        ]
      }
    });
    res.status(200).json({ data: roleMembers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};

//-------------------Get  all staff User By ID-----------------------
export const getStaffById = async (req: Request, res: Response) => {
  const {userId } = req.params;
  try {
    const parsedUserId = parseInt(userId);
    if (isNaN(parsedUserId)) {
      throw new Error('Invalid userId format. Must be an integer.');
    }
    const userMember = await prisma.user.findUnique({
      where: {
        userId: parsedUserId,
        OR: [
          { role: "Doctor" },
          { role: "Admin" }
        ]
      }
    });
    if (userMember) {
      res.status(200).json({ data: userMember });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

//-------------------Get  all docotrs By clinicID-----------------------
export const getDoctorsByClinicID  = async (req: Request, res: Response) => {
//   const getDoctorsByClinicID = async (req, res) => {
    const {clinicId } = req.params;
    try {
      const parsedClinicId = parseInt(clinicId);
      if (isNaN(parsedClinicId)) {
        throw new Error('Invalid clinic ID format. Please enter an integer.');
      }
      const userMember = await prisma.user.findMany({
        where: {
          clinicId : parsedClinicId,
          role: "Doctor",
        },
      });
        res.status(200).json({ data: userMember });
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    } finally {
      await prisma.$disconnect();
    }
  };

//-------------------Create New Staff -----------------------
export const createStaff = async (req: Request, res: Response) => {
  const userData = req.body;
  try {
    if(userData.role=="Patient"){
      throw new Error('Invalid role or unmatched data');
    }
    else if(!userData.gender || !userData.firstName||!userData.lastName||!userData.email||
      !userData.phoneNumber||!userData.role||!userData.password||!userData.userName) {
      throw new Error('Missing required data');
    }
    else if(!validate.clinicIdValidation(userData.clinicId))
    {
      throw new Error('clinicId musnt be from 1 to 5');
    }
    else{
      await validation.validateUsertData(userData);
      const newUser = await prisma.user.create({
        data: userData,
      });
      res.status(201).json({ data: newUser });
    } 
  } catch (error:any) {
    validate.handleErrors(error, res);

  } finally {
    await prisma.$disconnect();
  }
};
//-------------------Update staff-----------------------
export const updateStaff = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userData = req.body;
  const parsedUserId=parseInt(userId);
  try { 
    if(isNaN(parsedUserId)){
      throw new Error('Data type must be integer');
    }
      const userExists = await prisma.user.findUnique({
        where: {
          userId: parsedUserId,
          OR: [
            { role: "Doctor" },
            { role: "Admin" }
          ],
        },
      });  
      if (!userExists) {
        throw new Error('User not found');
      }else{

        await validation.validateUsertData(userData)
        const updatedUser = await prisma.user.update({
          where: {
            userId: parsedUserId,
            OR: [
              { role: "Doctor" },
              { role: "Admin" }
            ],  
          },    
          data: userData,
        }); 
        res.status(200).json({ data: updatedUser });  
    }
  } catch (error:any) {
    validate.handleErrors(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

//-------------------Delete Staff -----------------------
export const deleteStaff = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    await prisma.user.delete({
      where: {
        userId: parseInt(userId, 10),
        OR: [
          { role: "Doctor" },
          { role: "Admin" }
        ]
      }
    });

    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};

