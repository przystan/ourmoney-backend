import { Request, Response } from 'express';
import { secretJWT } from 'src/config/options';
import jwt from 'jsonwebtoken';
import Error from '../models/Error/Error.model';
import { ErrorCode } from '../models/Error/ErrorEnumTypes';

export const verifyToken = (req: any, res: Response, next: Function) => {
    let token: any = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send(new Error(ErrorCode.NO_TOKEN_PROVIDED, 403, 'No token provided'));
    }

    jwt.verify(token, secretJWT, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).send(new Error(ErrorCode.UNAUTHORIZED, 401, 'Unauthorized'));
        }
        req.userId = decoded.id;
        next();
    });
};

//TODO:  check roles middleware
// isAdmin = (req, res, next) => {
//     User.findById(req.userId).exec((err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       Role.find(
//         {
//           _id: { $in: user.roles }
//         },
//         (err, roles) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }

//           for (let i = 0; i < roles.length; i++) {
//             if (roles[i].name === "admin") {
//               next();
//               return;
//             }
//           }

//           res.status(403).send({ message: "Require Admin Role!" });
//           return;
//         }
//       );
//     });
//   };
