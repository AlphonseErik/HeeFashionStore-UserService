import AppError from './AppError';

export default class FieldExistException extends AppError {
  constructor(message: string | undefined = undefined) {
    // Providing default message and overriding status code.
    super(message || 'FieldExistException error', 404);
  }
};