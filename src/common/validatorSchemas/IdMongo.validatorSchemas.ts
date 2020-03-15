import { ValidationSchema } from 'class-validator';
 

export const IdMongoValidatorSchemas: ValidationSchema = {
  name: 'IdMongoValidatorSchemas',
  properties: {
    id: [
      {
        type: 'isMongoId',
        constraints: [true],
        message: 'Wrong ID'
      },
      
    ]
  }
};
