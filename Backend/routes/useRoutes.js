import { Router } from 'express';
import { registerUser } from '../controllers/autohController.js';

export const authRouter = Router();

authRouter.post("/", registerUser);