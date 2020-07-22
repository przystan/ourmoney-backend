import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../schemas/user.schema';
import Error from '../models/Error/Error.model';
import { ErrorCode } from '../models/Error/ErrorEnumTypes';
import { secretJWT } from '../config/options';

export const signup = async (req: Request, res: Response) => {
    try {
        console.log('jere');
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

export const signin = async (req: Request, res: Response) => {
    try {
        const foundUser: any = await User.findOne({
            username: req.body.username
        }).exec();

        if (!foundUser) {
            return res.status(404).json(new Error(ErrorCode.NOT_FOUND, 404, 'User not found'));
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, foundUser.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid Password!'
            });
        }

        var token = jwt.sign({ id: foundUser.id }, secretJWT, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            // roles: authorities,
            accessToken: token
          });
    } catch (error) {
        res.status(500).json(new Error(ErrorCode.DB_CONNECT_ERROR, 500, error));
    }
};
