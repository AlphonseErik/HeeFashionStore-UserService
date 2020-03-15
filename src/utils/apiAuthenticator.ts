import {
  BadRequestException,
} from '../common/error/';
import {
  INVALID_KEY_COMMUNICATION
} from '../common/errorMessages/';

const apiKey = process.env.APIKEY;
const apiSecret = process.env.APISECRET;

/**
 * Function authenticate the apiKey and apiSecret is valid and correct
 * @param req Has apiKey, apiSecret to authenticate the request
 * @param res 
 * @param next 
 */
export default function apiAuthenticator(req: any, res: any, next: any) {
  if (apiKey === req.headers.apikey && apiSecret === req.headers.apisecret) {
    next();
  } else {
    next(new BadRequestException(INVALID_KEY_COMMUNICATION));
  }
}