
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
// const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//-------------------Get All Users -----------------------
export const getAllUsers = async (req: Request, res: Response) => {
  // const getAllUsers = async (req, res) => {
    const { role } = req.params;
  
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
export const getALLUserById = async (req: Request, res: Response) => {
  // const getALLUserById = async (req, res) => {
  const {userID } = req.params;

  try {
    console.log(userID);
    const userMember = await prisma.user.findUnique({
      where: {
        UserID: parseInt(userID),
      }
    });
    if (!userMember) {
      res.status(404).json({ error: 'User member not found' });
    } else {
      res.status(200).json({ data: userMember });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};  

// module.exports = {
//   getAllUsers,
//   getALLUserById,
//   // createUser,
//   // updateUser,
//   // deleteUser
// };

