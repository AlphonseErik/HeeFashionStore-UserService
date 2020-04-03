import express from 'express';
import {
  validatorBody,
  validatorParam,
  validatorQuery
} from '../../middlewares';

import UserController from './user.controller';
// Validator Schemas

import { RegisterValidatorSchema } from './validatorSchemas/user.register.validatorSchema';

const userController = new UserController();

var router = express.Router();

// Routers Common
router.post('/register', validatorBody(RegisterValidatorSchema), userController.register);

router.get('/getProfile', userController.getProfile);

router.get('/', userController.getListUser);

router.get('/getAll', userController.getAll);// get all no paginate

router.get('/search', userController.searchUser);

router.get('/:userID', userController.getProfileByUserID);

router.post('/getUsersByIds', userController.getUsersByIds);

router.post('/isUserMatchesThePassword', userController.isUserMatchesThePassword);

router.patch('/updateProfile', userController.updateProfile);

router.post('/resetPasswordRequest', userController.resetPasswordRequest);


export default router;