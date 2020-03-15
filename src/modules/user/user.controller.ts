import BaseController from '../../common/base/controller.base';
import randomstring from 'randomstring';
import UserRepository from './user.repository';
import moment from 'moment';
import _ from 'lodash';
import fetchAPI from './../../utils/fetch';
import {
  BadRequestException, UnauthorizedException, NotFoundException,
} from '../../common/error';
import { ErrEmailDifferent, ErrUserNameExist, ErrEmailExist, ErrPhoneIsExist, ErrGetProfile, ErrUserNotFound, ErrUserIsVerified, ErrNotUpdateUserAdmin, ErrSignIn, ErrPasswordIsNotMatches, ErrPasswordIsNotMatchesWithOldPassword, ErrVerifyCodeIsMatches } from './user.message';

class UserController extends BaseController {
  userRepository: UserRepository;
  constructor() {
    super();
    this.userRepository = new UserRepository();
  }

  async getAll(req: any, res: any, next: any) {
    try {
      const users = await this.userRepository.getAllNoPaginate({ type: 0 });
      res.json(users)
    } catch (error) {
      next(error);
    }
  }
  async getListUser(req: any, res: any, next: any) {
    try {
      let { limit, page, type } = req.query;
      if (type === undefined) {
        type = [0, 1];
      } else {
        type = [type]
      }
      const users = await this.userRepository.getAll(limit, page, type);
      res.json(users)
    } catch (error) {
      next(error);
    }
  }

