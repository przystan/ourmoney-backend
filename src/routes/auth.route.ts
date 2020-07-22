import express from 'express';
const router = express.Router();
import * as verifySignUp from '../middlewares/verifySignUp';
import * as AuthController from '../controllers/auth.controller';

module.exports = function (app: any) {
    // app.use(function (req: any, res: any, next: Function) {
    //     res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    //     next();
    // });

    /**
     * Register User
     * @route POST /api/auth/signup
     * @group /auth
     * @param {string} email.body.required - email - eg: user@domain
     * @param {string} username.body.required - username
     * @param {string} password.body.required - user's password.
     * @returns {object} 200 - An array of user info
     * @returns {Error}  default - Unexpected error
     */
    app.post('/api/auth/signup', [verifySignUp.checkDuplicateUsernameOrEmail], AuthController.signup);


     /**
     * Login user
     * @route POST /api/auth/signin
     * @group /auth
     * @param {string} username.body.required - username
     * @param {string} password.body.required - user's password.
     * @returns {object} 200 - An array of user info
     * @returns {Error}  default - Unexpected error
     */
    app.post('/api/auth/signin', AuthController.signin);
};
