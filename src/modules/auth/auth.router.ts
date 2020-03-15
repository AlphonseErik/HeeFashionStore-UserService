import express from 'express';
var router = express.Router();
import AuthController from './auth.controller';
import apiAuthenticator from '../../utils/apiAuthenticator';
import { validatorBody } from '../../middlewares';
import { SignInValidatorSchema } from './validatorSchmas/auth.signin.validatorSchema';

const authController = new AuthController();

router.post('/signin', validatorBody(SignInValidatorSchema), authController.signIn);
router.post('/logout', authController.logout);
router.post('/verifytoken', authController.verifyToken);

export default router;