import express from 'express';
import {
  validatorBody,
  validatorParam,
  validatorQuery
} from '../../middlewares';

import UserController from './user.controller';
// Validator Schemas
import {
  GetListValidatorSchemas,
} from '../../common/validatorSchemas/index';

import {RegisterValidatorSchema} from './validatorSchemas/user.register.validatorSchema';

import { IdUuidValidatorSchemas } from '../../common/validatorSchemas/IdUuid.validatorSchemas';
const userController = new UserController();

var router = express.Router();

// Routers Common
router.get('/getProfile', userController.getProfile);
router.get('/', validatorQuery(GetListValidatorSchemas), userController.getListUser);
router.get('/getAll', userController.getAll);// get all no paginate
router.get('/search', validatorQuery(GetListValidatorSchemas), userController.searchUser);
router.get('/:userID', userController.getProfileByUserID);
router.post('/getUsersByIds', userController.getUsersByIds);
router.post('/isUserMatchesThePassword', userController.isUserMatchesThePassword);
router.patch('/changeActiveUser/:ID', validatorParam(IdUuidValidatorSchemas), userController.changeActive);
router.patch('/updateProfile', userController.updateProfile);
router.post('/resetPasswordRequest', userController.resetPasswordRequest);

router.post('/register', validatorBody(RegisterValidatorSchema), userController.register);

router.delete('/:ID', validatorParam(IdUuidValidatorSchemas), userController.remove);


export default router;