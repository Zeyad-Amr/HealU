import { Response } from 'express';
import { Prisma } from '@prisma/client';
import hashing from '../Scripts/hashing';

//-----------------------check for unique values in database --------------------------------
export function checkUniqueValues(error:any,res:Response):void{
  if (error.code === 'P2002') {                                   // code for unique value errors
    const targetArray = error.meta?.target as string[]; 
    if (targetArray && targetArray.includes('ssn')) {
      res.status(400).json({ error: 'SSN must be unique' });
    }else if (targetArray && targetArray.includes('userName')) {
      res.status(400).json({ error: 'Username must be unique' });
    }else if (targetArray && targetArray.includes('email')) {
      res.status(400).json({ error: 'email must be unique' });
    }else {                                                      // Handle other Prisma known errors
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

//-----------------------SSN Validation--------------------------------
export function ssnValidation(inputSSN: string) :boolean {
  return /^\d{14}$/.test(inputSSN);
}

//-----------------------clinicId Validation-------------------------------
export function clinicIdValidation(clinicId: number):boolean {
  // Check if clinicId is a number and within the range 1 to 5
  return clinicId >= 1 && clinicId <= 5;
}

//-----------------------Date Format Validation--------------------------------
export function dateFormatValidation(inputDate: string): boolean {
  const dateFormatPattern = /^(?!0000)[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  return dateFormatPattern.test(inputDate);
}

//-----------------------Email Validation--------------------------------
export function emailValidation(email: string): boolean {
  // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?\.com$/;
  // return emailPattern.test(email);
  const emailPattern = /^[^\s@]+@[^\s@]+\.com$/;
  return emailPattern.test(email);
}


//----------------------- Phone Number Validation--------------------------------
export function phoneValidation(phoneNumber: string): boolean {
  const phonePattern = /^(\+20|0020)\d{10}$/;
  return phonePattern.test(phoneNumber);
}

//------------------------ Error Handling ---------------------------------------

export function handleErrors (error: any, res: Response): void {
  console.error(error);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    checkUniqueValues(error, res);
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    // Handle validation errors
    res.status(422).json({ error: 'Validation error in database request' });
  } else if (error.message) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//------------------------ Validation ------------------------------------------
const validateUsertData = async (userData: any) => {
  if (userData.ssn && !ssnValidation(userData.ssn)) {
    throw new Error('SSN is incorrect');
  } 
  else if (userData.dateOfBirth && !dateFormatValidation(userData.dateOfBirth)) {
    throw new Error('Check that you entered the right birthdate and in this format: YYYY-MM-DD');
  } 

  else if(userData.clinicId && !clinicIdValidation(userData.clinicId))
  {
    throw new Error('clinicId musnt be from 1 to 5');
  }
  else if(userData.email && !emailValidation(userData.email)){
    throw new Error('Please check if this mail is correct');
  }
  else if(userData.phoneNumber && !phoneValidation(userData.phoneNumber)){
    throw new Error('Please check if this phone number is correct, and starts with either 002 or +20');
  }
  else if (userData.password) {
    if(hasCapitalizedCharacter(userData.password)==false){
      throw new Error(' password must has at least one capital letter');
    }
    userData.password = await hashing.hashPassword(userData.password);
  }
};

export default {
  validateUsertData
}