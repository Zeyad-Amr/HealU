import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import hashing from '../Scripts/hashing';
const prisma = new PrismaClient();

export const loginUser = async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        userName: userName,
      },
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Use your existing function to compare hashed password
    await hashing.compareHashPassword(password, user.password, { error: 'Invalid credentials' });

    res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};