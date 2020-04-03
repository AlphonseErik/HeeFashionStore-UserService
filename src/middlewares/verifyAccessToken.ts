import { UnauthorizedException, BadRequestException } from '../common/error';
import { NO_PERMISSION } from '../common/errorMessages';
import AuthRepository from '../modules/auth/auth.repository';
import moment from 'moment';
import UserReponsitory from '../modules/user/user.repository';

const authRepository = new AuthRepository();
const userRepository = new UserReponsitory();

export const verifyAccessToken = () => {
    return async (req: any, res: any, next: any) => {
        try {
            const accesstoken = req.headers.accesstoken;
            if (!accesstoken) {
                throw new UnauthorizedException(NO_PERMISSION);
            }
            let isValidToken = await authRepository.getToken({
                accesstoken,
            });
            console.log(isValidToken)
            if (!isValidToken) {
                throw new BadRequestException(NO_PERMISSION);
            }
            if (isValidToken.isLogout) {
                throw new BadRequestException(NO_PERMISSION);
            }
            if (moment(isValidToken.expirationDate).valueOf() - moment().valueOf() < 0) {
                throw new BadRequestException(NO_PERMISSION);
            }
            const user = await userRepository.getById(isValidToken.userID);
            console.log(user)
            if (!user) {
                throw new UnauthorizedException(NO_PERMISSION);
            }
            if (user.isSuperAdmin) {
                next();
                return;
            }
            throw new UnauthorizedException(NO_PERMISSION);
        } catch (err) {
            next(err);
        }
    }
}