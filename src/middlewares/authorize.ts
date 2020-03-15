import jwt from 'jsonwebtoken';
import UserRepository from '../modules/user/user.repository';
import { UnauthorizedException, InternalServerErrorException } from '../common/error/index';
import { FailureRespone } from '../common/respone';

const userRepository = new UserRepository();

export const authorize = (roles: number[] = []) => {
  return async (req: any, res: any, next: Function) => {
    const { accesstoken } = req.headers;
    try {
      if (!accesstoken) {
        throw new UnauthorizedException('Phiên đăng nhập không hợp lệ');
      }

      const secret = process.env.SECRET_SIGN_TOKEN ? process.env.SECRET_SIGN_TOKEN : 'no_secret';
      const payload: any = jwt.verify(accesstoken, secret);
      if (!payload || !payload.userId)
        throw new UnauthorizedException('Phiên đăng nhập không hợp lệ');

      const user = await userRepository.getById(payload.userId);
      if (!user) {
        throw new UnauthorizedException('Phiên đăng nhập không hợp lệ');
      }
      req.userId = payload.userId;
      next();
    } catch (err) {
      if (err.message == 'Không được phép sử dụng tính năng này') {
        return FailureRespone(res, err);
      } else {
        return FailureRespone(res, new UnauthorizedException('Phiên đăng nhập không hợp lệ'));
      }
    }
  }
} 