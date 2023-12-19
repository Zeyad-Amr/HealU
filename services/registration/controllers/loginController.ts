import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const loginUser = async (req: Request, res: Response) => {
  const { UserName, Password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        UserName: UserName,
        Password: Password,
      },
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      res.status(200).json({ data: user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};
