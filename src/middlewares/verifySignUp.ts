import { Request, Response } from 'express';
import User from '../schemas/user.schema';
import Error from '../models/Error/Error.model';
import { ErrorCode } from '../models/Error/ErrorEnumTypes';
import { ROLES } from '../schemas/role.schema';

export const checkDuplicateUsernameOrEmail = async (req: Request, res: Response, next: Function) => {
    try {
        const user = await User.findOne({ username: req.body.username }).exec();
        if (user) {
            res.status(400).json(new Error(ErrorCode.USER_EXIST, 400, 'Username already in use'));           
        }

        const email = await User.findOne({ email: req.body.email }).exec();
        if (email) {
            res.status(400).json(new Error(ErrorCode.EMAIL_EXIST, 400, 'Email already in use'));    
        }
        next();
        
    } catch (err) {
        console.log(err);
        res.status(500).json(new Error(ErrorCode.DB_CONNECT_ERROR, 500, 'Error with database connection'));
    }
};

// export const checkRolesExisted = (req: Request, res: Response, next: Function) => {
//     if (req.body.roles) {
//         for (let i = 0; i < req.body.roles.length; i++) {
//             if (!ROLES.includes(req.body.roles[i])) {
//                 res.status(400).json(new Error(ErrorCode.NOT_FOUND, 400, `Failed! Role ${req.body.roles[i]} does not exist!`));
//                 return;
//             }
//         }
//     }

//     next();
// };
