import { validate, ValidationSchema, registerSchema } from 'class-validator';

const validatorOptions = {
  skipMissingProperties: true,
};

export const validator = (schema: ValidationSchema) => {
  return async (req: any, res: any, next: Function) => {
    registerSchema(schema);
    const errors = await validate(schema.name, req.body, validatorOptions);
    if (errors.length > 0) {
      return res.status(404).json({
        message: errors,
        error: 'BadRequestException',
        status: 404,
      });
    }
    next();
  }
}

export const validatorBody = (schema: ValidationSchema) => {
  return async (req: any, res: any, next: Function) => {
    registerSchema(schema);
    const errors = await validate(schema.name, req.body, validatorOptions);
    if (errors.length > 0) {
      return res.status(404).json({
        message: errors,
        error: 'BadRequestException',
        status: 404,
      });
    }
    next();
  }
}

export const validatorParam = (schema: ValidationSchema) => {
  return async (req: any, res: any, next: Function) => {
    registerSchema(schema);
    const errors = await validate(schema.name, req.params, validatorOptions);
    if (errors.length > 0) {
      return res.status(404).json({
        message: errors,
        error: 'BadRequestException',
        status: 404,
      });
    }
    next();
  }
}

export const validatorQuery = (schema: ValidationSchema) => {
  return async (req: any, res: any, next: Function) => {
    registerSchema(schema);
    const errors = await validate(schema.name, req.query, validatorOptions);
    if (errors.length > 0) {
      return res.status(404).json({
        message: errors,
        error: 'BadRequestException',
        status: 404,
      });
    }
    next();
  }
}