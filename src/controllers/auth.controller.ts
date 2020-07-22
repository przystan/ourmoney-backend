import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../schemas/user.schema';
import Error from '../models/Error/Error.model';
import { ErrorCode } from '../models/Error/ErrorEnumTypes';

export const signup = async (req: Request, res: Response) => {
    try {
        console.log("jere")
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        const createdUser = await user.save();
        res.status(200).json(createdUser);
    } catch (error) {
        res.status(500).json(new Error(ErrorCode.DB_CONNECT_ERROR, 500, error));
    }
};
