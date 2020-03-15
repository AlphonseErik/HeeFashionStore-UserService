import NotFoundException from './NotFoundException';
import UnauthorizedException from './UnauthorizedException';
import BadRequestException from './BadRequestException';
import InternalServerErrorException from './InternalServerErrorException';
import FieldExistException from './FieldExistException';


export {
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
  FieldExistException,

}

export const ErrorMessages = {
  SystemError: 'Lỗi hệ thống',
  ErrNotFoundData: 'Không tìm thấy dữ liệu'
}