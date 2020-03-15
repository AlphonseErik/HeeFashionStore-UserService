import AppError from './AppError';

export default class UnsupportedOperationException extends AppError {
  constructor(message: string | undefined = undefined) {
    // Providing default message and overriding status code.
    super(message || 'UnsupportedOperationException error', 501);
  }
};