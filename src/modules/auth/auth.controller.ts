import moment from 'moment';
import sha256 from 'sha256';
import BaseController from '../../common/base/controller.base';
import { NotFoundException, UnauthorizedException, BadRequestException } from '../../common/error/index';
import { Types } from 'mongoose';
import {
  ERR_MISSING_INPUT,
}
  from './auth.error';

import fetchAPI from './../../utils/fetch';
import AuthRepository from './auth.repository';
import { CREATE_TOKEN_FAILED, UPDATE_TOKEN_FAILED, USER_NOT_FOUND, INVALID_TOKEN, UNAUTHORIZE } from './auth.message';
import UserReponsitory from '../user/user.repository';

class AuthController extends BaseController {
  authRepository: AuthRepository;
  userRepository: UserReponsitory;
  constructor() {
    super();
    this.authRepository = new AuthRepository();
    this.userRepository = new UserReponsitory();
  }

  // signIn function
  async signIn(req: any, res: any, next: any) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw new BadRequestException(ERR_MISSING_INPUT);
      }
      let user = await this.userRepository.getUserByUserNameAndPassword(username);
      if (!(user && user.comparePassword(password))) {
        throw new UnauthorizedException(USER_NOT_FOUND);
      }
      console.log(user);
      // store token
      let userID = user.ID;
      let expirationDate = moment().add(2, 'day');
      // Generate token
      let accesstoken = sha256(`${userID}-${moment()}`)
      let createToken = await this.authRepository.createToken({
        userID: userID,
        expirationDate: expirationDate,
        accesstoken,
      })
      if (!createToken) {
        throw new BadRequestException(CREATE_TOKEN_FAILED)
      }
      return res.json({
        accesstoken,
        expirationDate,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: any, res: any, next: Function) {
    try {
      let userID = req.headers.userid;
      let accesstoken = req.headers["accesstoken"];
      console.log(userID, accesstoken)
      let isValidToken = await this.authRepository.getToken({
        accesstoken,
      });

      if (!isValidToken) {
        throw new BadRequestException(UNAUTHORIZE);
      }
      if (isValidToken.isLogout) {
        throw new BadRequestException(UNAUTHORIZE);
      }
      let logout = await this.authRepository.updateToken(userID, accesstoken, {
        isLogout: true
      })
      res.json({
        isUpdated: logout
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyToken(req: any, res: any, next: any) {
    try {
      let accesstoken = req.headers.accesstoken;
      let isValidToken = await this.authRepository.getToken({
        accesstoken,
      });

      if (!isValidToken) {
        throw new BadRequestException(INVALID_TOKEN);
      }
      if (isValidToken.isLogout) {
        throw new BadRequestException(INVALID_TOKEN);
      }
      if (moment(isValidToken.expirationDate).valueOf() - moment().valueOf() < 0) {
        throw new BadRequestException(INVALID_TOKEN);
      }
      let respone = await this.userRepository.getById(isValidToken.userID);
      return res.json({
        userID: isValidToken.userID,
        isSuperAdmin: respone.isSuperAdmin,
        type: respone.type,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;