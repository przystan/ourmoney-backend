import express from 'express';
const router = express.Router();
import * as verifySignUp from '../middlewares/verifySignUp';
import * as AuthController from '../controllers/auth.controller';

module.exports = function (app: any) {
    // app.use(function (req: any, res: any, next: Function) {
    //     res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    //     next();
    // });

    app.post('/api/auth/signup', [verifySignUp.checkDuplicateUsernameOrEmail], AuthController.signup);

    //app.post("/api/auth/signin", AuthController.signin);
};