  async searchUser(req: any, res: any, next: any) {
    try {
      let { limit, page, keyword, type } = req.query;
      if (type === undefined) {
        type = [0, 1];
      } else {
        type = [type]
      }
      const users = await this.userRepository.search(keyword, limit, page, type);
      res.json(users)
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: any, res: any, next: any) {
    try {
      let userID = req.headers.userid;
      // let userID = "386fa530-1261-11ea-8869-1dc4ae15c1a4";
      const user = await this.userRepository.getById(userID, "-_id -password -isSuperAdmin -__v -isDeleted");
      if (!user)
        throw new BadRequestException(ErrGetProfile);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getProfileByUserID(req: any, res: any, next: any) {
    try {
      let { userID } = req.params;
      const user = await this.userRepository.getById(userID);
      if (!user)
        throw new BadRequestException(ErrGetProfile);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUsersByIds(req: any, res: any, next: any) {
    try {
      let { userIDs } = req.body;
      const user = await this.userRepository.getUsersByIds(userIDs, "ID username email lastName firstName");

      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: any, res: any, next: any) {
    try {
      let userID = req.headers.userid;
      let { username, email, mobilePhone } = req.body;
      let userData = await this.userRepository.getById(userID);
      if (!userData) {
        throw new BadRequestException(ErrUserNotFound);
      }
      // Check current username and username input is matching
      if (userData && (username && userData.username !== username)) {
        let usernameExists = await this.userRepository.getUserByUsername(username);
        if (usernameExists) {
          throw new BadRequestException(ErrUserNameExist);
        }
      }
      // Check current email and email input is matching
      if (userData && (email && userData.email !== email)) {
        let emailExists = await this.userRepository.getUserByEmail(email);
        if (emailExists) {
          throw new BadRequestException(ErrEmailExist);
        }
      }
      // Check current mobile phone and mobile phone input is matching
      if (userData && (mobilePhone && userData.mobilePhone !== mobilePhone)) {
        let mobilePhoneExists = await this.userRepository.getUserByPhone(mobilePhone);
        if (mobilePhoneExists) {
          throw new BadRequestException(ErrPhoneIsExist);
        }
      }
      const user = await this.userRepository.updateByData({
        ID: userID,
      }, req.body);
      res.json({
        isUpdated: user
      })
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: any, res: any, next: any) {
    try {
      let userID = req.headers.userid;
      let { oldPassword, newPassword } = req.body;
      let userData = await this.userRepository.getById(userID);
      if (!userData) {
        throw new NotFoundException(ErrUserNotFound);
      }
      if (!userData.comparePassword(oldPassword)) {
        throw new UnauthorizedException(ErrPasswordIsNotMatchesWithOldPassword);
      }
      const user = await this.userRepository.updatePassword(userID, {
        password: newPassword
      });
      res.json({
        isUpdated: user
      })
    } catch (error) {
      next(error);
    }

  }
  async resetPasswordRequest(req: any, res: any, next: any) {
    try {
      let { email } = req.body;
      let code = randomstring.generate({
        length: 50
      })
      let user = await this.userRepository.getUserByEmail(email);
      if (!user) {
        throw new BadRequestException(ErrUserNotFound);
      }
      let updated = await this.userRepository.update(user.ID, {
        emailVerifycode: code
      })
      res.json({
        isUpdated: updated
      })
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: any, res: any, next: any) {
    try {
      let { email, newPassword, emailVerifycode } = req.body;
      let userData = await this.userRepository.getUserByEmail(email);
      if (!userData) {
        throw new BadRequestException(ErrUserNotFound);
      }
      if (emailVerifycode !== userData.emailVerifycode) {
        throw new BadRequestException(ErrVerifyCodeIsMatches);
      }
      const user = await this.userRepository.updatePassword(userData.ID, {
        password: newPassword
      });
      res.json({
        isUpdated: user
      })
    } catch (error) {
      next(error);
    }
  }

  async isUserMatchesThePassword(req: any, res: any, next: any) {
    try {
      //username can be email-username-mobilephone
      let { username, password } = req.body;
      let user = await this.userRepository.getUserByUserNameAndPassword(username);
      if (!(user && user.comparePassword(password))) {
        throw new UnauthorizedException(ErrSignIn);
      }
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async registerSocial(req: any, res: any, next: any) {
    try {
      let { userID, email } = req.body;
      let userIDExist = await this.userRepository.getById(userID, " -password");
      if (!userIDExist) {
        let emailExist = await this.userRepository.getUserByEmail(email);
        if (emailExist)
          throw new BadRequestException(ErrEmailExist);
        req.body.type = 0;
        req.body.username = `ADS${userID}`;
        req.body.isVerifyEmail = true;
        req.body.ID = userID;
        let user = await this.userRepository.create(req.body);
        return res.json(user)
      }
      return res.json(userIDExist)
    } catch (error) {
      next(error);
    }
  }

  async register(req: any, res: any, next: any) {
    try {
      let { username, email, mobilePhone } = req.body;
      if (req.body.type !== undefined) {
        req.body.type = 0;
      }
      let usernameExist = await this.userRepository.getUserByUsername(username);
      if (usernameExist) {
        throw new BadRequestException(ErrUserNameExist);
      }
      let emailExist = await this.userRepository.getUserByEmail(email);
      if (emailExist) {
        throw new BadRequestException(ErrEmailExist);
      }
      let mobilePhoneExist = await this.userRepository.getUserByPhone(mobilePhone);
      if (mobilePhoneExist) {
        throw new BadRequestException(ErrPhoneIsExist);
      }
      let user = await this.userRepository.create(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async resendVerify(req: any, res: any, next: any) {
    try {
      let { email } = req.body;
      let code = randomstring.generate({
        length: 50
      })
      let user = await this.userRepository.getUserByEmail(email);
      if (!user) {
        throw new BadRequestException(ErrUserNotFound);
      }
      if (user.isVerifyEmail) {
        throw new BadRequestException(ErrUserIsVerified);
      }
      let updated = await this.userRepository.update(user.ID, {
        emailVerifycode: code
      })
      res.json({
        isUpdated: updated
      })
    } catch (error) {
      next(error);
    }
  }
  /**
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  async verifyEmail(req: any, res: any, next: any) {
    try {
      let { emailVerifycode, email } = req.body;
      let user = await this.userRepository.getUserByEmail(email);
      if (!user) {
        throw new BadRequestException(ErrUserNotFound);
      }
      let userData = await this.userRepository.getById(user.ID);
      if (!userData) {
        throw new BadRequestException(ErrUserNotFound);
      }
      if (emailVerifycode !== userData.emailVerifycode) {
        throw new BadRequestException(ErrVerifyCodeIsMatches);
      }
      let updated = await this.userRepository.update(user.ID, {
        isVerifyEmail: true
      })
      return res.json({
        isUpdated: updated
      })
    } catch (error) {
      next(error);
    }
  }

  async changeActive(req: any, res: any, next: any) {
    try {
      let { ID } = req.params;
      let { isActive } = req.body;
      let userData = await this.userRepository.getById(ID);
      if (!userData) {
        throw new BadRequestException(ErrUserNotFound);
      }
      if (userData.isSuperAdmin) {
        throw new BadRequestException(ErrNotUpdateUserAdmin);
      }
      let user = await this.userRepository.update(ID, {
        isActive
      })
      res.json({
        isUpdated: user
      })
    } catch (error) {
      next(error);
    }
  }

  async remove(req: any, res: any, next: any) {
    try {
      let { ID } = req.params;
      let userData = await this.userRepository.getById(ID);
      if (!userData) {
        throw new BadRequestException(ErrUserNotFound)
      }
      if (userData.isSuperAdmin) {
        throw new BadRequestException(ErrNotUpdateUserAdmin)
      }
      const user = await this.userRepository.remove(ID);
      // if (!user)
      //   throw new BadRequestException(ErrRemoveUser)
      res.json({
        isDeleted: user
      })
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;