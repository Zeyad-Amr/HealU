
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
// const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//-------------------Get All Users -----------------------
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const roleMembers = await prisma.user.findMany();

    res.status(200).json({ data: roleMembers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};

//-------------------Get User By ID-----------------------
export const getUserById = async (req: Request, res: Response) => {
  const {userId } = req.params;
  try {
    const parsedUserId = parseInt(userId);
    if (isNaN(parsedUserId)) {
      throw new Error('Invalid userId format. Please enter a valid Number.');
    }
    console.log(userId);
    const userMember = await prisma.user.findUnique({
      where: {
        userId: parsedUserId,
      }
    });
    if (userMember) {
      res.status(200).json({ data: userMember });
    } else {
      throw new Error('User not found');
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};  

//-------------------Get User By userName-----------------------
export const getUserByUserName = async (req: Request, res: Response) => {
  const {userName } = req.params;
  try {
    console.log(userName);
    const userMember = await prisma.user.findUnique({
      where: {
        userName: userName,
        
      }
    });
    if (userMember) {
      res.status(200).json({ data: userMember });
    } else {
      res.status(404).json({ error: 'User member not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};  

