import { ValidationSchema, Min } from 'class-validator';
 

export const GetListValidatorSchemas: ValidationSchema = {
  name: 'GetListValidatorSchemas',
  properties: {
    limit: [
      {
        type: 'isNumberString',
        constraints: [true],
        message: 'LIMIT_MUST_IS_NUMBER'
      },
      {
        type: 'isDefined',
        message: 'LIMIT_EMPTY'
      }
    ],
    page: [
      {
        type: 'isNumberString',
        constraints: [true],
        message: 'PAGE_MUST_IS_NUMBER'
      },
      {
        type: 'isDefined',
        message: 'PAGE_EMPTY'
      }
    ],
  }
};
