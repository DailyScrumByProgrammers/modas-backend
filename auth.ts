import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

export const ensureAuthorization = (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const receivedJwt = authHeader.split(' ')[1];
      const decodedJwt = jwt.verify(receivedJwt, PRIVATE_KEY as string);
      return decodedJwt;
    } else {
      throw new ReferenceError("JWT must be provided in 'Bearer <token>' format");
    }
  } catch (err) {
    console.log(err.name);
    console.log(err.message);
    return err;
  }
};
