
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//-------------------Get All Users -----------------------
export const getAllUsers = async (req: Request, res: Response) => {
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

//-------------------Get All Users In The Same Role -----------------------

export const getAllUsersByRole = async (req: Request, res: Response) => {
    const { role } = req.params;
    console.log(role);
    try {
      const roleMembers = await prisma.user.findMany({
        where: {
          Role: role,
        },include: {
            Patient: role=='Patient'?true:false,
            Doctor:role=='Doctor'?true:false,
            Admin:role=='Admin'?true:false,
          },
      });
  
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
  const {userID } = req.params;

  try {
    console.log(userID);
    const userMember = await prisma.user.findUnique({
      where: {
        UserID: parseInt(userID),
      },include: {
        Patient: true,
        Doctor:true,
        Admin:true,
      },
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

//-------------------Create New User -----------------------
export const createUser = async (req: Request, res: Response) => {
  const userData = req.body;

  try {
    const newUser = await prisma.user.create({
      data: userData,
    });

    res.status(201).json({ data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};

//-------------------Update User-----------------------
export const updateUser = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const userData = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: {
        UserID: parseInt(userID),
      },
      data: userData,
    });

    res.status(200).json({ data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};


//-------------------Delete User -----------------------
export const deleteUser = async (req: Request, res: Response) => {
  const { userID } = req.params;

  try {
    await prisma.user.delete({
      where: {
        UserID: parseInt(userID, 10),
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


