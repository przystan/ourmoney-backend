import { Request, Response } from "express";
import db from '../config/db';
import Role from "../schemas/role.schema";
import * as mongoose from 'mongoose';
/**
 * GET /
 * Home page.
 */
export const index = async (req: Request, res: Response) => {
    Role.find({})
        .exec()
        .then(docs => {
            res.status(200).json({
                docs
            });
        })
        .catch(err => {
            console.log(err)
        });
    
};
