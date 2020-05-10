import { ValidationSchema, IsEmail, IsDefined } from 'class-validator';


export const SignInValidatorSchema: ValidationSchema = {
    name: 'SignInValidatorSchema',
    properties: {
        username: [
            {
                type: 'isDefined',
                message: 'USERNAME_EMPTY'
            },
        ],
        password: [
            {
                type: 'isDefined',
                message: 'PASSWORD_EMPTY'
            }
        ],
    }
}